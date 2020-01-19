import {Flock} from './ball/flock';
import {Nest} from './ant/nest';
import * as dishTypes from '../constants/dishTypes';
import {Experiments} from "./experiments";
import {Perlin} from "./perlin";
import {Empty} from "./empty";

export const globals = {
  sketch: undefined,

  flock: new Flock(),
  nest: new Nest(),
  perlin: new Perlin(),
  experiments: new Experiments(),
  empty: new Empty(),

  params: undefined,
  p: undefined,
  logicType: dishTypes.BALLS,
};

export const logicMap = {
  BALLS: () => globals.flock,
  ANTS: () => globals.nest,
  PERLIN: () => globals.perlin,
  EXPERIMENTS: () => globals.experiments,
  EMPTY: () => globals.empty,
};

export const getLogic = () => logicMap[globals.logicType] && logicMap[globals.logicType]() || globals.flock;
