class Game {
	constructor() {
		this.score = -1;
		this.state = "pause";
		this.board = new Board();
		this.board.renderBoard();
		this.snake = new Snake();
		this.direction = "right";
		this.gameInterval = null;
		this.withScoreComesNewFood();		
		this.initializeListeners();
	}

	withScoreComesNewFood() {		
		this.updateScore(this.score += 1);
		staticPaper.clear();
		this.foodLocation = { 
			x: (parseInt(((Math.random() * boundaries.bottom[0]))/blockSize) * (blockSize)),
			y: (parseInt(((Math.random() * boundaries.bottom[1]))/blockSize) * (blockSize))
		};
		this.renderFoodBlock();
	}

	renderFoodBlock() {
		var food = staticPaper.rect(this.foodLocation.x, this.foodLocation.y, blockSize, blockSize);
		food.attr("fill", "#00ff00");
		food.attr("stroke", "#fff");

		food.blur();

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

	refreshGame() {
		!((this.snake.isEatingItself() || this.snake.isEscaping()) && !clearInterval(this.gameInterval)) 
		&& this.refreshSnake()			
	}

	refreshSnake() {
		paper.clear();			

		this.snake.renderBody(
			this.direction,
			this.didPoorSnakeEat()
		);	
	}

	didPoorSnakeEat() {
		return !!( this.snake.head.x === this.foodLocation.x
					&& this.snake.head.y === this.foodLocation.y
					&& !this.withScoreComesNewFood()
				  )
	}

	initializeListeners() {
		document.addEventListener('keydown', this.snakeCharmer.bind(this));

		window.addEventListener('resize', this.resizeListener.bind(this));

		document.getElementById("play-pause")
		        .addEventListener('click', this.danceNoDance.bind(this));
	}

	snakeCharmer(event) {		
		let keyCodeDirection = keyCodeMap[event.keyCode] || this.direction;

		this.direction = (this.direction !== opposites[keyCodeDirection])
							?
							keyCodeDirection
							:
							this.direction;

		event.keyCode === 32 
			&& this.danceNoDance({target: document.getElementById("play-pause")});
	}

	resizeListener() {
		// boundaries = { 
		// 	top: [2 * blockSize, blockSize], 
		// 	bottom: [
		// 		(parseInt(window.innerWidth/blockSize) * blockSize) - (4 * blockSize), 
		// 		(parseInt(window.innerHeight/blockSize) * blockSize) - (2 * blockSize)
		// 	] 
		// }
	}

	danceNoDance(event) {
		const prevState = this.state;
		this.state = toggles[this.state];
		event.target.src = event.target.src.replace(this.state + ".svg", prevState + ".svg")

		return this.state === "pause" ? this.pause() : this.play();
	}

	updateScore(score) {
		document.getElementById("score")
				.innerText = score.toString();
	}

	play() {
		this.gameInterval = setInterval(this.refreshGame.bind(this), 120);
	}

	pause() {
		clearInterval(this.gameInterval);
	}
}


game = new Game();