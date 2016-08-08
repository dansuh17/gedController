/**
 *  This models the floating commercial boids over the video as interactive overlay.
 *  The user can tap on the screen to try to remove the boids away.
 *  Uses instance mode of p5.js so that it can communicate with Angular.
 *
 *  <p>Also, this allows the canvas to be turned on / off for a certain amount of time
 *  via socket calls so that producer can control the expose time. The canvas is
 *  turned on or off by moving between html anchors.
 *
 *  by Daniel Suh 8/1/2016
 */
;(function() {
  angular
      .module('sweep')
      .controller('sweepCtrl', ['$scope', '$location', '$anchorScroll',
        function ($scope, $location, $anchorScroll) {

          /* P5 instance mode part */
          // P5 codes START
          var sketch = function(pFive) {

            var boids = [];
            var blueAlienImg;
            var logo;
            var pressed = false;
            var centerVector;

            /**
             * Preloads images before drawing canvas.
             */
            pFive.preload = function() {
              blueAlienImg = pFive.loadImage("../../assets/images/alien_blue.png");
              //bg = pFive.loadImage("../../assets/images/hotgirl.jpeg");
              //redAlienImg = pFive.loadImage("../../assets/images/alien_red.png");
              //yellowAlienImg = pFive.loadImage("../../assets/images/alien_yellow.png");
              //greenAlienImg = pFive.loadImage("../../assets/images/alien_green.png");
              logo = pFive.loadImage("../../assets/images/kisweLogo.png");
            };

            /**
             * Setup the canvas.
             * Initialize the canvas and also initialize the boids' starting points.
             */
            pFive.setup = function () {
              pFive.createCanvas(1280, 720);
              // center position = center of gravity
              centerVector = pFive.createVector(pFive.width/2, pFive.height/2);

              // create boids given random initial positions outside the canvas boundaries
              // so that boids would close in from outside
              for (var i = 0; i < 30; i++) {
                if (i % 2 == 0) {
                  boids[i] = new Boid(
                      pFive.random(pFive.width + 10, pFive.width + 50),
                      pFive.random(-20, pFive.height + 20)
                  );
                }
                else {
                  boids[i] = new Boid(
                      pFive.random(-50, -10),
                      pFive.random(-20, pFive.height + 20)
                  );
                }
              }
            };

            /**
             * The draw loop.
             */
            pFive.draw = function () {
              pFive.clear(); // clear the canvas every frame
              determineLoopContinue();
              pFive.background(255, 255, 100, 100);
              pFive.image(logo, 20, pFive.height - 100, 48, 48);


              // Run all the boids
              for (var i = 0; i < boids.length; i++) {
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
            pFive.mousePressed = function () {
              pressed = true;
            };

            /**
             * Boid class constructor
             * @param x original x position
             * @param y original y position
             * @constructor constructs a single Boid at given x, y position.
             */
            function Boid(x, y) {
              this.acceleration = pFive.createVector(0, 0);
              this.velocity = p5.Vector.random2D();
              this.position = pFive.createVector(x, y);
              this.maxspeed = 4;    // Maximum speed
              // this.rotation = pFive.PI / pFive.random(-9.0, 9.0);
              this.inScreen = true;
            }

            /**
             * Runs the physical system of boids.
             * Takes into account the effect of gravity and
             * the effect of mouse press.
             */
            Boid.prototype.run = function () {
              this.gravity();
              this.update();
              this.render();
            };

            /**
             * Simulates the gravitational force (which is actually a spring-mass system).
             */
            Boid.prototype.gravity = function () {
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
            Boid.prototype.update = function() {
              // randomize acceleration to simulate drunken walker
              this.acceleration.add(pFive.random(-0.01, 0.01), pFive.random(-0.01, 0.01));

              // Update velocity, also add some randomness
              this.velocity.add(this.acceleration);
              this.velocity.add(pFive.random(-0.05, 0.05), pFive.random(-0.03, 0.03));

              // if the mouse is pressed, the nearby boids move in the opposite
              // direction from the selected location so that it clears out the space.
              if (pressed) {
                var mouseVector = pFive.createVector(pFive.mouseX, pFive.mouseY);
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
              if (this.inScreen) {
                pFive.image(blueAlienImg, this.position.x, this.position.y, 200, 200);
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
             * @param mouseVector the point of mouse click
             */
            Boid.prototype.repel = function(mouseVector) {
              var repelDirection = p5.Vector.sub(this.position, mouseVector).normalize();
              var dist = p5.Vector.dist(this.position, mouseVector);

              // within a certain range of the point clicked, repel the boids
              if (dist < 200) {
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
              if(url.indexOf('empty') !== -1) {
                pFive.noLoop();
                document.getElementById('defaultCanvas0').remove();
                console.log("URL changed - turning off sweep canvas");
              }
            }
          };

          /* instantiate p5 canvas */
          var myp5 = new p5(sketch);

          // P5 codesEND

          /**
           * Moves to the anchor with empty page.
           */
          $scope.goToEmptyPage = function() {
            // set the location - #empty
            $location.hash('empty');
            // move anchor to the location
            $anchorScroll();
          };

          /**
           * Moves to the sweep page.
           */
          $scope.goToSweepPage = function() {
            // set the location - #sweep
            $location.hash('sweep');
            // move anchor to the location
            $anchorScroll();
          };

          /**
           * Socket function that wraps the goToSweepPage function.
           */
          /*
          socketFactory.on('goToSweepPage', function() {
            console.log("goToSweepPage call received");
            $scope.$apply(function() {
              $scope.goToSweepPage();
            })
          });
          */

          /**
           * Socket function that wraps the goToEmptyPage function.
           */
          /*
          socketFactory.on('goToEmptyPage', function() {
            console.log("goToEmptyPage call received");
            $scope.$apply(function() {
              $scope.goToEmptyPage();
            })
          });
          */
        }]);
})();
