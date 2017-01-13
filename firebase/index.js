var canvas;
var currentPath;
var drawing;
var isDrawing = false;

function setup() {
	canvas = createCanvas(500, 500);
	drawing = [];
	canvas.mousePressed(startPath);
	canvas.mouseReleased(endPath);
}

function startPath() {
	isDrawing = true;
	currentPath = [];
	drawing.push(currentPath);
}

function endPath() {
	isDrawing = false;
}

function draw() {
	background(51);
	if (isDrawing) {
		var point = {
			x: mouseX,
			y: mouseY
		};
		currentPath.push(point);
	}
	stroke(255);
	strokeWeight(4);
	noFill();
	for (var i = 0, dlen = drawing.length; i < dlen; i++) {
		beginShape();
		var path = drawing[i];
		for(var j = 0, clen = path.length; j < clen; j++) {
			var point = path[j];
			vertex(point.x, point.y)
		}
		endShape();
	}
}
