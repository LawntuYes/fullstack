let balls = [];
const boundaryRadius = 300; // Radius of the invisible bounding sphere

function setup() {
createCanvas(windowWidth, windowHeight, WEBGL);
  // Create 100 balls
for (let i = 0; i < 100; i++) {
    // Choose a random ball radius between 5 and 15
    let r = random(5, 15);
    // Ensure the ball starts completely inside the boundary:
    // Multiply a random unit vector by a random length from 0 to (boundaryRadius - r)
    let pos = p5.Vector.random3D().mult(random(0, boundaryRadius - r));
    // Give the ball a random velocity (speed between 1 and 3)
    let vel = p5.Vector.random3D().mult(random(1, 3));
    // Pick a random color
    let col = color(random(255), random(255), random(255));
    balls.push({ pos, vel, r, col });
}
}

function draw() {
background(0);
  // Enable mouse interaction to orbit the scene
orbitControl();  
  // Set up some basic lighting
ambientLight(50);
pointLight(255, 255, 255, 0, 0, 500);

  // (Optional) Draw a wireframe sphere to show the boundary
push();
noFill();
stroke(255);
sphere(boundaryRadius);
pop();

  // Update and draw each ball
for (let ball of balls) {
    // Update the ball's position
    ball.pos.add(ball.vel);
    
    // Check for collision with the inner surface of the boundary sphere.
    // If the distance from the center plus the ball's radius exceeds the boundary,
    // we reflect the ball's velocity off the surface.
    if (ball.pos.mag() + ball.r > boundaryRadius) {
      // Compute the outward normal (from the center to the ball)
        let n = ball.pos.copy().normalize();
      // Reflect the velocity: v = v - 2*(v • n)*n
        let v_dot_n = ball.vel.dot(n);
      ball.vel.sub(n.mult(2 * v_dot_n));
      // Reposition the ball so it lies exactly on the inner surface
        ball.pos = n.mult(boundaryRadius - ball.r);
    }
    
    // Draw the ball as a colored sphere
    push();
    translate(ball.pos.x, ball.pos.y, ball.pos.z);
    fill(ball.col);
    noStroke();
    sphere(ball.r);
    pop();
    }
}
