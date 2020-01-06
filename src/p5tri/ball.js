import * as params from './params';
import {theFlock} from './flock'
import * as p5 from 'p5';

export class Ball {

  constructor( maxX , maxY, p ) {
    this.pos = p.createVector(p.random(0,maxX), p.random(0,maxY));
    this.vel = p5.Vector.random2D();

    this.vel.setMag(p.random(2, 5));

    this.maxX = maxX;
    this.maxY = maxY;

    this.colour = p.color(p.random(128,255), p.random(128,255), p.random(128,255));

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

  getNeighbours = () => {
    const rtrn = [];

    for( let ball of theFlock.zeBalls )
      if( this.distanceSq(ball) < params.LINE_OF_SIGHT_SQ )
        rtrn.push(ball);

    return rtrn;
  };

  distanceSq = (ball) => {
    const diffx = this.pos.x - ball.pos.x;
    const diffy = this.pos.y - ball.pos.y;

    return diffx * diffx + diffy * diffy;
  };

  getColour = (neighbours, p) => {
    if(!neighbours)
      return this.colour;

    const totals = { r: 0, g: 0, b:0, count:0 };

    for( let n of neighbours) {
      totals.count++;
      totals.r += p.red(n.colour);
      totals.g += p.green(n.colour);
      totals.b += p.blue(n.colour);
    }

    return p.color(
      totals.r / totals.count,
      totals.g / totals.count,
      totals.b / totals.count,
    );
  };

  configurations = {
    efervescent: {
      title: "Efervescent",
      description: "ends up looking like gas molecules escaping a liquid",
      behaviour: {
        deflectX: true,
        deflectY: true,
        pacmanX: false,
        pacmanY: false,

        gravity: true,
        friction: true,

        attraction: false,
        repulsion: true,

        limitVelocity: true,
        colourBleed : true,
      }
    },
    stream: {
      title: "Stream",
      description: "they self-organise to act as a stream",
      behaviour: {
        deflectX: true,
        deflectY: false,
        pacmanX: false,
        pacmanY: true,

        gravity: true,
        friction: true,

        attraction: true,
        repulsion: true,

        limitVelocity: true,
        velocity: 4,
      }
    },
    rotation: {
      title: "like a rotating blob",
      description: "",
      behaviour: {
        deflectX: false,
        deflectY: false,
        pacmanX: true,
        pacmanY: true,

        gravity: false,
        friction: true,

        attraction: true,
        repulsion: true,

        limitVelocity: true,
        velocity: 2,
      }
    },
    experimental: {
      title: "placeholder for experimentation",
      description: "",
      behaviour: {
        deflectX: false,
        deflectY: false,
        pacmanX: true,
        pacmanY: true,

        gravity: false,
        friction: true,

        attraction: true,
        repulsion: true,

        limitVelocity: true,
        velocity: 2,
        colourBleed: true,
      }
    },
  };

  step = (p, flock) => {
    const config = this.configurations.experimental.behaviour;

    const neighbours = this.getNeighbours(flock);

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

    this.show(p, config.colourBleed? neighbours : false);
  };

  show = (p, neighbours) => {
    p.strokeWeight(this.radius * 2);
    p.stroke(this.getColour(neighbours, p));
    p.point(this.pos.x, this.pos.y);
  };
}
