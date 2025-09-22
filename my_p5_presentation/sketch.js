let font;
let vehicles = [];
let fontSize = 192;
let text = 'Welcome to my universe!';

function preload() {
  font = loadFont('jetbrains-mono-regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  initText();
}

function initText() {
  vehicles = [];
  // 计算适合的字体大小
  textFont(font);
  textSize(fontSize);
  while (textWidth(text) > width * 0.9) {
    fontSize *= 0.9;
    textSize(fontSize);
  }
  
  // 计算文字居中的起始位置
  let textW = textWidth(text);
  let startX = (width - textW) / 2;
  let startY = height / 2;
  
  let points = font.textToPoints(text, startX, startY, fontSize);
  for (const p of points) {
    vehicles.push(new Vehicle(p.x, p.y));
  }
}

// 添加窗口大小改变响应函数
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initText();
}

function is_mouse_interect(target){
  let d = dist(mouseX, mouseY, target.x, target.y);
  return d < 50;
}
function draw() {
  background(51);
  fill(255);
  noStroke();
  circle(mouseX, mouseY, 48);
  for (const v of vehicles) {
    
    if(is_mouse_interect(v.pos)){
      let mouse = createVector(mouseX, mouseY);
      v.flee(mouse);
    } else {
      v.arrive(v.home);
    }
    
    
 
    v.update();
    v.show();
  }
}
