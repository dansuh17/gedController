/**
 *  This models the floating commercial boids over the video as interactive overlay.
 *  The user can tap on the screen to try to remove the boids away.
 *  Uses instance mode of p5.js so that it can communicate with Angular.
 *
 *  <p>Also, this allows the canvas to be turned on / off
 *  via socket calls so that producer can control the expose time. The canvas is
 *  turned on or off by moving between html anchors (an SPA).
 *
 *  !! third version of sweep using lovely hearts!
 *  templateUrl : /sweep_heart
 *  by Daniel Suh 8/11/2016
 */
/* global p5:true */
((function Sweep3Controller() {
  angular
      .module('sweep')
      .controller('Sweep3Controller', ['$scope', '$location', '$log', 'socketFactory',
        function Sweep3ControllerCallback($scope, $location, $log, socketFactory) {
          var vm = this;

          /* P5 instance mode part */
          // p5 codes START
          var sketch = function sketch(pFive) {
            var boids = [];
            var gloveImage;
            var pressed = false;
            var centerVector;
            var canvas;
            var imageHalfWidth = 100;
            var imageHalfHeight = 100;
            var i = 0;

            /**
             * Preloads images before drawing canvas.
             */
            pFive.preload = function p5preload() {
              gloveImage = pFive.loadImage('../../assets/images/sweep_heart.png');
            };

            /**
             * Setup the canvas.
             * Initialize the canvas and also initialize the boids' starting points.
             */
            pFive.setup = function p5setup() {
              setupCanvas();
              // center position = center of gravity
              centerVector = pFive.createVector(pFive.width / 2, pFive.height / 2);

              // create boids given random initial positions outside the canvas boundaries
              // so that boids would close in from outside
              for (i = 0; i < 15; i++) {
                if (i % 2 === 0) {
                  boids[i] = new Boid(
                      pFive.random(pFive.width + 10, pFive.width + 50),
                      pFive.random(-20, pFive.height + 20),
                      i
                  );
                } else {
                  boids[i] = new Boid(
                      pFive.random(-50, -10),
                      pFive.random(-20, pFive.height + 20),
                      i
                  );
                }
              }
            };

            /**
             * The draw loop.
             */
            pFive.draw = function p5draw() {
              pFive.clear(); // clear the canvas every frame
              determineLoopContinue();
              pFive.background(255, 255, 255, 0);

              // Run all the boids
              for (i = 0; i < boids.length; i++) {
                boids[i].run(boids);
              }

              // if the effects for mouse press is over, reset 'pressed'
              if (pressed) {
                pressed = false;
              }
            };

            /**
             * If mouse pressed, set PRESSED to true so that according
             * effect can take place.
             */
            pFive.mousePressed = function p5mousePressed() {
              pressed = true;
            };

            /**
             * Boid class constructor
             *
             * @param x original x position
             * @param y original y position
             * @param id identification number of this Boid
             * @constructor constructs a single Boid at given x, y position.
             */
            function Boid(x, y, id) {
              this.id = id;
              this.acceleration = pFive.createVector(0, 0);
              this.velocity = p5.Vector.random2D();
              this.position = pFive.createVector(x, y);
              this.maxspeed = 4;    // Maximum speed
              this.inScreen = true;
            }

            /**
             * Runs the physical system of boids.
             * Takes into account the effect of gravity and
             * the effect of mouse press.
             */
            Boid.prototype.run = function boidRun() {
              this.gravity();
              this.update();
              this.render();
            };

            /**
             * Simulates the gravitational force (which is actually a spring-mass system).
             */
            Boid.prototype.gravity = function boidGravity() {
              // calculate the distance from the center to this boid
              var direction = p5.Vector.sub(centerVector, this.position).normalize();
              var distance = p5.Vector.dist(centerVector, this.position);

              if (distance > 5) this.applyForce(direction.mult(distance / 30000.0));
              else this.applyForce(-direction.mult(1.0 / 30.0));
            };

            /**
             * Updates the acceleration, velocity, and position of each boids
             * according to previous values.
             */
            Boid.prototype.update = function boidUpdate() {
              var mouseVector;

              // randomize acceleration to simulate drunken walker
              this.acceleration.add(pFive.random(-0.01, 0.01), pFive.random(-0.01, 0.01));

              // Update velocity, also add some randomness
              this.velocity.add(this.acceleration);
              this.velocity.add(pFive.random(-0.05, 0.05), pFive.random(-0.03, 0.03));

              // if the mouse is pressed, the nearby boids move in the opposite
              // direction from the selected location so that it clears out the space.
              if (pressed) {
                mouseVector = pFive.createVector(pFive.mouseX, pFive.mouseY);
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
            Boid.prototype.render = function boidRender() {
              if (this.inScreen) {
                pFive.image(gloveImage, this.position.x, this.position.y,
                    2 * imageHalfWidth, 2 * imageHalfHeight);
              }
            };

            /**
             * Adds the effect of certain force to the acceleration.
             *
             * @param force the force taken place on the boid
             */
            Boid.prototype.applyForce = function boidApplyForce(force) {
              this.acceleration.add(force);
            };

            /**
             * When the mouse is clicked, it repels the boids as if a drop of
             * stone into water. The nearby space is cleared out.
             *
             * <p>imageCenterVector variable accounts for the difference in image's center
             * and the position of the image, which points to the top-left corner of the image.
             *
             * @param mouseVector the point of mouse click
             */
            Boid.prototype.repel = function boidRepel(mouseVector) {
              var imageCenterVector = pFive.createVector(
                  this.position.x + imageHalfWidth,
                  this.position.y + imageHalfHeight
              );
              var repelDirection = p5.Vector.sub(imageCenterVector, mouseVector).normalize();
              var dist = p5.Vector.dist(imageCenterVector, mouseVector);

              // within a certain range of the point clicked, repel the boids
              if (dist < 300) {
                this.velocity = repelDirection.mult(300.0 / dist);
              }
            };

            /**
             * Determines if the loop should continue or not.
             * If the url contains "empty", then turn of the loop
             * and remove the canvas element.
             */
            function determineLoopContinue() {
              var url = window.location.href;
              // if the url contains "empty", stop the loop
              if(url.indexOf('sweep_heart') === -1) {
                pFive.noLoop();
                document.getElementById('sweepCanvas').remove();
                console.log('URL changed - turning off sweep canvas');
              }
            }

            /**
             * Create a canvas.
             */
            function setupCanvas() {
              canvas = pFive.createCanvas(window.innerWidth, window.innerHeight);
              canvas.id('sweepCanvas');
            }
          };

          /* instantiate p5 canvas */
          var myp5 = new p5(sketch);

          // p5 Codes END

          /**
           * Moves to the empty page.
           */
          vm.goToEmptyPage = function goToEmptyPage() {
            $location.path('/empty');
          };

          /**
           * Socket function that wraps the goToEmptyPage function,
           * run on receiving 'goToEmptyPage' message.
           */
          socketFactory.on('sweep_set_empty', function goEmptyPage() {
            $log.log('goToEmptyPage call received - sweep');
            $scope.$apply(function goEmptyPageApply() {
              vm.goToEmptyPage();
            })
          });
        }]);
})());
