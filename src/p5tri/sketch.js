import {globals, getLogic} from './globals';

export const sketch = (p) => {
  globals.p = p;
  globals.sketch = this;

  p.setup = () => {
    console.log('$$$ SKETCH.SETUP()');

    getLogic().setup(p, globals.props, true);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (newParams) => {
    if(!newParams || !newParams.props) return;

    console.log('myCustomRedrawAccordingToNewPropsHandler', newParams.props);

    globals.props = newParams.props;
  };

  p.actuallyDraw = () =>
    getLogic().draw &&
    getLogic().draw(p, globals.props);

  p.draw = () =>
    globals.props &&
    globals.props.isRunning &&
    p.actuallyDraw();

  p.mousePressed = () =>
    getLogic().mousePressed &&
    getLogic().mousePressed(p, globals.props);
};
