import * as staticParams from './params';
import {Ball} from './ball';

const zeBalls = [];
const tick = 0;

export class Flock {
  tick = 0;

  setup = (p) => {
    if(!p) return;

    p.createCanvas(staticParams.MAX_X, staticParams.MAX_Y);

    if(zeBalls.length === 0)
      for(let i = 0; i < staticParams.FLOCK_SIZE; i++ )
        zeBalls.push(new Ball(staticParams.MAX_X, staticParams.MAX_Y, p));
  };

  // TODO: animated gif stuff - https://gist.github.com/antiboredom/129fd2311dec0046603e

  draw = (p, behaviour) => {
    if(!p) return;

    this.tick++;

    p.background(51);

    for( let b of zeBalls )
      b.step(p, zeBalls, behaviour);
  }
}

export const theFlock = new Flock();
