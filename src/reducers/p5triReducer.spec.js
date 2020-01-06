import * as ActionTypes from '../constants/actionTypes';
import reducer from './p5triReducer';

describe('Reducers::p5triReducer', () => {
  const getInitialState = () => ({
      isRunning: true
    });

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle PLAY_PAUSE', () => {
    const action = { type: ActionTypes.PLAY_PAUSE };
    const expectedRunning = Object.assign(getInitialState(), { isRunning: true });
    const expectedStopped = Object.assign(getInitialState(), { isRunning: false });

    const state1 = reducer(getInitialState(), action);

    expect(state1).toEqual(expectedStopped);

    expect(reducer(state1, action)).toEqual(expectedRunning);
  });
});
