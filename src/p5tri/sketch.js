import globals from './globals';

export const sketch = (p, logicObject) => {
  p.angleMode(p.DEGREES); // Change the mode to DEGREES

  globals.p = p;

  p.setup = () => {
    console.log('$$$ SKETCH.SETUP()');

    logicObject.setup(p, globals.props, true);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (newParams) => {
    if(!newParams || !newParams.props) return;

    console.log('myCustomRedrawAccordingToNewPropsHandler', newParams.props);

    globals.props = newParams.props;
  };

  p.draw = () =>
    globals.props &&
    globals.props.isRunning &&
    logicObject.draw(p, globals.props);
};
