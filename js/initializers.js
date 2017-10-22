const keyCodeMap = {
  38: "up",
  40: "down",
  39: "right",
  37: "left"
};

const blockSize = 30;

const boundaries = {
  top: [2 * blockSize, 2 * blockSize],
  bottom: [
    (parseInt(window.innerWidth/blockSize) * blockSize) - (4 * blockSize),
    (parseInt(window.innerHeight/blockSize) * blockSize) - (2 * blockSize)
  ]
}

const head =  { x: boundaries.top[0] + (2*blockSize), y: boundaries.top[1] }

const opposites = {right: "left", left: "right", up: "down", down: "up"};

const toggles = { play: "pause", pause: "play" }

const boardPaper = Raphael(...boundaries.top, ...boundaries.bottom);

var rect = boardPaper.rect(0, 0, window.innerWidth, window.innerHeight);
rect.attr("fill", "#000000");
rect.attr("stroke", "#00FF00");

const paper = Raphael(...boundaries.top, ...boundaries.bottom);

const staticPaper = Raphael(...boundaries.top, ...boundaries.bottom);

staticPaper.customAttributes.hsb = (h, s, b) => ({fill: "hsb(" + h + ", " + s + ", " + b});

export {
  keyCodeMap,
  blockSize,
  boundaries,
  head,
  opposites,
  toggles,
  boardPaper,
  paper,
  staticPaper
}
