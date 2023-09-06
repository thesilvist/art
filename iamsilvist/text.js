const ARC = "arc";
const RECT = "rect";
const TRIANGLE = "triangle";
const IMG = "image";
const LINE = "line";


// signature assets for preloading and imaging.
// make sure to load in p5 preload function
let sig1;
let sig2;
let sig3;
let sig4;


// array of arrays of arrays:
//   - outer array is list of element dependency chains
//   - middle array is any dependent elements in order to draw
//.    (next element pulled from front of array)
//   - innermost array format: [TYPE, COLOR, ...args]
let elements;
let accents;

// must run after p5 setup.
function initText() {
  
  // all items custom placed for specific canvas size
  elements = [
    // I
    [[IMG, sig1, 185, 80, 62, 130]],
    [[IMG, sig2, 185, 80, 62, 130]],
    
    
    // AM
    
    // A
    [
      [TRIANGLE, 50, 325, 100, 300, 180, 350, 180],
      [TRIANGLE, "#d11208", 325, 100, 309.375, 150, 340.625, 150]
    ],
    // M
    [[TRIANGLE, "#3ab811", 370, 180, 380, 120, 400, 180]],
    [[TRIANGLE, "grey", 400, 180, 430, 110, 440, 180]],
    
    
    // SILVIST
    
    // S
    [[ARC, "#40414a", 135, 150, 100, 100, HALF_PI, PI + HALF_PI, OPEN]],
    [[ARC, "#32a85e", 135, 250, 100, 100, PI + HALF_PI, HALF_PI, OPEN]],
    // I
    [[RECT, "#dddbb1", 205, 220, 40, 40]],
    [[RECT, "#2c2c2c", 205, 260, 40, 40]],
    // L
    [[LINE, "#b82207", 268, 190, 268, 300]],
    [[LINE, "#b82207", 270, 195, 270, 290]],
    [[LINE, "#b82207", 273, 193, 273, 297]],
    [[LINE, "#b82207", 275, 190, 277, 300]],
    // V
    [
      [TRIANGLE, "#3ab811", 325, 300, 300, 220, 350, 220],
      [TRIANGLE, 50, 325, 275, 310, 220, 340, 220]
    ],
    // I
    [[RECT, "#7991e7", 365, 220, 40, 40]],
    [[RECT, "#b10000", 365, 260, 40, 40]],
    // S
    [[ARC, "#bf5626", 440, 240, 40, 40, HALF_PI, PI + HALF_PI, OPEN]],
    [[ARC, "#2699bf", 440, 280, 40, 40, PI + HALF_PI, HALF_PI, OPEN]],
    // T
    [[LINE, "#bf8d36", 480, 190, 480, 300]],
    [[LINE, "#bf8d36", 482, 195, 482, 290]],
    [[LINE, "#bf8d36", 485, 193, 485, 297]],
    [[LINE, "#bf8d36", 487, 190, 489, 300]],
    [[LINE, "#bf8d36", 470, 218, 500, 221]],
    [[LINE, "#bf8d36", 468, 220, 503, 218]],
    [[LINE, "#bf8d36", 466, 220, 497, 223]],
  ];
}

// must run after p5 setup.
function initAccents() {
  // Accents on I signature, to be placed last for effect
  accents = [
    [[IMG, sig3, 185, 80, 62, 130]],
    [[IMG, sig4, 185, 80, 62, 130]],
  ];
}


/*
 * draw an element from the master elements set
 */
function drawTextElement() {
  return drawElement(elements);
}

/*
 * draw an element from the accent elements set
 */
function drawAccentElement() {
  return drawElement(accents);
}


/*
 * pulls random element from element array for processing.
 *
 * see comment above for array format.
 *
 * returns true as long as more elements exist to be processed
 */
function drawElement(e) {
  if (!e.length) {
    return false;
  }
  
  // random index into element array
  let i = Math.floor(random(e.length));
  
  // grab an element from front of inner array
  let elem = e[i].shift()
  
  // remove element array if no more elements within
  if (!e[i].length) {
    e.splice(i, 1)
  }
  
  switch(elem[0]) {
    case ARC:
      drawArc(elem);
      break;
    case RECT:
      drawRect(elem);
      break;
    case TRIANGLE:
      drawTriangle(elem);
      break;
    case IMG:
      drawImage(elem);
      break;
    case LINE:
      drawLineElement(elem);
      break;
  }
  
  return true;
}


/*
 * draw functions for all types of text elements
 */
function drawArc(elem) {
  strokeWeight(0);
  fill(elem[1]);
  arc(...scaleElement(elem.slice(2, 6)), ...elem.slice(6));
}

function drawRect(elem) {
  strokeWeight(0);
  fill(elem[1]);
  rect(...scaleElement(elem.slice(2)));
}

function drawTriangle(elem) {
  strokeWeight(0);
  fill(elem[1]);
  triangle(...scaleElement(elem.slice(2)));
}

function drawImage(elem) {
  image(elem[1], ...scaleElement(elem.slice(2)));
}

function drawLineElement(elem) {
  strokeWeight(3 * wr);
  stroke(elem[1]);
  line(...scaleElement(elem.slice(2)));
}


/*
 * apply canvas size ratio to points, lengths, etc. in order to draw
 * correctly on scaled canvas
 */
function scaleElement(elem) {
  return elem.reduce((r,c) => {
    r.push(c * wr);
    return r;
  }, []);
}