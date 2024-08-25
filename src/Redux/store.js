// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
});

export default store;
