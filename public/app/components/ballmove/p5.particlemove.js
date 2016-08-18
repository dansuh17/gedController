/**
 * Ball move particle physical engine design for quizquiz modeling.
 * by Young Jin Park
 */

var particles;
var suns = []; // Center of Gravity
var totalcount = 20;
var leftcount = 10; // initial value
var rightcount = totalcount - leftcount;
var curleftcount = 0;
var currightcount = 0;
var faces = [];
var framecount = 1000;
var helveticanueBold;
var helveticanue;

/* preload images that should be used for particles */
function preload() {
  var i;
  helveticanueBold = loadFont('../../assets/font/HelveticaNeue_Bold.ttf');
  helveticanue = loadFont('../../assets/font/HelveticaNeue-Medium.otf');

  for (i = 1; i < 7; i++) {
    faces[i - 1] = loadImage('../../assets/images/face" + i +".png');
  }
}

/* setup the canvas before drawing calls */
function setup() {
  var i;
  var n;
  var particle;
  var canvas = createCanvas(1024,600);

  canvas.parent('ballmove');
  canvas.style('visibility', 'visible');
  textSize(15);
  noStroke();

  // Create Centers of Gravity
  suns[0] = new Sun(170, (height / 2) - 120);
  suns[1] = new Sun(width - 110, (height / 2) - 120);

  particles = new Group();

  for (i = 0; i < totalcount; i++) {
    // set the initial position of particle and create particle
    particle = createSprite(width / 2, height / 2, 15, 15);
    n = floor(random(0, 6)); // randomize the faces to draw
    particle.setSpeed(random(0, 80), random(0, 50));
    particle.addAnimation('normal', faces[n]);

    // assign the pole randomly to each particle
    if (random(0, 1) < 0.5) {
      particle.pole = 0;
      curleftcount += 1;
    } else {
      particle.pole = 1;
      currightcount += 1;
    }

    // add to group
    particles.add(particle);
  }
}

function draw() {
  var promise;

  background(255, 255, 255, 0);
  clear();

  // add text
  textSize(60);
  fill(24,24,24);
  strokeWeight(4);
  stroke(207,207,207);
  textFont(helveticanueBold);
  text((leftcount * 5) + '%', 110, suns[0].position.y);
  text((rightcount * 5) + '%', 850, suns[1].position.y);

  textSize(55);
  noStroke();
  fill(119,119,119);
  textFont(helveticanue);
  textAlign(CENTER);
  text('WHO WILL WIN?', width / 2 + 25, height / 2 - 130);

  textSize(40);
  text('VOTE NOW', width / 2 + 25, height / 2 - 90);

  // take the value from ajax call
  promise = getData();

  if (++framecount > 300) {
    promise.success(function (data) {
      rightcount = (data.devinUp * 20) / (data.devinUp + data.tomUp); // in scale of 20
      rightcount = Math.floor(rightcount);
      updateCount(rightcount);
    });
    framecount = 0;
  }

  // particles bounce against each others
  particles.bounce(particles);

  // match the number of particles in each pole
  if (leftcount > curleftcount) {
    i = 0;
    while (leftcount !== curleftcount) {
      if (particles[i].pole === 1) {
        particles[i].pole = 0;
        curleftcount += 1;
        currightcount -= 1;
      }
      i += 1;
    }
  } else if (rightcount > currightcount) {
    i = 0;
    while (rightcount !== currightcount) {
      if (particles[i].pole === 0) {
        particles[i].pole = 1;
        curleftcount -= 1;
        currightcount += 1;
      }
      i += 1;
    }
  }

  // update all particles
  for (var i = 0; i < particles.length; i++) {
    var s = particles[i];

    // update particle speed
    updateParticle(s);

    // bounce at wall
    var wallmargin = 35;
    if (s.position.x < wallmargin) {
      s.position.x = wallmargin + 1;
      s.velocity.x = abs(s.velocity.x);
    }

    if (s.position.x > width - wallmargin) {
      s.position.x = width - wallmargin - 1;
      s.velocity.x = -abs(s.velocity.x);
    }

    if (s.position.y < wallmargin) {
      s.position.y = wallmargin + 1;
      s.velocity.y = abs(s.velocity.y);
    }

    if (s.position.y > height - wallmargin) {
      s.position.y = height - wallmargin - 1;
      s.velocity.y = -abs(s.velocity.y);
    }
  }

  // draw particles
  drawSprites();
}

/**
 * Updates the velocity of particles.
 * @param p the particle input
 */
function updateParticle(p) {
  var rx = suns[p.pole].position.x - p.position.x;
  var ry = suns[p.pole].position.y - p.position.y;

  var ax = (0.002 * rx) - (0.1 * p.velocity.x) + random(-2, 2);
  var ay = (0.002 * ry) - (0.1 * p.velocity.y) + random(-2, 2);

  p.velocity.x += ax;
  p.velocity.y += ay;
}

// Sun constructor
function Sun(x, y) {
  this.position = createVector(x, y);
}

/**
 * Makes and ajax call to receive the voting data to determine
 * the number of particles on each sides.
 */
function getData() {
  return $.ajax({
    url: 'http://ged.uwcj.kr/votes/get',
    // url: 'http://localhost:3000/votes/getCurrentWinning', // keep this for testing purposes
    dataType: 'jsonp'
  });
}

/**
 * Updates the right count.
 * @param iNewCount new right count determined from ajax call from server
 */
function updateCount(iNewCount) {
  rightcount = iNewCount;
  leftcount = totalcount - rightcount;
}

