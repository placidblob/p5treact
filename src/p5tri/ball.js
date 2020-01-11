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

    while(this.tail.length > config.tailLength)
      this.tail.shift();
  };

  step = (p, balls, config) => {
    const quanta = {
      getAttractiveForce: () => {
        const rtrn = p.createVector();

        balls.forEach(b => {
          const force = p.createVector(b.pos.x - this.pos.x, b.pos.y - this.pos.y);

          const distSq = quanta.distanceSq(b);

          force.setMag((distSq - config.cozy_distance**2) / config.cozy_distance**2);

          rtrn.add(force);
        });

        rtrn.setMag(config.attractionAmount);

        return rtrn;
      },

      getRepulsiveForce: () => {
        const rtrn = p.createVector();

        balls.forEach(b => {
          const force = p.createVector(b.pos.x - this.pos.x, b.pos.y - this.pos.y);

          const distSq = quanta.distanceSq(b);

          if (distSq >= config.cozy_distance**2)
            return;

          force.setMag((config.cozy_distance**2 - distSq) / config.cozy_distance**2);

          rtrn.add(force);
        });

        rtrn.setMag(config.repulsionAmount);

        return rtrn;
      },

      getNeighbours: () => {
        const rtrn = [];

        for (let ball of balls)
          if (quanta.distanceSq(ball) < config.line_of_sight **2)
            rtrn.push(ball);

        return rtrn;
      },

      distanceSq: (ball) => {
        const diffx = this.pos.x - ball.pos.x;
        const diffy = this.pos.y - ball.pos.y;

        return diffx * diffx + diffy * diffy;
      },

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
        const attr = quanta.getAttractiveForce();

        this.vel.add(attr);
      },

      repulsion: () => {
        const attr = quanta.getRepulsiveForce();

        this.vel.sub(attr);
      },

      limitVelocity: (limitTo) => {
        if (this.vel.mag() > limitTo)
          this.vel.setMag(limitTo);
      }
    };

    const neighbours = quanta.getNeighbours(balls, config);

    config.deflectX && quanta.deflectX();
    config.deflectY && quanta.deflectY();
    config.pacmanX && quanta.pacmanX();
    config.pacmanY && quanta.pacmanY();

    config.gravity && quanta.gravity();
    config.friction && quanta.friction();

    config.attraction && quanta.attraction();
    config.repulsion && quanta.repulsion();

    config.limitVelocity && quanta.limitVelocity(config.velocity);

    this.pos.add(this.vel);

    this.updateTail(config);

    this.show(p, neighbours, config);
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
        totals.r / totals.count,
        totals.g / totals.count,
        totals.b / totals.count
      );

      return p.lerpColor(this.colour, neighbourColor, config.colourBleedIntensity || 0);
    };

    let diameter = this.radius * 2;
    const colour = getColour();

    for(let i = this.tail.length - 1; i >= 0; i--) {
      p.strokeWeight(diameter);
      p.stroke(colour);
      p.point(this.tail[i].x, this.tail[i].y);
      diameter = Math.floor(diameter * 0.85);
    }
  };
}
