// store/reducers/index.ts

import { combineReducers } from '@reduxjs/toolkit';
import serviceReducer from './serviceSlice'; 
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  service: serviceReducer,
  auth: authReducer // Add all your reducer slices here
});

export default rootReducer;
