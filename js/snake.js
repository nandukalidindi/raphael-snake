'use strict';

class Snake {
	constructor(skeleton = "rectangles", color = "black") {
		Object.assign(this, { 
				skeleton, color, 
				head, 
				body: [...Array(4)].map((iter, i) => ({ x: (head.x - i*blockSize), y: head.y })) 
			}
		);
	}

	moveAndHiss() {
		return {
			"up": () => { this.head = { x: this.head.x, y: this.head.y - blockSize } },
			"down": () => { this.head = { x: this.head.x, y: this.head.y + blockSize } },
			"right": () => { this.head = { x: this.head.x + blockSize, y: this.head.y } },
			"left": () => { this.head = { x: this.head.x - blockSize, y: this.head.y } },
		}
	}

	isEatingItself() {
		return this.body.slice(1).some(part => (part.x == this.head.x && part.y == this.head.y));
	}

	isEscaping() {
		return this.head.x >= boundaries.bottom[0] 
			   || this.head.y >= boundaries.bottom[1]
			   || this.head.x < 0
			   || this.head.y < 0
	}

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