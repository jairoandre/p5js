function Ball() {
	this.x = (width + w)/2;
	this.y = (width + h)/2;
	this.xspeed = 1;
	this.yspeed = 1;

	this.update = function() {
		this.x += this.xspeed;
		this.y += this.yspeed;
		this.checkLimits();
	};

	this.show = function() {
		fill(120);		
		rect(this.x, this.y, scl, scl);
	};

	this.checkLimits = function() {
		if (this.x >= (w - scl)) {
			this.xspeed = -1;
		} else if (this.x <= 0) {
			this.xspeed = 1;
		}

		if (this.y >= (h - scl)) {
			this.yspeed = -1;
		} else if (this.y <= 0) {
			this.yspeed = 1;
		}
	};

}

function Board() {
	this.x = width/2;
	this.y = height/2;
	this.ball = new Ball();

	this.show= function() {
		push();
		translate(-w/2, -h/2);
		noFill();
		rect(this.x, this.y, w, h);
		this.ball.update();
		this.ball.show();
		pop();
	};
}

var scl = 20;
var ball;

var w = 600;
var h = 300;


function setup() {
	createCanvas(1200, 600);
	stroke(255);
	noFill();
	board = new Board();
}

function draw() {
	background(51);
	rect(20, 20, 30, 30);
	board.show();
	noLoop();
}