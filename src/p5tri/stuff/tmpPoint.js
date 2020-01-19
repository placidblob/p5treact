import * as p5 from 'p5';

const INITIAL_LIFETIME = 100;
const INITIAL_COLOUR = p5.color(200);

export class TmpPoint {
  pos = undefined;
  lifetime = undefined;
  colour = undefined;
  tick = 0;

  constructor(p, x, y,
              lifetime = INITIAL_LIFETIME,
              color = INITIAL_COLOUR
  ) {
    this.pos = p.createVector(x, y);
    this.lifetime = lifetime;
    this.colour = color;
  }

  transparency = () => {
    if(this.tick >= this.lifetime)
      return 0;

    return (this.lifetime - this.tick) / this.lifetime;
  };

  actuallyDraw = (p) => {
    p.stroke(
      this.colour.red(),
      this.colour.green(),
      this.colour.blue(),
      this.transparency());
  };

  killme = () => this.tick >= this.lifetime;

  step = (p) => {
    this.actuallyDraw(p);

    this.tick++;
  };

  draw = (p) =>
    this.lifetime &&
    this.lifetime > 0 &&
    this.step(p);
}


