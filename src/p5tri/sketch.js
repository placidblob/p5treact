import {theFlock} from './flock';

export const sketch = (p) => {
  let props = undefined; // see p5triParams in initialState.js for format

  p.setup = () => {
    console.log('$$$ SKETCH.SETUP()');

    theFlock.setup(p);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (newParams) => {
    if(!newParams || !newParams.props) return;

    console.log('myCustomRedrawAccordingToNewPropsHandler', newParams.props);

    props = newParams.props;
  };

  p.draw = () => props && props.isRunning && theFlock.draw(p, props.behaviour);

/*
  p.mouseClicked = () => {
    theFlock.addBall(p);
    // prevent default
    return false;
  }
*/
};
