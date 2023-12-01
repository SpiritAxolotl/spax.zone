let canvas;
let context;
let particles = [];
let particleSettings = {
  posY: 0,
  count: 500,
  gravity: 0.4,
  punch: -500,
  punchTime : 0.2,
  wave: 0,
  deleteAfter : true
};

//random number between range
function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min;
}
//Creates confetti (particles)
function createConfetti() {
  while (particles.length < particleSettings.count) {
    let particle = new Particle();
    //random colors
    particle.color = `rgb( ${randomNumberGenerator(
      0,
      255
    )}, ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)}`;
    //store the particles
    particles.push(particle);
  }
}
//Starts the confetti (displays it on screen)
const startConfetti = () => {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  createConfetti();
  for (let i in particles) {
    //movement and shaking effect
    particleSettings.wave += 0.1;
    particles[i].tiltAngle += randomNumberGenerator(0.01, 0.4);
    particles[i].y += (Math.sin(particleSettings.wave) +
        particles[i].area +
        particleSettings.gravity + particles[i].punched) *
      0.2;
    
    if (particles[i].punchTime < 60 * particleSettings.punchTime)
    {
        particles[i].punched += particles[i].punch / 60 * particleSettings.punchTime * particles[i].punchTime;
        
        particles[i].punchTime++;
        
        if (particles[i].punchTime >= 60 * particleSettings.punchTime) particles[i].punched = 0;
    }
    
    particles[i].tilt = Math.cos(particles[i].tiltAngle) * 0.3;
    //draw the particle on screen
    particles[i].draw();
    //if particle has crossed the screen height
  if (!particleSettings.deleteAfter && particles[i].y > canvas.height) {
      //reset the particle's properties
      particles[i] = new Particle();
      //random colors
      particles[i].color = `rgb( ${randomNumberGenerator(
        0,
        255
      )}, ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)}`;
    }
  }
  animationTimer = requestAnimationFrame(startConfetti);
};

//Particle and particle features
function Particle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height + particleSettings.posY;
  this.area = randomNumberGenerator(5, 10);
  this.tilt = randomNumberGenerator(-4, 4);
  this.tiltAngle = 0;
  this.punch = particleSettings.punch * randomNumberGenerator(1, 5);
  this.punched = 0;
  this.punchTime = 0;
}
//Methods associated with Particle
Particle.prototype = {
  draw: function () {
    context.beginPath();
    context.lineWidth = this.area;
    context.strokeStyle = this.color;
    this.x = this.x + this.tilt;
    context.moveTo(this.x + this.area * 0.5, this.y);
    context.lineTo(this.x, this.y + this.tilt + this.area * 0.5);
    context.stroke();
  }
};

/*window.onload = () => {
  canvas.width = width;
  canvas.height = height;
  requestAnimationFrame(startConfetti);
};*/

function runConfetti ()
{
  canvas = document.getElementById("AreaForConfetti");
  context = canvas.getContext("2d");
  requestAnimationFrame(startConfetti);
}
