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

	/**
   * Increment, update score span and set a new random location for food
   *
   * @method withScoreComesNewFood
   */
	withScoreComesNewFood() {
		this.updateScore(this.score += 1);
		staticPaper.clear();
		this.foodLocation = {
			x: (parseInt(((Math.random() * boundaries.bottom[0]))/blockSize) * (blockSize)),
			y: (parseInt(((Math.random() * boundaries.bottom[1]))/blockSize) * (blockSize))
		};
		this.renderFoodBlock();
	}

	/**
   * Draw a food block of the specified shape at the assigned food location
	 * NOTE: A shrink scale animation is enabled on the block, so that the snake
	 *       can better see?
   *
   * @method renderFoodBlock
   */
	renderFoodBlock() {
		var food = staticPaper.rect(this.foodLocation.x, this.foodLocation.y, blockSize, blockSize);
		food.attr("fill", "#00ff00");
		food.attr("stroke", "#fff");

		food.blur();

		var foodX = this.foodLocation.x,
			foodY = this.foodLocation.y;


		// http://dmitrybaranovskiy.github.io/raphael/reference.html#Element.animate
		// RaphaelJS element animation takes a callback argument which can be used
		// to mimik infinite looped animations
		const animation = (element) => {
			element.animate({ transform: "s1.2" }, 1000,
				function() {
					this.animate({ transform: "s0.8" }, 1000, function() { animation(element) })
				}
			)
		}

		animation(food);
	}

	/**
   * Check if all conditions are met for the game to proceed and then refresh
	 * snake body
   *
   * @method refreshGame
   */
	refreshGame() {
		// Is the snake is eating itself OR is escaping THEN stop the game
		// If nothing like that happens refresh snake body
		!((this.snake.isEatingItself() || this.snake.isEscaping()) && !clearInterval(this.gameInterval))
		&& this.refreshSnake()
	}

	/**
   * Clear the paper on which snake is rendered and update the body parts based
	 * on whether the snake just consumed food or not
   *
   * @method refreshSnake
   */
	refreshSnake() {
		paper.clear();

		this.snake.renderBody(
			this.direction,
			this.didPoorSnakeEat()
		);
	}

	/**
   * Check if the snake
   *
   * @method didPoorSnakeEat
   * @return {Boolean}
   */
	didPoorSnakeEat() {
		return !!( this.snake.head.x === this.foodLocation.x
					&& this.snake.head.y === this.foodLocation.y
				    && !this.withScoreComesNewFood()
				 )
	}

	/**
   * Initialize all the event listeners that are required to play the game
   *
   * @method addColumn (Event Handler)
   * @param {Object} event
   */
	initializeListeners() {
		document.addEventListener('keydown', this.snakeCharmer.bind(this));

		window.addEventListener('resize', this.resizeListener.bind(this));

		document.getElementById("play-pause")
		        .addEventListener('click', this.danceNoDance.bind(this));
	}

	/**
   * Add a column right beside the right clicked cell
   *
   * @method addColumn (Event Handler)
   * @param {Object} event
   */
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

	/**
   * Add a column right beside the right clicked cell
   *
   * @method addColumn (Event Handler)
   * @param {Object} event
   */
	resizeListener() {
		// boundaries = {
		// 	top: [2 * blockSize, blockSize],
		// 	bottom: [
		// 		(parseInt(window.innerWidth/blockSize) * blockSize) - (4 * blockSize),
		// 		(parseInt(window.innerHeight/blockSize) * blockSize) - (2 * blockSize)
		// 	]
		// }
	}

	/**
   * Add a column right beside the right clicked cell
   *
   * @method addColumn (Event Handler)
   * @param {Object} event
   */
	danceNoDance(event) {
		const prevState = this.state;
		this.state = toggles[this.state];
		event.target.src = event.target.src.replace(this.state + ".svg", prevState + ".svg")

		return this.state === "pause" ? this.pause() : this.play();
	}

	/**
   * Add a column right beside the right clicked cell
   *
   * @method addColumn (Event Handler)
   * @param {Object} event
   */
	updateScore(score) {
		document.getElementById("score")
				.innerText = score.toString();
	}

	/**
   * Add a column right beside the right clicked cell
   *
   * @method addColumn (Event Handler)
   * @param {Object} event
   */
	play() {
		this.gameInterval = setInterval(this.refreshGame.bind(this), 120);
	}

	/**
   * Add a column right beside the right clicked cell
   *
   * @method addColumn (Event Handler)
   * @param {Object} event
   */
	pause() {
		clearInterval(this.gameInterval);
	}
}


game = new Game();
