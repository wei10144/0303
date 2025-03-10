let input;
let slider;
let button;
let dropdown;
let iframe;
let isBouncing = false;
let bounceOffsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  input.size(300, 30);
  input.value('淡江大學');
  
  slider = createSlider(28, 50, 32);
  slider.position(input.x + input.width + 10, 10);
  
  button = createButton('跳動文字');
  button.position(slider.x + slider.width + 10, 10);
  button.mousePressed(toggleBounce);

  dropdown = createSelect();
  dropdown.position(button.x + button.width + 10, 10);
    dropdown.size(200, 30);
  dropdown.option('淡江大學');
  dropdown.option('教科系');
  dropdown.option('測驗卷');
  
  dropdown.changed(handleDropdownChange);
  
  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
  iframe.hide();
}

function handleDropdownChange() {
  let selected = dropdown.value();
  iframe.show();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教科系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selected === '測驗卷') {
    iframe.attribute('src', 'https://wei10144.github.io/0310/');
  }
}

function toggleBounce() {
  isBouncing = !isBouncing;
  if (isBouncing) {
    bounceOffsets = Array.from({ length: input.value().length }, () => random(0.5, 1.5));
  }
}

function draw() {
  background(220);
  let txt = input.value();
  let textSizeValue = slider.value();
  textAlign(LEFT, TOP);
  textSize(textSizeValue);
  let spacedText = txt.split('').join(' '); // 每個字都要有間隔
  let repeatCount = Math.ceil(width / textWidth(spacedText + ' '));
  if (isFinite(repeatCount) && repeatCount > 0) {
    let repeatedText = (spacedText + ' ').repeat(repeatCount).trim();
    let lineHeight = textAscent() + textDescent();
    let startY = 70; // 避免擋到按鈕
    while (startY < height) {
      let yOffset = 0;
      if (isBouncing) {
        yOffset = sin(frameCount * bounceOffsets[startY % bounceOffsets.length]) * 10;
      }
      text(repeatedText, 0, startY + yOffset);
      startY += lineHeight * 1.5; // 增加間隔
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 200, windowHeight - 200);
}
