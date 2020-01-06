import {theFlock} from './flock';

export const sketch = (p) => {
  p.setup = () => theFlock.setup(p);

  p.draw = () => theFlock.draw(p);
};
