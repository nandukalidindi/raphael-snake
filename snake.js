'use strict';

class Snake {
	constructor(skeleton = "rectangles", color = "black", head = { x: 50, y: 10 }) {
		Object.assign(this, { 
				skeleton, color, 
				head, 
				body: [...Array(4)].map((iter, i) => ({ x: (head.x - i*20), y: head.y })) 
			}
		);
	}

	moveMap() {
		return {
			"up": () => { this.head = { x: this.head.x, y: this.head.y - 20 } },
			"down": () => { this.head = { x: this.head.x, y: this.head.y + 20 } },
			"right": () => { this.head = { x: this.head.x + 20, y: this.head.y } },
			"left": () => { this.head = { x: this.head.x - 20, y: this.head.y } },
		}
	}

	isEatingItself() {
		return this.body.slice(1).some(part => (part.x == this.head.x && part.y == this.head.y));
	}

	renderBody(direction, ate) {
		ate && this.body.splice(-1);
		this.moveMap()[direction]();		

		this.body = [this.head, ...this.body];
		this.body.forEach(part => {
			let circle = paper.rect(part.x, part.y, 20, 20);
			circle.attr("fill", "#f00");
			circle.attr("stroke", "#fff");
		});
	}
}