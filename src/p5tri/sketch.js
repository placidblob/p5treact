import {theFlock} from './flock';

const defaultP5triParams = {
  isRunning: () => true,
};

export const sketch = (p, behaviour) => {
  p.setup = () => theFlock.setup(p);
  p.draw = () => theFlock.draw(p, behaviour);
  // p.setup = () => theFlock.setup(p, getParams());
  // p.draw = () => getParams().isRunning() && theFlock.draw(p, getParams());
};
