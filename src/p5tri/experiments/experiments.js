export class Experiments {

  exponent = 0;

  setup = (p, props) => {
    if (!p || !props) return;

    const {width, height} = props.dishConfig;

    p.createCanvas(width, height);
    p.background(128);

    p.noStroke();
    this.max_distance = p.dist(0, 0, width, height);
  };

  mousePressed = (p, props) => {
    console.log('mouse x y', p.mouseX, p.mouseY);
  };

  draw = (p, props) => {
    p.background(200);

    for (let i = 0; i <= p.width; i += 40) {
      for (let j = 0; j <= p.height; j += 40) {
        let size = p.dist(p.mouseX, p.mouseY, i, j);
        let factor = (size / this.max_distance);
        let radius = 66;

        factor = Math.pow(factor, 1 / this.exponent);

        size = factor * radius;
        p.stroke(255, 255, 255, 64);
        p.ellipse(i, j, size, size);
      }
    }
  };

  mouseWheel = (p, upDirection, props) => {
    this.exponent += upDirection? 1 : -1;

    if( this.exponent < 0 ) this.exponent = 0;

    console.log('mouseWheel upDown', upDirection, this.exponent);
  };
}
