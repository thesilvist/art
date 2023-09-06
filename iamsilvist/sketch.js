const CANVAS_RATIO = 1.5;

const CANVAS_WIDTH = 600;
const CANVAS_MARGIN = CANVAS_WIDTH / 15;

const BACKGROUND = 220;

/*
 * the ratio to original CANVAS_WIDTH to determine scaling
 * factor when drawing individual pieces at larger scale.
 *
 * set in setup() and used in any drawing/weighting throughout.
 */
let wr;

// must preload all images used in signature so they're available
// before drawing.
function preload() {
  sig1 = loadImage("./assets/silvist signature line1.png")
  sig2 = loadImage("./assets/silvist signature line2.png")
  sig3 = loadImage("./assets/silvist signature accent1.png")
  sig4 = loadImage("./assets/silvist signature accent2.png")
}


/*
 * determines appropriate window width based on aspect ratio
 * and window size.
 *
 * also sets global wr as side effect
 */
function getWidth() {
  let ww = Math.min(windowWidth, windowHeight * CANVAS_RATIO);
  // set for scaling
  wr = ww / CANVAS_WIDTH;
  
  return ww
}


function setup() {
  let ww = getWidth();
  let c = createCanvas(ww, ww / CANVAS_RATIO);
  // center in window
  c.position((windowWidth - width)/2, 0)
  
  // init text element states
  initText();
  initAccents();
  
  // preset background to kick things off
  background(BACKGROUND);
}


function draw() {
  drawStates();
}


function windowResized() {
  let ww = getWidth();
  resizeCanvas(ww, ww / CANVAS_RATIO);
}


function keyReleased() {
  if (key == "S" || key == "s") {
    save("iamsilvist.png");
  }
}