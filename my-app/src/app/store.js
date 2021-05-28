import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { seatsListReducer} from '../reducers/seatsReducer';

const initialState = {};

const reducer = combineReducers({
  seatsList: seatsListReducer,
})

const comporseEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  comporseEnhancer(applyMiddleware(thunk))
);

export default store;