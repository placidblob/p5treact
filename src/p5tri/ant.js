import globals from './globals';
import * as _ from 'lodash';

const wanderAngle = 30;
const velocity = 4;
const antSize = 8;
const coolDownTime = 10;

export class Ant {

  constructor( maxX , maxY, p) {
    this.pos = p.createVector(p.random(0,maxX), p.random(0,maxY));

    this.angle = p.random(0, 359);
    this.thing = null;
    this.cooldown = 0;
  }

  isOnThing = (things) => _.find(things, t =>
    !t.isBeingCarried &&
    Math.abs(this.pos.x - t.pos.x) < antSize / 2 &&
    Math.abs(this.pos.y - t.pos.y) < antSize / 2
  );

  freeThings = (things) => _.filter(things, t => !t.isBeingCarried);

  step = (p, config, things) => {
    this.randomStep(p, config.behaviour.velocity);

    if(this.cooldown > 0)
      this.cooldown--;

    if(this.cooldown <= 0) {
      const otherThing = this.isOnThing(things);

      if (otherThing) {
        if (this.thing) { // drop thing
          this.thing.isBeingCarried = false;
          this.thing.pos = this.pos.copy();
          this.thing = null;
          this.cooldown = coolDownTime;

        } else { // pick up thing
          this.thing = otherThing;
          otherThing.isBeingCarried = true;
        }

        // turn around
        this.angle = (this.angle + 180) % 360;
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
    const colours = {
      carrying: p.color(67, 141, 128),
      cooldown: p.color(255, 219, 88),
      normal: p.color(255, 99, 71)
    };

    const getColor = () => {
      if(this.thing)
        return colours.carrying;
      if(this.cooldown > 0)
        return colours.cooldown;
      return colours.normal;
    };

    p.rectMode(p.CENTER);

    p.fill(getColor());
    p.square(this.pos.x, this.pos.y, antSize, 3, 3, 3, 3);

    p.noFill();
    p.stroke(0,0,0, 180);
    p.square(this.pos.x, this.pos.y, antSize, 3, 3, 3, 3);
  };
}
