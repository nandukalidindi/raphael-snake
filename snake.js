'use strict';

class Snake {
	constructor(skeleton = "rectangles", color = "black", head = { x: boundaries.top[0] + (2*blockSize), y: boundaries.top[1] }) {
		Object.assign(this, { 
				skeleton, color, 
				head, 
				body: [...Array(4)].map((iter, i) => ({ x: (head.x - i*blockSize), y: head.y })) 
			}
		);
	}

	moveMap() {
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
		return this.head.x + blockSize >= boundaries.bottom[0] 
				|| this.head.y + blockSize >= boundaries.bottom[1]
				|| this.head.x + blockSize < boundaries.top[0]
				|| this.head.y < boundaries.top[1]
	}

	renderBody(direction, ate) {
		ate && this.body.splice(-1);
		this.moveMap()[direction]();		

		this.body = [this.head, ...this.body];
		this.body.forEach(part => {
			let circle = paper.rect(part.x, part.y, blockSize, blockSize);
			circle.attr("fill", "#f00");
			circle.attr("stroke", "#fff");
		});
	}
}