/**
 *  This models the floating coca-cola bottles over the broadcast stream.
 *  The user can tap on the screen to try to remove the coca-cola bottles away.
 *  by Daniel Suh 8/1/2016
 */
var boids = [];
var img;
var logo;
var pressed = false;
var centerVector;

/**
 * Setup the canvas.
 * Initialize the canvas and also initialize the boids' starting points.
 */
function setup() {
  var canvas = createCanvas(1280, 720);
  canvas.parent('background'); // binds the canvas into html class 'background'
  // the vector of the center of canvas
  centerVector = createVector(width/2 ,height/2);

  bg = loadImage("../../assets/images/hotgirl.jpeg");
  img = loadImage("../../assets/images/cola.png");
  logo = loadImage("../../assets/images/kisweLogo.png");

  // Add an initial set of boids into the system
  // boids come randomly from outside the viewbox positioned randomly across the height.
  for (var i = 0; i < 30; i++) {
    if (i % 2 == 0) {
      boids[i] = new Boid(random(width + 10, width + 50), random(-20, height + 20));
    }
    else {
      boids[i] = new Boid(random(-50, -10), random(-20, height + 20));
    }
  }
}

/**
 * The draw loop for each frame.
 */
function draw() {
  background(255, 255, 255, 0);
  image(logo, 20, height - 100, 48, 48);
  // Run all the boids
  for (var i = 0; i < boids.length; i++) {
    boids[i].run(boids);
  }

  // if the effects for mouse press is over, reset 'pressed'
  if (pressed) {
    pressed = false;
  }
}

/**
 * If mouse pressed, set PRESSED to true so that according
 * effect can take place.
 */
function mousePressed() {
  pressed = true;
}

// Boid class constructor
function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = p5.Vector.random2D();
  this.position = createVector(x, y);
  //this.r = 5;
  this.maxspeed = 4;    // Maximum speed
  // this.maxforce = 0.05; // Maximum steering force
  // this.rotation = PI / random(-9.0, 9.0);
  this.inScreen = true;
}

/**
 * Runs the physical system of boids.
 * Takes into account the effect of gravity and
 * the effect of mouse press.
 */
Boid.prototype.run = function() {
  this.gravity();
  this.update();
  this.render();
};

/**
 * Simulates the gravitational force (which is actually a spring-mass system).
 */
Boid.prototype.gravity = function() {
  // calculate the distance from the center to this boid
  var distance = p5.Vector.dist(centerVector, this.position);
  var direction = p5.Vector.sub(centerVector, this.position).normalize();

  if (distance > 5) this.applyForce(direction.mult(distance / 30000.0));
  else this.applyForce(-direction.mult(1.0/30.0));
};

/**
 * Updates the acceleration, velocity, and position of each boids
 * according to previous values.
 */
Boid.prototype.update = function() {
  // randomize acceleration to simulate drunken walker
  this.acceleration.add(random(-0.01, 0.01), random(-0.01, 0.01));

  // Update velocity, also add some randomness
  this.velocity.add(this.acceleration);
  this.velocity.add(random(-0.05, 0.05), random(-0.03, 0.03));

  // if the mouse is pressed, the nearby boids move in the opposite
  // direction from the selected location so that it clears out the space.
  if (pressed) {
    var mouseVector = createVector(mouseX, mouseY);
    this.repel(mouseVector);
  }

  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);

  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
};

/**
 * Actually renders the boid image.
 */
Boid.prototype.render = function() {
  //rotate(this.rotation); // for random rotation
  if (this.inScreen) {
    image(img, this.position.x, this.position.y, 60, 200);
  }
};

/**
 * Adds the effect of certain force to the acceleration.
 * @param force the force taken place on the boid
 */
Boid.prototype.applyForce = function(force) {
  this.acceleration.add(force);
};

/**
 * When the mouse is clicked, it repels the boids as if a drop of
 * stone into water. The nearby space is cleared out.
 * @param mouseVector
 */
Boid.prototype.repel = function(mouseVector) {
  var repelDirection = p5.Vector.sub(this.position, mouseVector).normalize();
  var dist = p5.Vector.dist(this.position, mouseVector);
  if (dist < 200) {
    this.velocity = repelDirection.mult(300.0 / dist);
  }
};
