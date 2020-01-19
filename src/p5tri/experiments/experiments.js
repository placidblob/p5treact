export class Experiments {

  setup = (p, props) => {
    if (!p || !props) return;

    const {width, height} = props.dishConfig;

    p.angleMode(p.RADIANS);

    p.createCanvas(width, height);
    p.background(128);
  };

  draw = (p, props) => {
  };
}

