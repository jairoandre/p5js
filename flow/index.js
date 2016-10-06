var x, y, xspeed, yspeed;


function setup() {
	createCanvas(400, 300);
	x = width / 2;
	y = height / 2;
	xspeed = 1;
	yspeed = -1;
	noStroke();
	fill(255);
}

function draw() {
	background(51);
	ellipse(x, y, 40, 40);
	x += xspeed;
	y += yspeed;
	if (x > width || x < 0) {
		xspeed *= -1;
	}
	if (y > height || y < 0) {
		yspeed *= -1;
	}
}