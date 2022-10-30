import {combineReducers, createStore} from 'redux';
import postBoxTypeReducer from './reducers/postBoxTypeReducer';

const rootReducer = combineReducers({
  postBoxType: postBoxTypeReducer,
});

export const store = createStore(rootReducer);
