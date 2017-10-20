const keyCodeMap = {
	38: "up",
	40: "down",
	39: "right",
	37: "left",	
};

const blockSize = 30;

const boundaries = { 
	top: [2 * blockSize, blockSize], 
	bottom: [window.innerWidth - (4 * blockSize), window.innerHeight - (2 * blockSize)] 
}

const opposites = {right: "left", left: "right", up: "down", down: "up"};

const boardPaper = Raphael(...boundaries.top, ...boundaries.bottom);



var rect = boardPaper.rect(0, 0, window.innerWidth, window.innerHeight);
rect.attr("fill", "#000000");
rect.attr("stroke", "#000000");

const paper = Raphael(...boundaries.top, ...boundaries.bottom);

const staticPaper = Raphael(...boundaries.top, ...boundaries.bottom);

staticPaper.customAttributes.hsb = (h, s, b) => ({fill: "hsb(" + h + ", " + s + ", " + b});
