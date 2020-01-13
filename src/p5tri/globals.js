import {Flock} from './ball/flock';
import {Nest} from './ant/nest';
import * as dishTypes from '../constants/dishTypes';
import {Sandbox} from "./sandbox";

export const globals = {
  sketch: undefined,

  flock: new Flock(),
  nest: new Nest(),
  sandbox: new Sandbox(),

  params: undefined,
  p: undefined,
  logicType: dishTypes.BALLS,
};

export const logicMap = {
  BALLS: () => globals.flock,
  ANTS: () => globals.nest,
  SANDBOX: () => globals.sandbox,
};

export const getLogic = () => logicMap[globals.logicType] && logicMap[globals.logicType]() || globals.nest;
