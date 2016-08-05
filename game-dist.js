// coordenada x  y  wi  he
// ctx.fillRect(0, 0, 50, 50);
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {
	var Random = (function () {
		function Random() {
			_classCallCheck(this, Random);
		}

		_createClass(Random, null, [{
			key: "get",
			value: function get(inicio, final) {
				return Math.floor(Math.random() * final) + inicio;
			}
		}]);

		return Random;
	})();

	var Food = (function () {
		function Food(x, y) {
			_classCallCheck(this, Food);

			this.x = x;
			this.y = y;
		}

		_createClass(Food, [{
			key: "draw",
			value: function draw() {
				ctx.fillRect(this.x, this.y, 10, 10);
			}
		}], [{
			key: "generate",
			value: function generate() {
				return new Food(Random.get(0, 500), Random.get(0, 300));
			}
		}]);

		return Food;
	})();

	var Square = (function () {
		function Square(x, y) {
			_classCallCheck(this, Square);

			this.x = x;
			this.y = y;
			this.back = null; // Cuadrado de atras
		}

		_createClass(Square, [{
			key: "draw",
			value: function draw() {
				ctx.fillRect(this.x, this.y, 10, 10);
				if (this.hasBack()) {
					this.back.draw();
				}
			}
		}, {
			key: "add",
			value: function add() {
				if (this.hasBack()) return this.back.add();
				this.back = new Square(this.x, this.y);
			}
		}, {
			key: "hasBack",
			value: function hasBack() {
				return this.back !== null;
			}
		}, {
			key: "right",
			value: function right() {
				this.copy();
				this.x += 10;
			}
		}, {
			key: "left",
			value: function left() {
				this.copy();
				this.x -= 10;
			}
		}, {
			key: "up",
			value: function up() {
				this.copy();
				this.y -= 10;
			}
		}, {
			key: "down",
			value: function down() {
				this.copy();
				this.y += 10;
			}
		}, {
			key: "copy",
			value: function copy() {
				if (this.hasBack()) {
					this.back.copy();
					this.back.x = this.x;
					this.back.y = this.y;
				}
			}
		}]);

		return Square;
	})();

	var Snake = (function () {
		function Snake() {
			_classCallCheck(this, Snake);

			this.head = new Square(100, 0);
			this.draw();
			this.direction = "right";
			this.head.add();
		}

		_createClass(Snake, [{
			key: "draw",
			value: function draw() {
				this.head.draw();
			}
		}, {
			key: "right",

			// movimientos
			value: function right() {
				this.direction = "right";
			}
		}, {
			key: "left",
			value: function left() {
				this.direction = "left";
			}
		}, {
			key: "up",
			value: function up() {
				this.direction = "up";
			}
		}, {
			key: "down",
			value: function down() {
				this.direction = "down";
			}
		}, {
			key: "move",
			value: function move() {
				if (this.direction === "up") return this.head.up();
				if (this.direction === "down") return this.head.down();
				if (this.direction === "left") return this.head.left();
				if (this.direction === "right") return this.head.right();
			}
		}]);

		return Snake;
	})();

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var snake = new Snake();
	var foods = [];

	window.addEventListener("keydown", function (evt) {
		evt.preventDefault();
		if (evt.keyCode === 40) return snake.down();
		if (evt.keyCode === 39) return snake.right();
		if (evt.keyCode === 38) return snake.up();
		if (evt.keyCode === 37) return snake.left();

		return false;
	});

	setInterval(function () {
		snake.move();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		snake.draw();
		drawFood();
	}, 1000 / 10);

	setInterval(function () {
		var food = Food.generate();
		foods.push(food);

		setTimeout(function () {
			removeFromFoods(food);
		}, 5000);
	}, 5000);

	function drawFood() {
		for (var i in foods) {
			var food = foods[i];
			food.draw();
		}
	}

	function removeFromFoods(food) {
		foods = foods.filter(function (f) {
			return food !== f;
		});
	}
})();
