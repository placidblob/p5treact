import * as staticParams from './params';
import {Ball} from './ball';

let zeBalls = [];
let tick = 0;

export class Flock {
  tick = 0;

  setup = (p, initBalls = (zeBalls.length === 0)) => {
    if (!p) return;

    p.createCanvas(staticParams.MAX_X, staticParams.MAX_Y);

    if (initBalls)
      this.initBalls(p);
  };

  initBalls = (p) => {
    zeBalls = [];
    while (zeBalls.length < staticParams.FLOCK_SIZE)
      zeBalls.push(new Ball(staticParams.MAX_X, staticParams.MAX_Y, p));
  };

  // TODO: animated gif stuff - https://gist.github.com/antiboredom/129fd2311dec0046603e

  draw = (p, behaviour) => {
    if(!p || !behaviour) {
      console.error('Flock: no p5 or no behaviour:', p, behaviour);
      return;
    }

    tick++;

    p.background(51);

    for( let b of zeBalls )
      b.step(p, zeBalls, behaviour);
  }
}

export const theFlock = new Flock();
