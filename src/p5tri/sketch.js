import {globals, getLogic} from './globals';

export const sketch = (p) => {
  p.angleMode(p.DEGREES);

  globals.p = p;

  p.setup = () => {
    console.log('$$$ SKETCH.SETUP()');

    getLogic().setup(p, globals.props, true);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (newParams) => {
    if(!newParams || !newParams.props) return;

    console.log('myCustomRedrawAccordingToNewPropsHandler', newParams.props);

    globals.props = newParams.props;
  };

  p.draw = () =>
    globals.props &&
    globals.props.isRunning &&
    getLogic().draw(p, globals.props);
};
