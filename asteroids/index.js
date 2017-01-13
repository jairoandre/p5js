var ship;

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
}

function draw() {
	background(0);
	ship.render();
}

function Ship() {
	this.pos = createVector(width/2, height/2);
	this.r = 10;
	this.heading = 0;

	this.render = function() {
		translate(this.pos.x, this.pos.y);
		rotate(this.heading);
		noFill();
		stroke(255);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
	}
}
