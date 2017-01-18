var cols = 25;
var rows = 25;
var canvasSize = 300;
var w = canvasSize / cols, h = canvasSize / rows;
var grid = Array(cols).fill().map(() => Array(rows).fill());

var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];

function Spot (i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.previous = undefined;
	this.draw = function(col) {
		fill(col);
		noStroke();
		rect(this.i * w, this.j * h, w - 2, h - 2);
	};

	this.neighbors = function() {
		var neighbors = [];
		if (this.i < cols - 1) {
			neighbors.push(grid[this.i + 1][this.j]);
		}
		if (this.i > 0) {
			neighbors.push(grid[this.i - 1][this.j]);
		}
		if (this.j < rows - 1) {
			neighbors.push(grid[i][this.j + 1]);
		}
		if (this.j > 0) {
			neighbors.push(grid[i][this.j - 1]);
		}
		return neighbors;
	}
}

function heuristic (a, b) {
	return dist(a.i, a.j, b.i, b.j);
}

function setup() {
	createCanvas(canvasSize, canvasSize);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i, j);
		}
	}

	start = grid[0][0];
	end = grid[cols - 1][rows - 1];
	openSet.push(start);
}

function draw() {
	background(0);


	if (openSet.length > 0) {
		var current;

		openSet.forEach((spot) => {
			if (!current || spot.f < current.f) {
				current = spot;
			}
		});

		if (current === end) {
			console.log("DONE");
		}

		openSet = openSet.filter(spot => spot !== current);

		closedSet.push(current);

		current.neighbors().forEach((neighbor) => {
			if (!closedSet.includes(neighbor)) {
				var tempG = current.g + 1;
				if (openSet.includes(neighbor))	{
					if (tempG < neighbor.g) {
						neighbor.g = tempG;
					}
				} else {
					neighbor.g = tempG;
					openSet.push(neighbor);
				}

				neighbor.h = heuristic(neighbor, end);
				neighbor.f = neighbor.g + neighbor.h;
				neighbor.previous = current;

			}
		});

		path = [];
		var temp = current;
		path.push(temp);
		while (temp.previous) {
			path.push(temp.previous);
			temp = temp.previous;
		}

		// keep going
	} else {
		// no solution;
	}

	// DRAW
	grid.forEach(row => row.forEach(spot => spot.draw(255)));
	closedSet.forEach(i => i.draw(color(255,0,0)));
	openSet.forEach(i => i.draw(color(0,255,0)));
	path.forEach(i => i.draw(color(0,0,255)));

}
