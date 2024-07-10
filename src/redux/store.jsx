import { createStore, applyMiddleware, combineReducers } from 'redux';
import  {thunk, withExtraArgument }from 'redux-thunk';
import { carsReducer } from './Reducers/carsReducer';
import { alertsReducer } from './Reducers/alertReducer';
import { bookingsReducer } from './Reducers/bookingReducer';
import { usersReducer } from './Reducers/usersReducer';

const rootReducer = combineReducers({
  cars: carsReducer,
  alerts: alertsReducer,
  bookings: bookingsReducer,
  users: usersReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
  // other store enhancers if any
);

export default store;
