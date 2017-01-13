var cols = 25;
var rows = 25;
var canvasSize = 500;
var w = canvasSize / cols, h = canvasSize / rows;
var grid = Array(cols).fill().map(() => Array(rows).fill());

var openSet = [];
var closedSet = [];
var start;
var end;

function Spot (i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.draw = function(col) {
		fill(col);
		noStroke();
		rect(this.i * w, this.j * h, w - 1, h - 1);
	};
}

function setup() {
	createCanvas(canvasSize, canvasSize);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i, j);
		}
	}
}

function draw() {
	background(0);
	if (openSet.length > 0) {
		// keep going
	} else {
		// no solution;
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].draw(255);
		}
	}
}
