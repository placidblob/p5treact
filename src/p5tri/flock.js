import {Ball} from './ball';
import globals from './globals';


export class Flock {

  zeBalls = [];
  tick = 0;

  setup = (p, props, initBalls = (this.zeBalls.length === 0)) => {
    if (!p || !props) return;

    p.createCanvas(props.dishConfig.width, props.dishConfig.height);

    if (initBalls)
      this.initBalls(p, props);
  };

  initBalls = (p) => {
    this.zeBalls = [];
    while (this.zeBalls.length < globals.props.dishConfig.flock_size)
      this.zeBalls.push(new Ball(globals.props.dishConfig.width, globals.props.dishConfig.height, p, globals.props));
  };

  addBall = (p) => this.zeBalls.push(new Ball(globals.props.dishConfig.width, globals.props.dishConfig.height, p));

  // TODO: animated gif stuff - https://gist.github.com/antiboredom/129fd2311dec0046603e

  draw = (p, {behaviour}) => {
    if(!p || !behaviour) {
      console.error('Flock: no p5 or no behaviour:', p, behaviour);
      return;
    }

    this.tick++;

    p.background(51);

    for( let b of this.zeBalls )
      b.step(p, behaviour, this.zeBalls, this.tick);

//    this.drawMousePoint(p);
  };

  drawMousePoint = (p) => {
    p.strokeWeight(15);
    p.stroke(255, 255, 255, 128);
    p.point(p.mouseX, p.mouseY);
  }
}

