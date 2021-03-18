// let fingers;

// function setup() {
//   createCanvas(320, 240);
//   // specify multiple formats for different browsers
//   video = createVideo(['assets/video.MP4', 'assets/video.webm']);
//   video.loop();
//   video.hide();
//   noStroke();
//   fill(0);
// }

// function draw() {
//   background(800);
//   video.loadPixels();
//   const stepSize = round(constrain(mouseX / 8, 6, 32));
//   for (let y = 0; y < height; y += stepSize) {
//     for (let x = 0; x < width; x += stepSize) {
//       const i = y * width + x;
//       const darkness = (255 - video.pixels[i * 4]) / 255;
//       const radius = stepSize * darkness;
//       ellipse(x, y, radius, radius);
//     }
//   }
// }

let tex;
const CYCLE = 15;

function setup() {
	createCanvas(windowWidth, windowHeight,WEBGL);
	tex = createGraphics(width,width);
	texture(tex);		

}

function draw() {

	noStroke();
	background(0);

	tex.background(255);
	
	let r = min(width,height)*0.2;
	
	rotateX(PI/4);
	rotateY(-PI/8);
	rotateZ(-PI/8);

	translate(-r/2,0,0);
	translate(0,0,0);
	grid(tex,true);
	torus(r,r*0.5 ,100,100);
	translate(r,0,0);
	grid(tex,false);
	rotateX(PI/2);
	torus(r,r*0.45 ,100,100);
	
}


function grid(gra,offX){
	let step = min(gra.width,gra.height)/30;
	let frameRatio = (frameCount%CYCLE)/CYCLE;
	let offsetX = offX == true ? -frameRatio * step : 0;
	let offsetY = offX == false ? -frameRatio * step*2 : 0;
	gra.background(0);
	gra.stroke(255);
	gra.fill(0);
	gra.strokeWeight(2);
	let count = 0;
	for(let x = offsetX; x < gra.width; x+=step){
		for(let y = offsetY; y < gra.height; y+=step*2){
			//if(random() > 0.99)gra.fill(255);
			//else gra.fill(0);
			gra.rect(x,y,step,step*2);
		}
		count ++;
	}
}

function separateGrid(x, y, w, h, depth, gra) {
	if (depth > 0) {
		let frameRatio = (frameCount%CYCLE)/CYCLE;
		let frameRad = frameRatio * TAU;
		let n = noise(x / 1000 + cos(frameRad), y / 1000  + sin(frameRad));
		gra.strokeWeight(1);
		gra.noStroke();
		if(random()>0.999)gra.fill(random(100,250));
		else gra.fill(0);
		gra.stroke(255);
		gra.rect(x, y, w, h);
		if (depth % 2 == 1) {
			separateGrid(x, y, w * n, h, depth - 1,gra);
			separateGrid(x + w * n, y, w - w * n, h, depth - 1,gra);
		} 
		else {
			separateGrid(x, y, w, h * n, depth - 1,gra);
			separateGrid(x, y + h * n, w, h - h * n, depth - 1,gra);
		}
	}
}