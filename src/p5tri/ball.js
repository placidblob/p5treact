import * as p5 from 'p5';

export class Ball {

  constructor( maxX , maxY, p, props ) {
    this.pos = p.createVector(p.random(0,maxX), p.random(0,maxY));
    this.vel = p5.Vector.random2D();

    this.vel.setMag(p.random(2, 5));

    this.maxX = maxX;
    this.maxY = maxY;

    this.colour = p.color(p.random(0,255), p.random(0,255), p.random(0,255));

    this.radius = props.dishConfig.ball_radius;

    this.tail = [this.pos];
  }

  updateTail = (config) => {
    this.tail.push({...this.pos});

    while(this.tail.length > config.tailLength * config.tailModulo)
      this.tail.shift();
  };

  step = (p, balls, config, tick) => {
    const quanta = {
      getAttractiveForce: (neighbouringBalls) => {
        const balz = neighbouringBalls || balls;

        const rtrn = p.createVector();

        balz.forEach(b => {
          if( b === this ) return;

          const force = p.createVector(b.pos.x - this.pos.x, b.pos.y - this.pos.y);

          const distSq = quanta.distanceSq(b);

          force.setMag((distSq - config.cozyDistance**2) / config.cozyDistance**2);

          rtrn.add(force);
        });

        rtrn.setMag(config.attractionAmount);

        return rtrn;
      },

      getRepulsiveForce: (neighbouringBalls) => {
        const balz = neighbouringBalls || balls;

        const rtrn = p.createVector();

        balz.forEach(b => rtrn.add(quanta.getRepulsiveForceFrom(b.pos, config.cozyDistance**2)));

        rtrn.setMag(config.repulsionAmount);

        return rtrn;
      },

      getRepulsiveForceFrom: (point, preferredDistanceSq) => {
        const force = p.createVector(point.x - this.pos.x, point.y - this.pos.y);

        const distSq = quanta.distanceSqFromPoint(point);

        if (distSq >= config.cozyDistance**2)
          return;

        force.setMag((preferredDistanceSq - distSq) / preferredDistanceSq);

        return force;
      },

      getNeighbours: () => {
        const rtrn = [];

        for (let ball of balls)
          if (ball !== this && quanta.distanceSq(ball) < config.lineOfSight **2)  // TODO: optimize by rectangle first?
            rtrn.push(ball);

        return rtrn;
      },

      distanceSqFromPoint: (point) => {
        const diffx = this.pos.x - point.x;
        const diffy = this.pos.y - point.y;

        return diffx * diffx + diffy * diffy;
      },

      distanceSq: (ball) => quanta.distanceSqFromPoint(ball.pos),

      avoidMouse: () => this.vel.add(quanta.getRepulsiveForceFrom(p.createVector(p.mouseX, p.mouseY))),

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

      pacmanX: () => {
        if (this.pos.x > this.maxX)
          this.pos.x -= this.maxX;
        else if (this.pos.x < 0)
          this.pos.x += this.maxX;
      },

      pacmanY: () => {
        if (this.pos.y > this.maxY)
          this.pos.y -= this.maxY;
        else if (this.pos.y < 0)
          this.pos.y += this.maxY;
      },

      gravity: () => {
        let g = p.createVector(0, config.gravityAmount);
        this.vel.add(g);
      },

      friction: () => {
        this.vel.mult(1 - config.frictionAmount / 10);
      },

      attraction: () => {
        const attr = quanta.getAttractiveForce(neighbours);

        this.vel.add(attr);
      },

      repulsion: () => {
        const attr = quanta.getRepulsiveForce(neighbours);

        this.vel.sub(attr);
      },

      limitVelocity: () => {
        if (this.vel.mag() > config.velocity)
          this.vel.setMag(config.velocity);
      }
    };

    const neighbours = quanta.getNeighbours();

    config.deflectX && quanta.deflectX();
    config.deflectY && quanta.deflectY();
    config.pacmanX && quanta.pacmanX();
    config.pacmanY && quanta.pacmanY();

    config.gravity && quanta.gravity();
    config.friction && quanta.friction();

    config.attraction && quanta.attraction();
    config.repulsion && quanta.repulsion();

    config.limitVelocity && quanta.limitVelocity();

    // TODO: make it work + put in params:
    quanta.avoidMouse();

    this.pos.add(this.vel);

    this.updateTail(config);

    this.show(p, neighbours, config, tick);
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
    let transparencyMultiplier = 1;
    let cnt = 0;

    for(let i = this.tail.length - 1; i >= 0 && diameter > 0; i--) {
      if(cnt++ % config.tailModulo !== 0) continue;

      p.strokeWeight(Math.floor((config.ballRadius * 2) * sizeMultiplier));
      p.stroke(p.red(colour), p.green(colour), p.blue(colour), Math.floor(170 * transparencyMultiplier));
      p.point(this.tail[i].x, this.tail[i].y);

      transparencyMultiplier = transparencyMultiplier * config.tailTranspFactor;
      sizeMultiplier = sizeMultiplier * config.tailSizeFactor;
    }
  };
}
