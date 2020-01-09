import {theFlock} from './flock';

export const sketch = (p, getBehaviour) => {


  p.setup = () => {
    console.log('$$$ SKETCH.SETUP()')

    theFlock.setup(p);
  };

  p.draw = () => theFlock.draw(p, getBehaviour);
  // p.setup = () => theFlock.setup(p, getParams());
  // p.draw = () => getParams().isRunning() && theFlock.draw(p, getParams());
};
