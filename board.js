class Board {
	constructor() {

	}

	renderBoard() {
		const numHorizontalLines = Math.ceil((boundaries.bottom[0] - boundaries.top[0])/blockSize) + 2;
		const numVerticalLines = Math.ceil((boundaries.bottom[1] - boundaries.top[1])/blockSize) + 2;
		
		[...Array(numHorizontalLines)].forEach((none, index) => {
			let line = boardPaper.path("M" + index * blockSize + ",0,L" + index * blockSize + "," + boundaries.bottom[1])
			line.attr("fill", "#FFFFFF");
			line.attr("stroke", "#FFFFFF");
		});

		[...Array(numVerticalLines)].forEach((none, index) => {
			let line = boardPaper.path("M0," + index * blockSize + ",L" + boundaries.bottom[0] + "," + index * blockSize)
			line.attr("fill", "#FFFFFF");
			line.attr("stroke", "#FFFFFF");
		});
	}
}