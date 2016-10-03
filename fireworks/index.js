function Particle(x, y, hu, explosion) {
	this.pos = createVector(x,y);
	this.explosion = explosion;
	this.lifespan = 255;
	this.hu = hu;

	if (explosion) {
		this.vel = p5.Vector.random2D();
		this.vel.mult(random(2, 8));
	} else {
		this.vel = createVector(0, random(-12,-8));	
	}
	this.acc = createVector(0, 0);

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		if (this.explosion) {
			this.vel.mult(0.92);
			this.lifespan -= 4;
		}
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.show = function() {
		colorMode(HSB);
		stroke(this.hu, 255, 255, this.lifespan);
		point(this.pos.x, this.pos.y);
	}

	this.done = function() {
		return this.lifespan <= 0;
	}
}

function Firework() {
	this.hu = random(255);
	this.particle = new Particle(random(width), height, this.hu);
	this.exploded = false;
	this.particles = [];

	this.done = function() {
		return this.exploded && this.particles.length === 0;
	}

	this.update = function() {
		if (!this.exploded) {
			this.particle.applyForce(gravity);
			this.particle.update();	
			if (this.particle.vel.y >= 0) {
				this.exploded = true;
				this.explode();
			}
		}
		
		for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].applyForce(gravity);
			this.particles[i].update();
			if(this.particles[i].done()) {
				this.particles.splice(i, 1);
			}
		}
	}

	this.explode = function() {
		for (var i = 0, len = random(50,100) ; i < len; i++) {
			this.particles.push(new Particle(this.particle.pos.x, this.particle.pos.y, this.hu, true));
		}
	}

	this.show = function() {
		if (!this.exploded) {
			this.particle.show();
		}
		this.particles.forEach((p) => {
			p.show();
		});
	}
}

var fireworks = [];
var gravity;

function setup() {
	createCanvas(800, 600);
	colorMode(HSB);
	gravity = createVector(0, 0.2);
	stroke(255);
	strokeWeight(4);
}

function draw() {
	colorMode(RGB);
	background(0, 85);
	if (random(1) < 0.03) {
		fireworks.push(new Firework());
	}
	for (var i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].update();
		fireworks[i].show();
		if (fireworks[i].done()) {
			fireworks.splice(i, 1);	
		}
	}
}