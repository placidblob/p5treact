export class Sandbox {
  tick = 0;

  setup = (p, props) => {
      if (!p || !props) return;

      p.createCanvas(props.dishConfig.width, props.dishConfig.height);
  };

  draw = (p, props) => {
    this.tick++;

    p.background(51);

    const pos = p.createVector(p.random(0,props.dishConfig.width), p.random(0,props.dishConfig.height));
    const colour = p.color(255,255,255);

    p.strokeWeight(20);
    p.stroke(colour);
    p.point(pos.x, pos.y);

  };
}

