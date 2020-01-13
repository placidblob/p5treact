import globals from './globals';
import * as dishTypes from '../constants/dishTypes';

export const sketch = (p) => {
  p.angleMode(p.DEGREES);

  globals.p = p;

  const getLogicObject = () => globals.logicType === dishTypes.ANTS? globals.nest : globals.flock;

  p.setup = () => {
    console.log('$$$ SKETCH.SETUP()');

    getLogicObject().setup(p, globals.props, true);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (newParams) => {
    if(!newParams || !newParams.props) return;

    console.log('myCustomRedrawAccordingToNewPropsHandler', newParams.props);

    globals.props = newParams.props;
  };

  p.draw = () =>
    globals.props &&
    globals.props.isRunning &&
    getLogicObject().draw(p, globals.props);
};
