
function setup() {
    createCanvas(550, 550);
    strokeWeight(40);
  }
  

function draw() {
    background(200);
    ellipse(275,275,275,275);
    point(40,40); //top left
    point(500, 40); //top right
    point(40,500); //bottom left
    point(500,500);//bottomright
}

