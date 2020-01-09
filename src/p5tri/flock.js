import * as staticParams from './params';
import {Ball} from './ball';

export class Flock {
  zeBalls = [];
  tick = 0;

  setup = (p) => {
    if(!p) return;

    p.createCanvas(staticParams.MAX_X, staticParams.MAX_Y);

    this.zeBalls = [];
    this.tick = 0;

    for(let i = 0; i < staticParams.FLOCK_SIZE; i++ )
      this.zeBalls.push(new Ball(staticParams.MAX_X, staticParams.MAX_Y, p));
  };

  // TODO: animated gif stuff - https://gist.github.com/antiboredom/129fd2311dec0046603e

  draw = (p, config) => {
    if(!p) return;

    this.tick++;

    p.background(51);

    for( let b of this.zeBalls )
      b.step(p, this, config);
  }
}

export const theFlock = new Flock();
