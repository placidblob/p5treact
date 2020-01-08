import {theFlock} from './flock';

const defaultP5triParams = {
  isRunning: () => true,
};

export const sketch = (p, getParams = () => defaultP5triParams) => {
  p.setup = () => theFlock.setup(p, getParams());

  p.draw = () => getParams().isRunning() && theFlock.draw(p, getParams());
};
