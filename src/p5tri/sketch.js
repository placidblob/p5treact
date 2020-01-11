import globals from './globals';

export const sketch = (p) => {
  globals.p = p;

  p.setup = () => {
    console.log('$$$ SKETCH.SETUP()');

    globals.flock.setup(p, globals.props, true);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (newParams) => {
    if(!newParams || !newParams.props) return;

    console.log('myCustomRedrawAccordingToNewPropsHandler', newParams.props);

    globals.props = newParams.props;
  };

  p.draw = () => globals.props && globals.props.isRunning && globals.flock.draw(p, globals.props.behaviour);
};
