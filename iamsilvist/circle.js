/*
 * Manages creation, bounds check functionality, and drawing
 * for circles
 */
class Circle {
  constructor(x, y, diameter) {
    this.x = x
    this.y = y
    this.d = diameter
  }

  /*
   * returns whether circle is in bounds of a given width, height,
   * and border margin
   */
  inBounds(w, h, margin) {
    // check that center is always at least radius distance
    // from any edge
    let allowed = (this.d / 2) + margin;
    
    return !(this.x < allowed || this.x > w - allowed)
        && !(this.y < allowed || this.y > h - allowed)
  }
  
  /*
   * draw this circle
   *
   * c: color to use, default to random grayscale.
   */
  draw(c) {
    if (!c) {
      c = random(200,220)
    }
    fill(c);
    
    strokeWeight(0);
    
    circle(this.x, this.y, this.d)
  }
}