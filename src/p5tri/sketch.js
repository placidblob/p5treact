import {theFlock} from './flock';

export const sketch = (p) => {
  let behaviour = undefined;

  p.setup = () => {
    console.log('$$$ SKETCH.SETUP()')

    theFlock.setup(p);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if(!props) return;

    console.log('myCustomRedrawAccordingToNewPropsHandler', props);

    if (props.behaviour)
      behaviour = props.behaviour;
  };

  p.draw = () => theFlock.draw(p, behaviour);
};
