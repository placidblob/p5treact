import {Ant} from './ant';
import globals from './globals';
import {Thing} from "./thing";

const nestPopulation = 256;
const thingPopulation = 1024;

export class Nest {

  zeAnts = [];
  zeThings = [];
  tick = 0;

  setup = (p, props, initBalls = (this.zeAnts.length === 0)) => {
    if (!p || !props) return;

    p.createCanvas(props.dishConfig.width, props.dishConfig.height);

    if (initBalls)
      this.initBalls(p, props);
  };

  initBalls = (p) => {
    this.zeThings = [];
    while (this.zeThings.length < thingPopulation)
      this.zeThings.push(new Thing(globals.props.dishConfig.width, globals.props.dishConfig.height, p));

    this.zeAnts = [];
    while (this.zeAnts.length < nestPopulation)
      this.zeAnts.push(new Ant(globals.props.dishConfig.width, globals.props.dishConfig.height, p, globals.props));
  };

  addBall = (p) => this.zeAnts.push(new Ant(globals.props.dishConfig.width, globals.props.dishConfig.height, p));

  // TODO: animated gif stuff - https://gist.github.com/antiboredom/129fd2311dec0046603e

  draw = (p, config) => {
    if(!p || !config) {
      console.error('Nest: no p5 or no config:', p, config);
      return;
    }

    this.tick++;

    p.background(51);

    for( let ant of this.zeAnts )
      ant.step(p, config, this.zeThings);

    for( let t of this.zeThings )
      t.show(p);
  };
}

