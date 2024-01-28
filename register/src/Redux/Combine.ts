import { combineReducers } from 'redux';
import Reducer from './Reducer';

const rootReducer = combineReducers({
  Data: Reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;