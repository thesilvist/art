const STATE_BEGIN = 0;
const STATE_LINES = 1;
const STATE_CIRCLES = 2;
const STATE_TEXT = 3;
const STATE_FADE = 4;
const STATE_END = 5;
const STATE_ACCENT = 6;

// Always use waitBeforeState() for waiting.
const STATE_WAIT = 9;


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
  } while (dist(x1, y1, x2, y1) < 100 * wr)

  strokeWeight(3 * wr);
  stroke(20);
  line(x1, y1, x2, y2);
}


let nCircles = 0;

function drawCircles() {
  if (nCircles == 150) {
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
    
    waitBeforeState(15, STATE_ACCENT);
    return;
  }
  
  // Wait cycles between each element for a slower draw
  waitBeforeState(2, STATE_TEXT);
}


function drawAccent() {
  // drawAccentElement returns false when no more elements
  if (!drawAccentElement()) {
    // reset state before leaving
    initAccents();
    
    waitBeforeState(200, STATE_FADE);
    return;
  }
  
  // Wait cycles between each element for a slower draw
  waitBeforeState(3, STATE_ACCENT);
}


let nFade = 0;

function drawFade() {
  if (nFade == 125) {
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


// Dummy data, set this every time.
let waitInfo = {
  cycles: 0,
  nextState: STATE_END,
}

/*
 * wait a certain number of cycles before moving to a state
 *
 * cycles: number of state cycles to wait before moving
 * nextState: state to move to after waiting
 */
function waitBeforeState(cycles, nextState) {
  // Wait cycles before moving to next state.
  waitInfo = {
    cycles: cycles,
    nextState: nextState,
  };

  state = STATE_WAIT;
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
