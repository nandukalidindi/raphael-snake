class Game {
	constructor() {
		this.score = -1;
		this.board = new Board();
		this.board.renderBoard();
		this.snake = new Snake();
		this.direction = "right";
		this.gameInterval = null;
		this.generateNewFood();		
		this.initializeListeners();
	}

	generateNewFood() {
		this.score += 1;
		this.updateScore(this.score);
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

	renderGame() {
		!(this.snake.isEatingItself() || this.snake.isEscaping() && !clearInterval(this.gameInterval))
			&& (() => {
				paper.clear();			

				this.snake.renderBody(
					this.direction,
					!!!(this.snake.head.x == this.foodLocation.x 
						&& this.snake.head.y == this.foodLocation.y 
						&& !this.generateNewFood())
				);		
			})()
	}

	initializeListeners() {		
		this.directionListener();
		this.resizeListener();
		this.playPauseListener();		
	}

	directionListener() {
		document.addEventListener('keydown', (event) => {
			let keyCodeDirection = keyCodeMap[event.keyCode] || this.direction;

			this.direction = (this.direction !== opposites[keyCodeDirection])
								?
								keyCodeDirection
								:
								this.direction;

			keyCodeDirection === "space" && this.pause();
		});
	}

	resizeListener() {
		window.addEventListener('resize', (event) => {
			boundaries = { 
				top: [2 * blockSize, blockSize], 
				bottom: [
					(parseInt(window.innerWidth/blockSize) * blockSize) - (4 * blockSize), 
					(parseInt(window.innerHeight/blockSize) * blockSize) - (2 * blockSize)] 
			}
		});
		// boardPaper.clear();
		// this.board.renderBoard();
	}

	playPauseListener() {
		document.getElementById("play-pause").addEventListener('click', (event) => {

			const pause = event.target.src.indexOf("pause.svg") !== -1

			event.target.src = pause ? event.target.src.replace("pause.svg", "play.svg")										
							   			: 
							   		   event.target.src.replace("play.svg", "pause.svg")
							   		   

			return pause ? this.pause() : this.play();
		})
	}

	updateScore(score) {
		var scoreElement = document.getElementById("score");
		scoreElement.innerText = score.toString();
	}

	play() {
		this.gameInterval = setInterval(this.renderGame.bind(this), 120);
	}

	pause() {
		return clearInterval(this.gameInterval);
	}
}


game = new Game();