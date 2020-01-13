export * from './OpenSimplexNoise';
export * from './p5utils';

import objectAssign from 'object-assign';

export const combine = (a, b) => objectAssign({}, a, b);
