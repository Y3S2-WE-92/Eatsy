import { combineReducers, createStore } from 'redux';
import orderReducer from './reducers/orderReducer';
// ...existing imports...

const rootReducer = combineReducers({
  order: orderReducer,
  // ...other reducers...
});

const store = createStore(rootReducer);

export default store;
