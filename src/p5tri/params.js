export const zeBalls = [];

export const FLOCK_SIZE = 256;

export const MAX_X = 900;
export const MAX_Y = 900;

export const BALL_RADIUS = 12;
export const GRAVITY = 2;
export const FRICTION = 0.004;

export const MAX_VELOCITY = 6 * GRAVITY;

export const COZY = 8;
export const COZY_DISTANCE = COZY * BALL_RADIUS;
export const COZY_DISTANCE_SQ = COZY_DISTANCE * COZY_DISTANCE;
export const LINE_OF_SIGHT = COZY_DISTANCE * 2;
export const LINE_OF_SIGHT_SQ = LINE_OF_SIGHT * LINE_OF_SIGHT;

export let tick = 0;

export const ATTRACTIVE_FORCE = GRAVITY;
