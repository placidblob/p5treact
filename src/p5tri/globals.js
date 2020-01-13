import {Flock} from './ball/flock';
import {Nest} from './ant/nest';
import * as dishTypes from '../constants/dishTypes';

export default {
  sketch: undefined,
  flock: new Flock(),
  nest: new Nest(),
  params: undefined,
  p: undefined,
  logicType: dishTypes.BALLS,
};
