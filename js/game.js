import Board from './board';
import Snake from './snake';
import { boundaries, snakePaper, foodPaper, boundaries, blockSize } from './shared-constants';

const toggles = { play: "pause", pause: "play" }

const opposites = {right: "left", left: "right", up: "down", down: "up"};

const keyCodeMap = {
  38: "up",
  40: "down",
  39: "right",
  37: "left"
};

class Game {
  constructor() {
    Object.assign(this, {
      score: -1,
      state: "pause",
      direction: "right",
      gameInterval: null,
      board: new Board(),
      snake: new Snake()
    });
    
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
    foodPaper.clear();
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
    var food = foodPaper.rect(this.foodLocation.x, this.foodLocation.y, blockSize, blockSize);
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
    snakePaper.clear();

    this.snake.renderBody(
      this.direction,
      this.didPoorSnakeEat()
    );
  }

  /**
   * Check if the snake is at the location of the food, if yes then update
   * score and create new food
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
   * @method initializeListeners
   */
  initializeListeners() {
    document.addEventListener('keydown', this.snakeCharmer.bind(this));

    window.addEventListener('resize', this.resizeListener.bind(this));

    document.getElementById("play-pause")
            .addEventListener('click', this.danceNoDance.bind(this));
  }

  /**
   * Event handler to navigate (or tame) the snake in the respective directions
   *
   * @method snakeCharmer (Event Handler)
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
   * Resize listener to re adjust all the calculations as per the newly
   * adjusted screen size
   * TODO: Implementable by avoiding the first trigger on page reload
   *
   * @method resizeListener (Event Handler)
   */
  resizeListener() {
    // boundaries = {
    //  top: [2 * blockSize, blockSize],
    //  bottom: [
    //      (parseInt(window.innerWidth/blockSize) * blockSize) - (4 * blockSize),
    //      (parseInt(window.innerHeight/blockSize) * blockSize) - (2 * blockSize)
    //  ]
    // }
  }

  /**
   * Start / Pause the game play at any point in time by toggling the icon
   * or by tapping spacebar
   *
   * @method danceNoDance (Event Handler)
   * @param {Object} event
   */
  danceNoDance(event) {
    const prevState = this.state;
    this.state = toggles[this.state];
    event.target.src = event.target.src.replace(this.state + ".svg", prevState + ".svg")

    return this.state === "pause" ? this.pause() : this.play();
  }

  /**
   * Update DOM element with the corresponding score
   *
   * @method updateScore
   * @param {Integer} score
   */
  updateScore(score) {
    const scoreElement = document.getElementById("score");

    scoreElement.innerText = score.toString();

    scoreElement.animate //Check if the browser supports animate API because SAFARI does not
    && scoreElement.animate([{transform: "scale(2.0)"}, {transform: "scale(1.0)"}], {duration: 2000});
  }

  /**
   * Start the game play by setting the interval to specified framerate
   *
   * @method play
   */
  play() {
    this.gameInterval = setInterval(this.refreshGame.bind(this), 120);
  }

  /**
   * Pause the game play by clearing the assigned interval
   *
   * @method pause
   */
  pause() {
    clearInterval(this.gameInterval);
  }
}

const game = new Game();
