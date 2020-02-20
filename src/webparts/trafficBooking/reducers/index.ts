import { combineReducers } from 'redux';

import trafficReducer from './trafficReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
   trafficReducer,
   userReducer
});

export default rootReducer;