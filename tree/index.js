function Branch(begin, size, angle) {
	this.begin = begin;
	this.size = size;
	this.angle = angle;
	this.weight = 10 * size / 100;

	this.show = function() {
		push();
		translate(this.begin.x, this.begin.y);
		rotate(this.angle);
		strokeWeight(this.weight);
		line(0, 0, 0, -this.size);
		if (this.size >  5) {
			var qtd = floor(random(1, 5));
			for (var i = 0; i < qtd; i++) {
				this.child().show();
			}
		}
		pop();
	}

	this.child = function() {
		var b = createVector(0, -this.size);
		var s = this.size * random(0.5, 0.85);
		var a = random (PI / 8, PI / 6) * (random() < 0.5 ? 1 : -1);
		return new Branch(b, s, a);
	}
}

var root;

function setup() {
	createCanvas(500, 500);
	stroke(255);
	var begin = createVector(width / 2, height);
	root = new Branch(begin, 100, 0);
}

function draw() {
	background(51);
	root.show();
	noLoop();
}