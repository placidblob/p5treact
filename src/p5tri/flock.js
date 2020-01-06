import * as params from './params';
import {Ball} from './ball';

export class Flock {
  zeBalls = [];
  tick = 0;

  setup = (p) => {
    if(!p) return;

    p.createCanvas(params.MAX_X, params.MAX_Y);

    this.zeBalls = [];
    this.tick = 0;

    for( let i = 0; i < params.FLOCK_SIZE; i++ )
      this.zeBalls.push(new Ball(params.MAX_X, params.MAX_Y, p));
  };

  // TODO: animated gif stuff - https://gist.github.com/antiboredom/129fd2311dec0046603e

  draw = (p) => {
    if(!p) return;

    this.tick++;

    p.background(51);

    for( let b of this.zeBalls )
      b.step(p, theFlock);
  }
}

export const theFlock = new Flock();
