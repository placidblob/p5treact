import * as types from '../constants/actionTypes';
import initialState from './initialState';
import {combine} from '../utils';

const reducerMap = {
  [types.TOGGLE_MAIN_SLIDER]: (prevState) => ({showMainSlider: !prevState.showMainSlider}),
};


// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function uiReducer(prevState = initialState.ui, action) {
  if(reducerMap[action.type])
    return combine(prevState, reducerMap[action.type](prevState));

  return prevState;
}
