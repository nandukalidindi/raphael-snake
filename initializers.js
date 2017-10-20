const keyCodeMap = {
	38: "up",
	40: "down",
	39: "right",
	37: "left",	
};

const opposites = {right: "left", left: "right", up: "down", down: "up"};

const boardPaper = Raphael(0, 0, window.innerWidth, window.innerHeight);

// var rect = boardPaper.rect(0, 0, window.innerWidth, window.innerHeight);
// rect.attr("fill", "#000000");
// rect.attr("stroke", "#000000");

const paper = Raphael(0, 0, window.innerWidth, window.innerHeight);

const staticPaper = Raphael(0, 0, window.innerWidth, window.innerHeight);

staticPaper.customAttributes.hsb = (h, s, b) => ({fill: "hsb(" + h + ", " + s + ", " + b});

