export class Thing {

  isBeingCarried = false;

  constructor( maxX , maxY, p) {
    this.pos = p.createVector(p.random(0,maxX), p.random(0,maxY));
  }

  show = (p) => {
    if(this.isBeingCarried) return;

    p.rectMode(p.CENTER);
    p.fill(p.color(129, 216, 208));
    p.circle(this.pos.x, this.pos.y, 4);
  };
}
