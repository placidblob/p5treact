import {oppositeColour, promise2dNoiseMap, promiseColourMap, promiseDirectionMap} from '../../utils'

export class Experiments {
  tick = 0;
  // noise = new OpenSimplexNoise(Math.floor(Math.random() * Math.floor(10)));
  colourMap = undefined;
  directionMap = undefined;
  amplitudeMap = undefined;

  setup = (p, props) => {
    if (!p || !props) return;

    const {width, height} = props.dishConfig;

    p.angleMode(p.RADIANS);

    p.createCanvas(width, height);
    p.background(128);

    promiseColourMap(p, width, height).then((val) => this.colourMap = val);
    promiseDirectionMap(p, width, height).then((val) => this.directionMap = val);
    promise2dNoiseMap(p, width, height).then((val) => this.amplitudeMap = val);
  };

  drawColourMap = (p, props) => {
    const {width, height} = props.dishConfig;
    this.tick++;

    p.strokeWeight(1);
    let img = p.createImage(width, height);
    img.loadPixels();

    for(let x = 0; x < width; x++)
      for(let y = 0; y < height; y++)
        img.set(x, y, this.colourMap[x][y]);

    img.updatePixels();
    p.image(img, 0,0);
  };

  drawDirectionMap = (p, props, size = 20) => {
    const {width, height} = props.dishConfig;

    for(let x = size; x < width - size; x += size)
      for(let y = size; y < height - size; y += size) {
        const start = p.createVector(x, y);
        const end = this.directionMap[x][y].copy();
        end.setMag(this.amplitudeMap[x][y] * size);
        end.add(start);

        p.strokeWeight(1);
        const lineColour = oppositeColour(p, this.colourMap[x][y]);
        p.stroke(p.red(lineColour) * 0.7, p.green(lineColour) * 0.7, p.red(lineColour) * 0.2, 255);
        p.line(x, y, end.x, end.y);

        p.strokeWeight(3);
        p.stroke(32, 96);
        p.point(x, y);
      }
  };

  draw = (p, props) => {
    if (!this.colourMap || !this.directionMap || !this.amplitudeMap) return;

    this.drawColourMap(p, props);
    this.drawDirectionMap(p, props);

    p.noLoop();
  };
}

