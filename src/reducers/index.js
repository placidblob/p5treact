import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import fuelSavings from './fuelSavingsReducer';
import p5triParams from './p5triReducer';
import ui from './uiReducer';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  fuelSavings,
  p5triParams,
  ui,
});

export default rootReducer;
