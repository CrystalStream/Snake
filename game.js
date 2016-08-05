	// coordenada x  y  wi  he
	// ctx.fillRect(0, 0, 50, 50);
;(function(){
	class Random{
		static get(inicio, final){
			return Math.floor(Math.random() * final) + inicio;
		}
	}

	class Food{
		constructor(x, y){
			this.x = x;
			this.y = y;
		}
		draw(){
			ctx.fillRect(this.x,this.y,10,10);
		}
		static generate(){
			return new Food(Random.get(0, 500), Random.get(0, 300));
		}
	}

	class Square{
		constructor(x, y){
			this.x    = x;
			this.y 	  = y;
			this.back = null; // Cuadrado de atras
		}
		draw(){		
			ctx.fillRect(this.x,this.y,10,10);
			if (this.hasBack()){
				this.back.draw();
			}
		}
		add(){
			if (this.hasBack()) return this.back.add();
			this.back = new Square(this.x,this.y);
		}
		hasBack(){
			return this.back !== null;
		}

		right(){
			this.copy();
			this.x += 10;
		}
		left(){
			this.copy();
			this.x -= 10;
		}
		up(){
			this.copy();
			this.y -= 10;
		}
		down(){
			this.copy();
			this.y += 10;
		}

		copy(){
			if (this.hasBack()){
				this.back.copy();
				this.back.x = this.x;
				this.back.y = this.y;
			}
		}
	}

	class Snake{
		constructor(){
			this.head = new Square(100, 0);
			this.draw();
			this.direction = "right";
			this.head.add();			
		}

		draw(){			
			this.head.draw();
		}

		// movimientos
		right(){
			this.direction = "right";
		}
		left(){
			this.direction = "left";
		}
		up(){
			this.direction = "up";
		}
		down(){
			this.direction = "down";
		}

		move(){
			if (this.direction === "up") return this.head.up();
			if (this.direction === "down") return this.head.down();
			if (this.direction === "left") return this.head.left();
			if (this.direction === "right") return this.head.right();
		}
	}
	const canvas = document.getElementById('canvas');
	const ctx    = canvas.getContext('2d');
	const snake  = new Snake();
	let foods = [];

	window.addEventListener("keydown", function(evt){
		evt.preventDefault();
		if (evt.keyCode === 40) return snake.down();
		if (evt.keyCode === 39) return snake.right();
		if (evt.keyCode === 38) return snake.up();
		if (evt.keyCode === 37) return snake.left();

		return false;
	})

	setInterval(function(){
		snake.move();	
		ctx.clearRect(0,0,canvas.width,canvas.height);
		snake.draw();
		drawFood();
	}, 1000 / 10);

	setInterval(function(){
		const food = Food.generate();
		foods.push(food);

		setTimeout(function(){
			removeFromFoods(food);
		}, 5000)

	}, 5000);

	function drawFood(){
		for (const i in foods){
			const food = foods[i];
			food.draw();
		}
	}

	function removeFromFoods(food){
		foods = foods.filter(function(f){
			return food !== f;
		})
	}
})()