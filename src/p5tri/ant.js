import globals from './globals';
import * as _ from 'lodash';

const wanderAngle = 30;
const velocity = 4;
const antSize = 8;
const coolDownTime = 30;

export class Ant {

  constructor( maxX , maxY, p) {
    this.pos = p.createVector(p.random(0,maxX), p.random(0,maxY));

    this.angle = p.random(0, 359);
    this.thing = null;
    this.cooldown = 0;
  }

  isOnThing = (things) => {
    for(let t of things)
      if(
        Math.abs(this.pos.x - t.pos.x) < antSize / 2 &&
        Math.abs(this.pos.y - t.pos.y) < antSize / 2
      )
        return t;

      return null;
  };

  freeThings = (things) => _.filter(things, t => !t.isBeingCarried);

  step = (p, config, things) => {
    this.randomStep(p, config.behaviour.velocity);

    if(this.cooldown > 0)
      this.cooldown--;

    if(this.cooldown <= 0) {
      const thing = this.isOnThing(this.freeThings(things));

      if (thing) {
        if (this.thing) {
          // drop thing
          this.thing.isBeingCarried = false;
          this.thing.pos = this.pos.copy();
          this.thing = null;

          // turn around
          this.angle = (this.angle + 180) % 360;

          this.cooldown = coolDownTime;
        } else {
          // pick up thing
          this.thing = thing;
          thing.isBeingCarried = true;
        }
      }
    }

    this.show(p);
  };

  randomStep = (p, stepBy = velocity) => {
    this.angle = (this.angle + p.random(-wanderAngle, wanderAngle)) % 360;
    const vel = p.createVector(p.cos(this.angle), p.sin(this.angle));
    vel.setMag(stepBy);
    this.pos.add(vel);

    // pacman
    this.pos.x += globals.props.dishConfig.width;
    this.pos.y += globals.props.dishConfig.height;
    this.pos.x = this.pos.x % globals.props.dishConfig.width;
    this.pos.y = this.pos.y % globals.props.dishConfig.height;
  };


  show = (p) => {
    const getColor = () => {
      if(this.thing)
        return p.color(67, 141, 128);
      if(this.cooldown > 0)
        return p.color(255, 219, 88);
      return p.color(255, 99, 71);
    };

    p.rectMode(p.CENTER);

    p.fill(getColor());
    p.square(this.pos.x, this.pos.y, antSize, 3, 3, 3, 3);
  };
}
