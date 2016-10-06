var grid = [];
var next = [];
var w = 200;
var h = 200;
var dA = 1.0;
var dB = .5;
var feed = .058;
var k = 0.062;

function setup() {
	createCanvas(w, h);
	grid = Array(w * h).fill().map(() => { return {a: 1, b: 0}; });
	next = Array(w * h).fill().map(() => { return {a: 1, b: 0}; });
	for (var i = 100; i < 110; i++) {
		for (var j = 100; j < 110; j++) {
			grid[j * w + i].b = 1;
		}
	}
}

function draw() {
	background(51);

	loadPixels();
	grid.forEach((cell, idx) => {
		var a = cell.a;
		var b = cell.b;
		next[idx].a = a + (dA * laplace(idx % w, floor(idx / w), true)) - (a * b * b) + (feed * (1 - a));
		next[idx].b = b + (dB * laplace(idx % w, floor(idx / w), false)) + (a * b * b) - ((k + feed) * b);
		var c = floor((next[idx].a - next[idx].b) * 255);
		c = constrain(c, 0, 255);
		var pix = idx * 4;
		pixels[pix + 0] = c;
		pixels[pix + 1] = c;
		pixels[pix + 2] = c;
		pixels[pix + 3] = 255;
	});
	updatePixels();

	swap();

}

function laplace(x, y, a) {
	var sum = 0;
	for (var i = x - 1; i <= x + 1; i++) {
		if (i < 0 || i >= w) {
			continue;
		}
		for (var j = y - 1; j <= y + 1; j++) {
			if (j < 0 || j >= h) {
				continue;
			}
			var factor = -1;
			var sameX = i === x;
			var sameY = j === y;
			if (sameX && sameY) {
				factor = -1;
			} else if (sameX || sameY) {
				factor = 0.2;
			} else {
				factor = 0.05;
			}

			if (a) {
				sum += grid[i + j * w].a * factor;
			} else {
				sum += grid[i + j * w].b * factor;
			}
		}
	}

	return sum;
}

function laplaceB() {
	return 1;
}

function swap() {
	var old = grid;
	grid = next;
	next = old;
}