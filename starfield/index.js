function Star() {
	this.x = random(-width, width);
	this.y = random(-height, height);
	this.z = random(width);
	this.pz = this.z * 2;
}

Star.prototype.update = function() {

	this.pz = this.z;
	this.z -= speed;
	if (this.z < 1) {
		this.z = width;
		this.pz = this.z;
		this.x = random(-width, width);
		this.y = random(-height, height);
	}
};

Star.prototype.show = function() {
	fill(255);
	noStroke();

	var sx = map(this.x / this.z, 0, 1, 0, width);
	var sy = map(this.y / this.z, 0, 1, 0, width);

	var r = map(this.z, 0, width, 5, 0);

	ellipse(sx, sy, r, r);

	var px = map(this.x / this.pz, 0, 1, 0, width);
	var py = map(this.y / this.pz, 0, 1, 0, width);

	stroke(255);
	line(px, py, sx, sy);
};


var stars;
var speed;

function setup() {
	createCanvas(800, 800);
	stars = Array(800).fill().map(() => {
		return new Star();
	});
}

function draw() {
	speed = map(mouseX, 0, width, 0, 10);
	background(0);
	translate(width/2, height/2);
	stars.forEach((star) => {
		star.update();
		star.show();
	});
}