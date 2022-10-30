import {combineReducers, createStore} from 'redux';
import postBoxTypeReducer from './reducers/postBoxTypeReducer';
import documentReducer from './reducers/documentReducer';

const rootReducer = combineReducers({
  postBoxType: postBoxTypeReducer,
  scannedDocuments: documentReducer,
});

export const store = createStore(rootReducer);
