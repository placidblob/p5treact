// import * as p5 from 'p5';

const wanderAngle = 30;
const velocity = 1;

export class Ant {

  constructor( maxX , maxY, p) {
    this.pos = p.createVector(p.random(0,maxX), p.random(0,maxY));

    this.angle = p.random(0, 359);
  }

  step = (p, config) => {
    this.randomStep(p, config);

    this.show(p);
  };

  randomStep = (p, config) => {
    this.angle = (this.angle + p.random(-wanderAngle, wanderAngle)) % 360;
    const vel = p.createVector(p.cos(this.angle), p.sin(this.angle));
    vel.setMag(velocity);
    this.pos.add(vel);
    this.pos.x = this.pos.x % 800;
    this.pos.y = this.pos.y % 800;

    if(this.pos.x < 0)
      this.pos.x += config.width;
    if(this.pos.y < 0)
      this.pos.y += config.height;
  };

  show = (p) => {
    p.rectMode(p.CENTER);
    p.fill(p.color(255, 99, 71));
    p.square(this.pos.x, this.pos.y, 8, 3, 3, 3, 3);
  };
}
