const blockSize = 30;

const boundaries = {
  top: [2 * blockSize, 2 * blockSize],
  bottom: [
    (parseInt(window.innerWidth/blockSize) * blockSize) - (4 * blockSize),
    (parseInt(window.innerHeight/blockSize) * blockSize) - (2 * blockSize)
  ]
}

// Paper to render the game board
const boardPaper = Raphael(...boundaries.top, ...boundaries.bottom);

// Paper to render Snake
const snakePaper = Raphael(...boundaries.top, ...boundaries.bottom);

// Paper to render food block, mainly to enable animation on the 
const foodPaper = Raphael(...boundaries.top, ...boundaries.bottom);

export {
  blockSize,
  boundaries, 
  boardPaper,
  snakePaper,
  foodPaper
}
