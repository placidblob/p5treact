import * as types from '../constants/actionTypes';
import initialState from './initialState';
import {combine} from '../utils'
import globals from '../p5tri/globals'

const reducerMap = {
  [types.PLAY_PAUSE]: (prevState) => ({isRunning: !prevState.isRunning}),
  [types.RESET_SIMULATION]: () => { globals.p.setup(); return {}; },
  [types.SELECT_BEHAVIOUR]: (prevState, action) => action.payload,
  [types.SELECT_P5TRI_TYPE]: (prevState, action) => {
    globals.logicType = action.payload;
    globals.p.setup();
    return {dishType: action.payload};
  },
  [types.CHANGE_ATTRIBUTE]: (prevState, action) => {
    const {key, parentKey, value} = action.payload;

    console.log('^^^ change_attr params', action, key, parentKey, value);

    if(!parentKey)
      return { [key]: value };

    const rtrn = {
      [parentKey]: {
        ...prevState[parentKey],
        [action.payload.key]: action.payload.value
      }
    };

    console.log('change_attr returning', rtrn);

    return rtrn;
  },
};

export const calcSquares = (state) => ({
  ...state,
  behaviour: {
    ...state.behaviour,
    lineOfSight_sq: state.behaviour.lineOfSight ** 2,
    cozyDistance_sq: state.behaviour.cozyDistance ** 2,
  }
});


// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function p5triReducer(prevState = calcSquares(initialState.p5triParams), action) {
  if(reducerMap[action.type]) {

    console.log('+++ handling action:', action);
    console.log('+   prev state:', prevState);

    const rtrn = calcSquares( combine(prevState, reducerMap[action.type](prevState, action)) );

    console.log('+-- reducer returning', rtrn);

    return rtrn;
  }

  return prevState;
}
