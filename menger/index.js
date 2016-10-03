var a = 0;
var sponge = [];

function Box(x, y, z, r) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r;
}

Box.prototype.show = function() {
	push();
	translate(this.x, this.y, this.z);
	// stroke(255);
	noStroke();
	noFill();
	box(this.r);
	pop();
};

Box.prototype.generate = function() {
	var boxes = [];
	for (var x = -1; x < 2; x++) {
		for (var y = -1; y < 2; y++) {
			for (var z = -1; z < 2; z++) {
				var sum = abs(x) + abs(y) + abs(z);
				var newR = this.r/3;
				if (sum > 1) {
					var b = new Box(this.x + x * newR, this.y + y * newR, this.z + z * newR, newR);
					boxes.push(b);	
				}
			}
		}
	}
	return boxes;
};

function mousePressed() {
	var next = [];
	sponge.forEach((b) => {
		next = next.concat(b.generate());
	});
	sponge = next;
}

function setup() {
	createCanvas(400, 400, WEBGL);
	sponge.push(new Box(0,0,0,200));
}

function draw() {
	background(51);

	rotateX(a);
	rotateY(a * 0.4);
	rotateZ(a * 0.4);
	sponge.forEach((b, idx) => {
		b.show();
	});

	a += 0.01;
}