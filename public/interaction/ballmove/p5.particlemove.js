/**
 * Ball move particle physical engine design for quizquiz modeling.
 * by Young Jin Park
 */
var particles;
var suns = []; // Center of Gravity
var margin = 220;
var totalcount = 20;
var leftcount = 10;
var rightcount = totalcount - leftcount;
var curleftcount = 0;
var currightcount = 0;

function setup() {
  var canvas = createCanvas(1024,600);
  canvas.parent('ballmove');
  canvas.style("visibility", "0visible");
  textSize(15);
  noStroke();

  // create sliders
  Slider = createSlider(0, totalcount, leftcount);
  Slider.position(0, 250);

  // Create Centers of Gravity
  for (var i = 0; i < 2; i++){
    suns[i] = new Sun(margin + i * (width - 2 * margin), height/2);
  }

  particles = new Group();

  for(i=0; i < totalcount; i++) {
    //set the initial position of particle
    var x = round(random(0,width));
    var y = round(random(0,height));

    // create particle
    var particle = createSprite(width/2,height/2,15,15);
    particle.setSpeed(random(0,80),random(0,50));
    particle.addAnimation("normal", "../../assets/images/hakeem.png");
    particle.shapeColor = color(0,122,122);

    // assign the pole randomly to each particle
    if (random(0,1) < 0.5) {
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
  background(255, 255, 255, 0);
  clear();

  //take the value from slider
  rightcount = Slider.value();
  leftcount = totalcount - rightcount;

  text("(" + leftcount + " , " + rightcount + ")", 165, 35);

  //particles bounce against each others
  particles.bounce(particles);

  //match the number of particles in each pole
  if (leftcount > curleftcount) {
    i = 0;
    while(leftcount != curleftcount){
      if(particles[i].pole == 1) {
        particles[i].pole = 0;
        curleftcount += 1;
        currightcount -= 1;
      }
      i += 1;
    }
  } else if (rightcount > currightcount) {
    i = 0;
    while(rightcount != currightcount){
      if(particles[i].pole == 0){
        particles[i].pole = 1;
        curleftcount -= 1;
        currightcount += 1;
      }
      i += 1;
    }
  }

  //update all particles
  for(var i=0; i<particles.length; i++) {
    var s = particles[i];

    //update particle speed
    updateParticle(s);

    //bounce at wall
    if(s.position.x<0) {
      s.position.x = 1;
      s.velocity.x = abs(s.velocity.x);
    }

    if(s.position.x>width) {
      s.position.x = width-1;
      s.velocity.x = -abs(s.velocity.x);
      }

    if(s.position.y<0) {
      s.position.y = 1;
      s.velocity.y = abs(s.velocity.y);
    }

    if(s.position.y>height) {
      s.position.y = height-1;
      s.velocity.y = -abs(s.velocity.y);
    }

    //set color
    var g = round(255 * s.position.x/width);
    s.shapeColor = color(0, g, 255-g);
  }

  //draw particles
  drawSprites();
}

//update the veloicty of particle
function updateParticle(p){
  var rx = suns[p.pole].position.x - p.position.x;
  var ry = suns[p.pole].position.y - p.position.y;

  var ax = 0.002 * rx - 0.1*p.velocity.x + random(-2,2);
  var ay = 0.002 * ry - 0.1*p.velocity.y + random(-2,2); 

  p.velocity.x += ax;
  p.velocity.y += ay;
}

// Sun
function Sun(x,y) {
  this.position = createVector(x,y);
}
