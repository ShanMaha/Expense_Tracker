import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense, editExpense } from '../Redux/expenseSlice';
 // Ensure you have a CSS file for styling

function ExpenseForm({ expenseToEdit, onClose }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (expenseToEdit) {
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
      setDescription(expenseToEdit.description);
      setId(expenseToEdit.id);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = { amount, category, date, description, id: id || Date.now() };
    
    if (id) {
      dispatch(editExpense({ id, updatedExpense: expense }));
    } else {
      dispatch(addExpense(expense));
    }
    
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
    setId(null);
    onClose();
  };

  return (
    <div className="expense-form">
      <h2>{id ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          {id ? 'Update Expense' : 'Add Expense'}
        </button>
        <button type="button" onClick={onClose} className="cancel-button">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
