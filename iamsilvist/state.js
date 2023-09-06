const STATE_BEGIN = 0;
const STATE_LINES = 1;
const STATE_CIRCLES = 2;
const STATE_TEXT = 3;
const STATE_FADE = 4;
const STATE_END = 5;
const STATE_ACCENT = 6;

// Always set waitInfo before moving to STATE_WAIT
const STATE_WAIT = 9;

// Dummy data, set this every time.
let waitInfo = {
  cycles: 0,
  nextState: STATE_END,
}


// global next state in state machine
let state = STATE_BEGIN;


/*
 * main state machine for drawing all states starting at STATE_BEGIN
 * and ending at STATE_END.
 *
 * every call to p5 draw() executes a state, each state maintains
 * its global state to determine when it's done.
 */
function drawStates() {
  switch (state) {
    case STATE_BEGIN:
      begin();
      break;
    case STATE_LINES:
      drawLines();
      break;
    case STATE_CIRCLES:
      drawCircles();
      break;
    case STATE_TEXT:
      drawText();
      break;
    case STATE_ACCENT:
      drawAccent();
      break;
    case STATE_FADE:
      drawFade();
      break;
    case STATE_END:
      end();
      break;
    case STATE_WAIT:
      wait();
      break;
  }
}
  

function begin() {
  background(BACKGROUND);
  
  state = STATE_LINES;
}


let nLines = 0;

function drawLines() {
  // Must be > because we are processing more than 1 line per call
  if (nLines > 700) {
    // reset state before leaving
    nLines = 0;
    
    state = STATE_CIRCLES;
    return;
  }

  // 3 per frame for speed.
  drawLine();
  drawLine();
  drawLine();
  
  nLines += 3;
}

function drawLine() {
  let x1, y1, x2, y2;

  // find appropriately long line.
  do {
    x1 = random(-50 * wr, width + 50 * wr);
    x2 = random(-50 * wr, width + 50 * wr);
    y1 = random(-50 * wr, height + 50 * wr);
    y2 = random(-50 * wr, height + 50 * wr);
  } while (dist(x1, y1, x2, y1) < 100)

  strokeWeight(3 * wr);
  stroke(20);
  line(x1, y1, x2, y2);
}


let nCircles = 0;

function drawCircles() {
  if (nCircles == 160) {
    // reset state before leaving
    nCircles = 0;
    
    state = STATE_TEXT;
    return;
  }
  
  // find a circle within bounds of our canvas margin
  let c
  do {
    c = new Circle(
      random(width),
      random(height),
      random(125 * wr, 200 * wr));
  } while (!c.inBounds(width, height, CANVAS_MARGIN * wr))
  
  c.draw();
  
  nCircles++;
}


function drawText() {
  // drawTextElement returns false when no more elements
  if (!drawTextElement()) {
    // reset state before leaving
    initText();
    
    waitInfo = {
      cycles: 15,
      nextState: STATE_ACCENT
    };
    state = STATE_WAIT;
    return;
  }
  
  // Wait cycles between each element for a slower draw
  waitInfo = {
    cycles: 2,
    nextState: STATE_TEXT
  };
  
  state = STATE_WAIT;
}


function drawAccent() {
  if (!drawAccentElement()) {
    // reset state before leaving
    initAccents();
    
    waitInfo = {
      cycles: 200,
      nextState: STATE_FADE
    };
    state = STATE_WAIT;
    return;
  }
  
  // Wait cycles between each element for a slower draw
  waitInfo = {
    cycles: 3,
    nextState: STATE_ACCENT
  };
  
  state = STATE_WAIT;
}


let nFade = 0;

function drawFade() {
  if (nFade == 100) {
    // reset state before leaving
    nFade = 0;
    
    state = STATE_END;
    return;
  }
  
  let c = new Circle(
      random(width),
      random(height),
      random(150 * wr, 250 * wr));
  
  c.draw(BACKGROUND);
  
  nFade++;
}


function end() {
  state = STATE_BEGIN;
  // noLoop();
}


/*
 * busy-wait state to slow down drawing where desired
 */
let waitCycles = 0;

function wait() {
  if (waitCycles < waitInfo.cycles) {
    waitCycles++;
    return;
  }
  
  waitCycles = 0;
  state = waitInfo.nextState;
}
