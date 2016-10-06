var x = 0.01, y = 0, z = 0;
var a = 5, b = 15, c = 8/3;
var dt = 0.01;
var points = [];

function setup() {
	createCanvas(600,600);	
	stroke(255);
}

function draw() {	
	background(51);
	var dx = a * (y - x);
	var dy = x * (b - z) - y;
	var dz = x * y  - c * z;
	x = x + dx * dt;
	y = y + dy * dt;
	z = z + dz * dt;
	points.push(createVector(x, y, z));
	translate(width/2, height/2);
	noFill();
	beginShape();
	for (var i = 0, len = points.length; i < len; i++) {
		vertex(points[i].x, points[i].y);
	}
	endShape();
}