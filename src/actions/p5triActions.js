import * as types from '../constants/actionTypes';

export function playPause() {
  return function (dispatch) {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the fuel savings
    return dispatch({
      type: types.PLAY_PAUSE,
    });
  };
}

export function selectBehaviour(settings) {
  return function (dispatch) {

    console.log('+++ dispatching', {
      type: types.SELECT_BEHAVIOUR,
      payload: settings
    });

    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the fuel savings
    return dispatch({
      type: types.SELECT_BEHAVIOUR,
      payload: settings
    });
  };
}
