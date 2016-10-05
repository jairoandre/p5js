var grid = [];
var next = [];
var w = 200;
var h = 200;

function setup() {
	createCanvas(w, h);
	grid = Array(w * h).fill().map(() => { return {a: random(1), b: random(1)}; });
	next = Array(w * h).fill().map(() => { return {a: random(1), b: random(1)}; });
}

function draw() {
	background(51);



	loadPixels();
	grid.forEach((i, idx) => {
		next[idx].a = grid[idx].a * 0.8;
		next[idx].b = grid[idx].b * 1.2;
		var pix = idx * 4;
		pixels[pix + 0] = i.a;
		pixels[pix + 1] = 0;
		pixels[pix + 2] = i.b;
		pixels[pix + 3] = 255;
	});
	updatePixels();
	

	swap();

}

function swap() {
	var old = grid;
	grid = next;
	next = old;
}