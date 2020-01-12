import * as p5 from 'p5';
import * as _ from 'lodash';

export class Ball {

  constructor( maxX , maxY, p, props ) {
    this.pos = p.createVector(p.random(0,maxX), p.random(0,maxY));
    this.vel = p5.Vector.random2D();

    this.vel.setMag(p.random(2, 5));

    this.maxX = maxX;
    this.maxY = maxY;

    this.colour = p.color(p.random(0,255), p.random(0,255), p.random(0,255));

    this.radius = props.dishConfig.ballRadius;

    this.tail = [this.pos];
  }

  updateTail = (config) => {
    this.tail.push({...this.pos});

    while(this.tail.length > config.tailLength * config.tailModulo)
      this.tail.shift();
  };

  step = (p, behaviour, balls, tick) => {
    const quanta = {
      getAttractiveForce: (neighbouringBalls) => {
        const balz = neighbouringBalls || balls;

        const rtrn = p.createVector();

        balz.forEach(b => {
          if( b === this ) return;

          const force = p.createVector(b.pos.x - this.pos.x, b.pos.y - this.pos.y);

          const distSq = quanta.distanceSq(b);

          force.setMag((distSq - behaviour.cozyDistance_sq) / behaviour.cozyDistance_sq);

          rtrn.add(force);
        });

        rtrn.setMag(behaviour.attractionAmount);

        return rtrn;
      },

      getRepulsiveForce: (neighbouringBalls) => {
        const balz = neighbouringBalls || balls;

        const rtrn = p.createVector();

        balz.forEach(b => b !== this && rtrn.add(quanta.getRepulsiveForceFrom(b.pos, behaviour.cozyDistance_sq)));

        rtrn.setMag(behaviour.repulsionAmount);

        return rtrn;
      },

      getRepulsiveForceFrom: (point, preferredDistanceSq) => {

        const distSq = quanta.distanceSqFromPoint(point);

        if (distSq >= behaviour.cozyDistance_sq)
          return;

        const force = p.createVector(point.x - this.pos.x, point.y - this.pos.y);

        force.setMag((preferredDistanceSq - distSq) / preferredDistanceSq);

        return force;
      },

      getNeighbours: (theBalls = balls) => _.filter(theBalls, ball => (ball !== this && quanta.distanceSq(ball) < behaviour.lineOfSight_sq)),
      distanceSqFromPoint: (point) => (this.pos.x - point.x) **2 + (this.pos.y - point.y) **2,
      distanceSq: (ball) => quanta.distanceSqFromPoint(ball.pos),
      avoidMouse: () => this.vel.add(quanta.getRepulsiveForceFrom(p.createVector(p.mouseX, p.mouseY), behaviour.cozyDistance_sq)),

      deflectX: () => {
        if (this.pos.x + this.radius > this.maxX || this.pos.x < this.radius) {
          this.vel.x *= -1;

          this.pos.x = (this.pos.x < this.radius) ? this.radius : this.maxX - this.radius;
        }
      },

      deflectY: () => {
        if (this.pos.y + this.radius > this.maxY || this.pos.y < this.radius) {
          this.vel.y *= -1;

          this.pos.y = (this.pos.y < this.radius) ? this.radius : this.maxY - this.radius;
        }
      },

      pacmanX: () => this.pos.x = (this.pos.x + this.maxX) % this.maxX,
      pacmanY: () => this.pos.y = (this.pos.y + this.maxY) % this.maxY,
      gravity: () => this.vel.add(p.createVector(0, behaviour.gravityAmount)),
      friction: () => this.vel.mult(1 - behaviour.frictionAmount / 10),
      attraction: () => this.vel.add(quanta.getAttractiveForce(neighbours)),
      repulsion: () => this.vel.sub(quanta.getRepulsiveForce(neighbours)),
      limitVelocity: () => this.vel.mag() > behaviour.velocity && this.vel.setMag(behaviour.velocity),
    };

    const neighbours = quanta.getNeighbours();

    behaviour.deflectX && quanta.deflectX();
    behaviour.deflectY && quanta.deflectY();
    behaviour.pacmanX && quanta.pacmanX();
    behaviour.pacmanY && quanta.pacmanY();

    behaviour.gravity && quanta.gravity();
    behaviour.friction && quanta.friction();

    behaviour.attraction && quanta.attraction();
    behaviour.repulsion && quanta.repulsion();

    behaviour.limitVelocity && quanta.limitVelocity();

    // TODO: make it work + put in params:
    // quanta.avoidMouse();

    this.pos.add(this.vel);

    this.updateTail(behaviour);

    this.show(p, neighbours, behaviour, tick);
  };

  show = (p, neighbours, config) => {
    const getColour = () => {
      if(!config || !config.colourBleed)
        return this.colour;

      const totals = { r: 0, g: 0, b:0, count:0 };

      for( let n of neighbours) {
        totals.count++;
        totals.r += p.red(n.colour);
        totals.g += p.green(n.colour);
        totals.b += p.blue(n.colour);
      }

      const neighbourColor = p.color(
        Math.floor(totals.r / totals.count),
        Math.floor(totals.g / totals.count),
        Math.floor(totals.b / totals.count)
      );

      return p.lerpColor(this.colour, neighbourColor, config.colourBleedIntensity || 0);
    };

    let diameter = config.ballRadius * 2;
    const colour = getColour();
    let sizeMultiplier = 1;
    let cnt = 0;

    for(let i = 0; i < this.tail.length && diameter > 0; i++) {
      if(cnt++ % config.tailModulo !== 0) continue;

      p.strokeWeight(Math.floor((config.ballRadius * 2) * (this.tail.length - i + 1) / this.tail.length));
      p.stroke(p.red(colour), p.green(colour), p.blue(colour), Math.floor(config.transparency * (this.tail.length - i + 1) / this.tail.length));
      p.point(this.tail[this.tail.length - i - 1].x, this.tail[this.tail.length - i - 1].y);

      sizeMultiplier = sizeMultiplier * config.tailSizeFactor;
    }
  };
}
