export class Experiments {

  setup = (p, props) => {
    if (!p || !props) return;

    const {width, height} = props.dishConfig;

    p.createCanvas(width, height);
    p.background(128);

  };

  mousePressed = (p, props) => {
    console.log('mouse x y', p.mouseX, p.mouseY);
  };

  draw = (p, props) => {
    p.background(200);

  };
}
