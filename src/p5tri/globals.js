import {Flock} from './ball/flock';
import {Nest} from './ant/nest';
import * as dishTypes from '../constants/dishTypes';
import {Experiments} from "./experiments";

export const globals = {
  sketch: undefined,

  flock: new Flock(),
  nest: new Nest(),
  experiments: new Experiments(),

  params: undefined,
  p: undefined,
  logicType: dishTypes.BALLS,
};

export const logicMap = {
  BALLS: () => globals.flock,
  ANTS: () => globals.nest,
  EXPERIMENTS: () => globals.experiments,
};

export const getLogic = () => logicMap[globals.logicType] && logicMap[globals.logicType]() || globals.nest;
