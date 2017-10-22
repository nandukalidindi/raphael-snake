import { head, blockSize, boundaries, paper } from './initializers';

class Snake {
  constructor(skeleton = "rectangles", color = "black") {
    Object.assign(this, {
        skeleton, color,
        head,
        body: [...Array(4)].map((iter, i) => ({ x: (head.x - i*blockSize), y: head.y }))
      }
    );
  }

  /**
   * Map that executes the specific logic for each direction that is provided
   *
   * @method moveAndHiss
   */
  moveAndHiss() {
    return {
      up: () => { this.head = { x: this.head.x, y: this.head.y - blockSize } },
      down: () => { this.head = { x: this.head.x, y: this.head.y + blockSize } },
      right: () => { this.head = { x: this.head.x + blockSize, y: this.head.y } },
      left: () => { this.head = { x: this.head.x - blockSize, y: this.head.y } },
    }
  }

  /**
   * Condition check to see if the snake is colliding with itself
   * (because it's too hungry it wants to eat itself?)
   *
   * @method isEatingItself
   * @return {Boolean}
   */
  isEatingItself() {
    return this.body.slice(1).some(part => (part.x == this.head.x && part.y == this.head.y));
  }

  /**
   * Conditional check to see if the snake is colliding with the boundaries
   * (because it is like Sylvester Stallone to pull off an Escape Plan?)
   *
   * @method isEscaping
   * @return {Boolean}
   */
  isEscaping() {
    return this.head.x >= boundaries.bottom[0]
         || this.head.y >= boundaries.bottom[1]
         || this.head.x < 0
         || this.head.y < 0
  }

  /**
   * Render all the blocks of the snake's body from the body property
   * If the snake did not eat then slice the tail and add new head
   *
   * @method renderBoard
   */
  renderBody(direction, didPoorSnakeEat) {
    !didPoorSnakeEat && this.body.splice(-1);
    this.moveAndHiss()[direction]();

    this.body = [this.head, ...this.body];
    const bodyLength = this.body.length;
    this.body.forEach((part, index) => {
      let block = paper.rect(part.x, part.y, blockSize, blockSize);
      block.attr("fill", "#f00");
      block.attr("stroke", "#fff");
      block.blur();
      block.attr("opacity", 1.0 - index/(bodyLength * 2))
    });
  }
}

export default Snake;
