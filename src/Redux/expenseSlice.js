// src/Redux/expenseSlice.js

import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    editExpense: (state, action) => {
      const { id, updatedExpense } = action.payload;
      const index = state.expenses.findIndex(expense => expense.id === id);
      if (index !== -1) {
        state.expenses[index] = updatedExpense;
      }
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
  },
});

export const { addExpense, editExpense, removeExpense } = expenseSlice.actions; // Export removeExpense
export default expenseSlice.reducer;
