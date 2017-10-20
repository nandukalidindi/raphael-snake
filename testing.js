var paper = Raphael(0, 0, window.innerWidth, window.innerHeight);

paper.customAttributes.hue = function (num) {
num = num % 1;
return {fill: "hsb(" + num + ", 0.75, 1)"};
};
// Custom attribute “hue” will change fill
// to be given hue with fixed saturation and brightness.
// Now you can use it like this:
var c = paper.circle(10, 10, 10).attr({hue: .45});
// or even like this:
c.animate({hue: 1}, 1e3);

// You could also create custom attribute
// with multiple parameters:
paper.customAttributes.hsb = function (h, s, b) {
    return {fill: "hsb(" + [h, s, b].join(",") + ")"};
};
c.attr({hsb: "0.5 .8 1"});
c.animate({hsb: [1, 0, 0.5]}, 1e3);

// var x = 10,
// 	y = 10;

// var x1 = 30,
// y1 = 10;

// var x2 = 50,
// y2 = 10;

// var x3 = 70,
// y3 = 10;

// var circle = paper.circle(10, 10, 10);
// circle.attr("fill", "#f00");
// circle.attr("stroke", "#fff");

// var circle1 = paper.circle(20, 10, 10);
// circle1.attr("fill", "#f00");
// circle1.attr("stroke", "#fff");

// var circle2 = paper.circle(30, 10, 10);
// circle2.attr("fill", "#f00");
// circle2.attr("stroke", "#fff");

// var circle3 = paper.circle(40, 10, 10);
// circle3.attr("fill", "#f00");
// circle3.attr("stroke", "#fff");

// direction = "right"

// setInterval(() => {
// 	paper.clear();
// 	if(direction === "right") {
// 		x += 5;
// 		x1 += 5;
// 		x2 += 5;
// 		x3 += 5;
// 	}

// 	if(direction === "down") {
// 		y += 5;
// 		y1 += 5;
// 		y2 += 5;
// 		y3 += 5;
// 	}
// 	circle = paper.circle(x, y, 10);
// 	circle.attr("fill", "#f00");
// 	circle.attr("stroke", "#fff");

// 	circle1 = paper.circle(x1, y1, 10);
// 	circle1.attr("fill", "#f00");
// 	circle1.attr("stroke", "#fff");

// 	circle2 = paper.circle(x2, y2, 10);
// 	circle2.attr("fill", "#f00");
// 	circle2.attr("stroke", "#fff");

// 	circle3 = paper.circle(x3, y3, 10);
// 	circle3.attr("fill", "#f00");
// 	circle3.attr("stroke", "#fff");
// }, 25);


// window.addEventListener('keydown', function(event) {
// 	switch(event.keyCode) {
// 		case 37:
// 			direction = "left";
// 			return;
// 		case 39:
// 			direction = "right";
// 			return;
// 		case 38:
// 			direction = "up";
// 			return;
// 		case 40:
// 			direction = "down";
// 			return;			
// 	}
// })