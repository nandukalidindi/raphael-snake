class Game {
	constructor() {
		this.score = -1;
		this.board = new Board();
		this.board.renderBoard();
		this.snake = new Snake();
		this.direction = "right";
		this.gameInterval = null;
		this.generateNewFood();		

		document.addEventListener('keydown', (event) => {
			let keyCodeDirection = keyCodeMap[event.keyCode] || this.direction;

			this.direction = (this.direction !== opposites[keyCodeDirection])
								?
								keyCodeDirection
								:
								this.direction;			
		});		

		window.addEventListener('resize', (event) => {
			debugger;
		});
	}

	generateNewFood() {
		this.score += 1;
		staticPaper.clear();
		this.foodLocation = { 
			x: (parseInt(((Math.random() * boundaries.bottom[0]))/blockSize) * (blockSize)),
			y: (parseInt(((Math.random() * boundaries.bottom[1]))/blockSize) * (blockSize))
		};
		this.renderFoodBlock();
	}

	renderFoodBlock() {
		var food = staticPaper.rect(this.foodLocation.x, this.foodLocation.y, blockSize, blockSize);
		food.attr("fill", "#f00");
		food.attr("stroke", "#fff");

		staticPaper.bottom.blur();


		var foodX = this.foodLocation.x,
			foodY = this.foodLocation.y;


		const animation = (element) => {
			element.animate({ transform: "s1.2" }, 1000, 
				function() {
					this.animate({ transform: "s0.8" }, 1000, function() { animation(element) })
				}
			)
		}

		animation(food);
	}

	renderGame() {
		if(this.snake.isEatingItself() || this.snake.isEscaping() && !clearInterval(this.gameInterval))
			return
		
		paper.clear();			

		this.snake.renderBody(
			this.direction,
			!!!(this.snake.head.x == this.foodLocation.x 
				&& this.snake.head.y == this.foodLocation.y 
				&& !this.generateNewFood())
		);		
	}

	play() {
		this.gameInterval = setInterval(this.renderGame.bind(this), 150);
	}
}


game = new Game();
game.play();