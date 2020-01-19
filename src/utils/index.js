export * from './OpenSimplexNoise';
export * from './p5utils';
export * from './OrderedList';

import objectAssign from 'object-assign';

export const combine = (a, b) => objectAssign({}, a, b);
