import { head, blockSize, boundaries, snakePaper } from './shared-constants';

const initial =  { x: boundaries.top[0] + (2*blockSize), y: boundaries.top[1] }

class Snake {
  // Skeleton and color are not used anywhere, they are initially put with an idea 
  // to provide users the ability to change snake color and its shape
  constructor(skeleton = "rectangles", color = "black") {
    Object.assign(this, {
        skeleton, color,
        head: initial,
        body: [...Array(4)].map((iter, i) => ({ x: (initial.x - i*blockSize), y: initial.y }))
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
      let block = snakePaper.rect(part.x, part.y, blockSize, blockSize);
      block.attr("fill", "#f00");
      block.attr("stroke", "#fff");
      block.blur();
      block.attr("opacity", 1.0 - index/(bodyLength * 2))
    });
  }
}

export default Snake;
