const keyCodeMap = {
	38: "up",
	40: "down",
	39: "right",
	37: "left",	
}


class Game {
	constructor() {
		this.score = 0;
		this.snake = new Snake();
		this.direction = "right";
		this.generateNewFood();		

		document.addEventListener('keydown', (event) => {
			this.direction = keyCodeMap[event.keyCode] || this.direction;
		});		

		window.addEventListener('resize', (event) => {
			debugger;
		});
	}

	generateNewFood() {
		anotherPaper.clear();
		this.foodLocation = { 
			x: (parseInt(((Math.random() * window.innerWidth - 40))/20) * 20) + 10,
			y: (parseInt(((Math.random() * window.innerHeight -40))/20) * 20) + 10,
		};
		this.renderFoodBlock();
	}

	renderFoodBlock() {
		var food = anotherPaper.rect(this.foodLocation.x, this.foodLocation.y, 20, 20);
		food.attr("fill", "#f00");
		food.attr("stroke", "#fff");		

		var foodX = this.foodLocation.x,
			foodY = this.foodLocation.y;


		const animation = (element) => {
			element.animate({
				transform: "s1.1"
			}, 1000, function() {
				this.animate({
					transform: "s0.9"
				}, 1000, function() { animation(element) })
			})
		}

		animation(food);
	}

	renderGame() {
		// if(paper.bottom) {
		// 	var circle = paper.bottom.next;
		// 	var arr = []
		// 	while(circle) {
		// 		arr.push(circle);
		// 		circle = circle.next;				
		// 	}

		// 	arr.forEach(item => { item.remove() });
		// }	

		paper.clear();	

		// this.renderFoodBlock();
		this.snake.renderBody(
			this.direction,
			!!!(this.snake.head.x == this.foodLocation.x 
				&& this.snake.head.y == this.foodLocation.y 
				&& !this.generateNewFood())
		);		
	}

	play() {
		setInterval(this.renderGame.bind(this), 100);
	}
}


game = new Game();
game.play();