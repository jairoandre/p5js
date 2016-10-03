var scl = 10;

function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	frameRate(10);
}

function Food(x, y)  {
	this.x = x;
	this.y = y;
}

Snake.prototype.update = function() {
	this.x += this.xspeed * scl;
	this.y += this.yspeed * scl;
	this.x = constrain(this.x, 0, width - scl);
	this.y = constrain(this.y, 0, height - scl);
};

Snake.prototype.show = function() {
	fill(255);
	rect(this.x, this.y, scl, scl);

};

Snake.prototype.dir = function(x, y) {
	this.xspeed = x;
	this.yspeed = y;
};

var snake;

function keyPressed() {
	switch (keyCode) {
		case UP_ARROW:
			snake.dir(0, -1);
			break;
		case DOWN_ARROW:
			snake.dir(0, 1);
			break;
		case RIGHT_ARROW:
			snake.dir(1, 0);
			break;
		case LEFT_ARROW:
			snake.dir(-1, 0);
			break;
		default:
			break;
	}
}

function setup() {
	createCanvas(600, 600);
	snake = new Snake();
}

function draw() {
	background(51);
	snake.update();
	snake.show();
}