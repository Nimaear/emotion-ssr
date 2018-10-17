import { combineReducers } from 'redux';
import app from 'reducers/app.reducer';

const rootReducer = combineReducers({
  app,
});

export default rootReducer;
