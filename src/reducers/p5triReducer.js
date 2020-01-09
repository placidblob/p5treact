import * as types from '../constants/actionTypes';
import initialState from './initialState';
import {combine} from '../utils'

const reducerMap = {
  [types.PLAY_PAUSE]: (prevState) => ({isRunning: !prevState.isRunning}),
  [types.SELECT_BEHAVIOUR]: (prevState, action) => ({behaviour: action.payload}),
};


// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function p5triReducer(prevState = initialState.p5triParams.behaviour, action) {
  if(reducerMap[action.type]) {

    console.log('+++ handling action:', action);
    console.log('+   prev state:', prevState);
    console.log('+-- reducer returning', combine(prevState, reducerMap[action.type](prevState, action)));

    return combine(prevState, reducerMap[action.type](prevState, action));
  }

  return prevState;
}
