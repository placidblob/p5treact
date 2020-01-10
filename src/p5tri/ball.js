import * as params from './params';
import {theFlock} from './flock'
import * as p5 from 'p5';

const dish = require('../constants/dish');

export class Ball {

  constructor( maxX , maxY, p ) {
    this.pos = p.createVector(p.random(0,maxX), p.random(0,maxY));
    this.vel = p5.Vector.random2D();

    this.vel.setMag(p.random(2, 5));

    this.maxX = maxX;
    this.maxY = maxY;

    this.colour = p.color(p.random(0,255), p.random(0,255), p.random(0,255));

    this.radius = params.BALL_RADIUS;
    // this.radius = random(0.75*BALL_RADIUS, 1.25*BALL_RADIUS);
  }

  getAttractiveForce = (balls, p) => {
    const rtrn = p.createVector();

    balls.forEach(b => {
      const force = p.createVector(b.pos.x - this.pos.x, b.pos.y - this.pos.y);

      const distSq = this.distanceSq(b);

      force.setMag((distSq - params.COZY_DISTANCE_SQ) / params.COZY_DISTANCE_SQ );

      rtrn.add(force);
    });

    rtrn.setMag(params.ATTRACTIVE_FORCE);

    return rtrn;
  };

  getRepulsiveForce = (balls, p) => {
    const rtrn = p.createVector();

    balls.forEach(b => {
      const force = p.createVector(b.pos.x - this.pos.x, b.pos.y - this.pos.y);

      const distSq = this.distanceSq(b);

      if(distSq >= params.COZY_DISTANCE_SQ)
        return;

      force.setMag((params.COZY_DISTANCE_SQ - distSq) / params.COZY_DISTANCE_SQ);

      rtrn.add(force);
    });

    rtrn.setMag(params.ATTRACTIVE_FORCE);

    return rtrn;
  };

  getNeighbours = (balls, config) => {
    const rtrn = [];

    for( let ball of balls )
      if( this.distanceSq(ball) < config.line_of_sight )
        rtrn.push(ball);

    return rtrn;
  };

  distanceSq = (ball) => {
    const diffx = this.pos.x - ball.pos.x;
    const diffy = this.pos.y - ball.pos.y;

    return diffx * diffx + diffy * diffy;
  };

  getColour = (p, neighbours, config) => {
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

    const avg = (a, b, weightA) => (a * weightA) + b * (1 - weightA);

    return p.lerpColor(this.colour, neighbourColor, config.colourBleedIntensity);

    // return p.color(
    //   avg(totals.r, p.red(this.colour), config.colourBleedIntensity),
    //   avg(totals.g, p.green(this.colour), config.colourBleedIntensity),
    //   avg(totals.b, p.blue(this.colour), config.colourBleedIntensity),
    // );
  };

  step = (p, balls, config) => {
    const neighbours = this.getNeighbours(balls, config);

    const deflectX = () => {
      if (this.pos.x + this.radius > this.maxX || this.pos.x < this.radius) {
        this.vel.x *= -1;

        this.pos.x = (this.pos.x < this.radius)? this.radius : this.maxX - this.radius;
      }
    };

    const deflectY = () => {
      if (this.pos.y + this.radius > this.maxY || this.pos.y < this.radius) {
        this.vel.y *= -1;

        this.pos.y = (this.pos.y < this.radius)? this.radius : this.maxY - this.radius;
      }
    };

    const pacmanX = () => {
      if (this.pos.x > this.maxX)
        this.pos.x -= this.maxX;
      else if (this.pos.x < 0)
        this.pos.x += this.maxX;
    };

    const pacmanY = () => {
      if (this.pos.y > this.maxY)
        this.pos.y -= this.maxY;
      else if (this.pos.y < 0)
        this.pos.y += this.maxY;
    };

    const gravity = () => {
      let g = p.createVector(0, params.GRAVITY);
      this.vel.add(g);
    };

    const friction = () => {
      this.vel.mult(1-params.FRICTION);
    };

    const attraction = () => {
      const attr = this.getAttractiveForce(neighbours, p);

      this.vel.add(attr);
    };

    const repulsion = () => {
      const attr = this.getRepulsiveForce(neighbours, p);

      this.vel.sub(attr);
    };

    const limitVelocity = (limitTo) => {
      if( this.vel.mag() > limitTo )
        this.vel.setMag(limitTo);
    };

    config.deflectX && deflectX();
    config.deflectY && deflectY();
    config.pacmanX && pacmanX();
    config.pacmanY && pacmanY();

    config.gravity && gravity();
    config.friction && friction();

    config.attraction && attraction();
    config.repulsion && repulsion();

    config.limitVelocity && limitVelocity(config.velocity? config.velocity : params.MAX_VELOCITY);

    this.pos.add(this.vel);

    this.show(p, neighbours, config);
  };

  show = (p, neighbours, config) => {
    p.push();
    p.strokeWeight(this.radius * 2);
    p.stroke(this.getColour(p, neighbours, config));
    p.point(this.pos.x, this.pos.y);
    p.pop();
  };
}
