	// coordenada x  y  wi  he
	// ctx.fillRect(0, 0, 50, 50);
;(function(){

	iniciar.addEventListener("click", function(){
		location.reload();
	})
	class Random{
		static get(inicio, final){
			return Math.floor(Math.random() * final) + inicio;
		}
	}

	class Food{
		constructor(x, y){
			this.x 		= x;
			this.y 		= y;
			this.width 	= 10;
			this.height = 10;
		}
		draw(){
			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
		static generate(){
			return new Food(Random.get(0, 500), Random.get(0, 300));
		}
	}

	class Square{
		constructor(x, y){
			this.x    	= x;
			this.y 	  	= y;
			this.width 	= 10;
			this.height = 10
			this.back   = null; // Cuadrado de atras
		}
		draw(){		
			ctx.fillRect(this.x,this.y,this.width,this.height);
			if (this.hasBack()){
				this.back.draw();
			}
		}
		hit(head, sec=false){
			// la cabeza con el segundo			
			if (this === head && !this.hasBack()) return false;
			if (this === head) return this.back.hit(head, true);

			if(sec && !this.hasBack()) return false;
			if(sec) return this.back.hit(head);

			//No es ni la cabeza ni el segundo
			if (this.hasBack()){
				return squareHit(this,head) || this.back.hit(head);
			}

			//no es la cabeza ni el segundo y soy el ultimo

			return squareHit(this,head);

		}
		hitBorder(){
			return this.x > 499 || this.x < 0 || this.y > 290 || this.y < 0;
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
			this.head.add();									
		}

		draw(){			
			this.head.draw();
		}
		dead(){
			return this.head.hit(this.head) || this.head.hitBorder();
		}
		eat(){			
			this.head.add();			
		}

		// movimientos
		right(){
			if (this.direction == "left") return;
			this.direction = "right";
		}
		left(){
			if (this.direction == "right") return;
			this.direction = "left";
		}
		up(){
			if (this.direction == "down") return;
			this.direction = "up";
		}
		down(){
			if (this.direction == "up") return;
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
	const velocity = 10;
	const snake  = new Snake();
	let foods = [];

	window.addEventListener("keydown", function(evt){
		if (evt.keyCode > 36 && evt.keyCode < 41) evt.preventDefault()	
		if (evt.keyCode === 40) return snake.down();
		if (evt.keyCode === 39) return snake.right();
		if (evt.keyCode === 38) return snake.up();
		if (evt.keyCode === 37) return snake.left();

		return false;
	})

	const animacion = setInterval(function(){
		snake.move();	
		ctx.clearRect(0,0,canvas.width,canvas.height);
		snake.draw();
		drawFood();

		if(snake.dead()){
			window.clearInterval(animacion);
			alert("Game Over");			
		}
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

			if(hit(food,snake.head)){
				snake.eat();
				removeFromFoods(food);
			}
		}
	}

	function removeFromFoods(food){
		foods = foods.filter(function(f){
			return food !== f;
		})
	}

	function squareHit(c1,c2){
		return c1.x == c2.x && c1.y == c2.y;
	}
	function hit(a,b){
 		var hit = false;
 		// Colisiones horizontales
 		if (b.x + b.width >= a.x && b.x < a.x + a.width){
 			// Colisiones verticales
 			if(b.y + b.height >= a.y && b.y < a.y + a.height){
 				hit = true;
 			}
 		}
 		// Colisiones a con b
 		if (a.x <= b.x && a.x + a.width >= b.x + b.width){
 			if(a.y <= b.y && a.y + a.height >= b.y + b.height){
 				hit = true;
 			}
 		}
 		return hit;
	}
})()