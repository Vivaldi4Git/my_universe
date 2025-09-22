
let font;
let vehicles = [];
const DEFAULT_FONT_SIZE = 256;
let fontSize = DEFAULT_FONT_SIZE;
const displayText = 'Welcome to my universe!';

function preload() {
  font = loadFont('jetbrains-mono-regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setCanvasFullscreenStyle();
  background(51);
  initText();
}

function initText() {
  vehicles = [];
  textFont(font);
  fontSize = getAdaptiveFontSize(displayText, DEFAULT_FONT_SIZE);
  textSize(fontSize);
  let textW = textWidth(displayText);
  let startX = (width - textW) / 2;
  let startY = height / 2;
  let points = font.textToPoints(displayText, startX, startY, fontSize);
  for (const p of points) {
    vehicles.push(new Vehicle(p.x, p.y));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setCanvasFullscreenStyle();
  initText();
}
// 设置 canvas 全屏样式，避免重复代码
function setCanvasFullscreenStyle() {
  let c = document.querySelector('canvas');
  if (c) {
    c.style.position = 'fixed';
    c.style.left = '0';
    c.style.top = '0';
    c.style.width = '100vw';
    c.style.height = '100vh';
    c.style.zIndex = '10';
  }
}

// 获取自适应字体大小
function getAdaptiveFontSize(txt, baseSize) {
  textSize(baseSize);
  let size = baseSize;
  while (textWidth(txt) > width * 0.9) {
    size *= 0.9;
    textSize(size);
  }
  return size;
}

function is_mouse_interect(target) {
  return dist(mouseX, mouseY, target.x, target.y) < 50;
}
function draw() {
  background(51);
  fill(255);
  noStroke();
  circle(mouseX, mouseY, 48);
  for (const v of vehicles) {
    if (is_mouse_interect(v.pos)) {
      v.flee(createVector(mouseX, mouseY));
    } else {
      v.arrive(v.home);
    }
    v.update();
    v.show();
  }
}
