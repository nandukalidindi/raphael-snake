import { boundaries, blockSize, boardPaper } from './shared-constants';

const lineCounter = (length) => (Math.ceil(length/blockSize) + 2)

class Board {
  constructor() {
    Object.assign(this, {
      horizontals: lineCounter(boundaries.bottom[0] - boundaries.top[0]),
      verticals: lineCounter(boundaries.bottom[1] - boundaries.top[1])
    });

    this.renderBoard();
  }

  /**
   * Render vertical and horizontal SVG paths on the corresponding paper(boardPaper)
   *
   * @method renderBoard
   */
  renderBoard() {
    var rect = boardPaper.rect(0, 0, window.innerWidth, window.innerHeight);
    rect.attr("fill", "#000000");
    rect.attr("stroke", "#00FF00");    

    // const lineContructor = (constructString) =
    let line = null;
    [...Array(this.horizontals)].forEach((none, index) => {
      line = boardPaper.path(["M", index * blockSize, 0, "L", index * blockSize, boundaries.bottom[1]])
      line.attr("fill", "#FFFFFF");
      line.attr("stroke", "#FFFFFF");
      line.attr("stroke-width", .4);
    });

    [...Array(this.verticals)].forEach((none, index) => {
      line = boardPaper.path(["M", 0, index * blockSize, "L", boundaries.bottom[0], index * blockSize])
      line.attr("fill", "#FFFFFF");
      line.attr("stroke", "#FFFFFF");
      line.attr("stroke-width", .4);
    });
  }
}

export default Board;
