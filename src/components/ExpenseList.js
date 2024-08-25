import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeExpense } from '../Redux/expenseSlice';
import './ExpenseList.css'; // Import the CSS file

function ExpenseList({ onEdit }) {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch(removeExpense(id));
    }
  };

  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <div className="expense-details">
              <span><strong>Amount:</strong> {expense.amount} USD</span>
              <span><strong>Category:</strong> {expense.category}</span>
              <span><strong>Date:</strong> {expense.date}</span>
              <span><strong>Description:</strong> {expense.description}</span>
            </div>
            <div className="expense-actions">
              <button className="edit-button" onClick={() => onEdit(expense)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(expense.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
