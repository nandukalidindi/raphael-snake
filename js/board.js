import { boundaries, blockSize, boardPaper } from './initializers';

const lineCounter = (length) => (Math.ceil(length/blockSize) + 2)

class Board {
  constructor() {
		Object.assign(this, {
			horizontals: lineCounter(boundaries.bottom[0] - boundaries.top[0]),
			verticals: lineCounter(boundaries.bottom[1] - boundaries.top[1])
		})
  }

	/**
   * Render vertical and horizontal SVG paths on the corresponding paper(boardPaper)
   *
   * @method renderBoard
   */
  renderBoard() {
		let line = null;

		// const lineContructor = (constructString) =

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
