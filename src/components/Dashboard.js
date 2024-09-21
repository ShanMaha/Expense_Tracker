import React, { useState, useEffect } from 'react';
import './Dashboardarea.css';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [formData, setFormData] = useState({ name: '', amount: '', category: '', date: '' });
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const loadExpenses = () => {
      const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
      setExpenses(savedExpenses);
      calculateIncomeAndExpenses(savedExpenses);
    };

    loadExpenses();

    // Set up an event listener for storage changes
    window.addEventListener('storage', loadExpenses);

    return () => {
      window.removeEventListener('storage', loadExpenses);
    };
  }, []);

  const calculateIncomeAndExpenses = (expenses) => {
    let totalIncome = 0;
    let totalExpense = 0;

    expenses.forEach((expense) => {
      if (parseFloat(expense.amount) > 0) {
        totalIncome += parseFloat(expense.amount);
      } else {
        totalExpense += Math.abs(parseFloat(expense.amount));
      }
    });

    setIncome(totalIncome);
    setTotalExpenses(totalExpense);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, amount, category, date } = formData;

    if (!name || isNaN(amount) || !category || !date) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const newExpense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      name,
      amount: parseFloat(amount),
      category,
      date
    };

    const updatedExpenses = editingExpense
      ? expenses.map(expense => expense.id === newExpense.id ? newExpense : expense)
      : [...expenses, newExpense];

    setExpenses(updatedExpenses);
    saveExpensesToLocalStorage(updatedExpenses);
    calculateIncomeAndExpenses(updatedExpenses);

    setFormData({ name: '', amount: '', category: '', date: '' });
    setEditingExpense(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDeleteExpense = (idToDelete) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== idToDelete);
    setExpenses(updatedExpenses);
    saveExpensesToLocalStorage(updatedExpenses);
    calculateIncomeAndExpenses(updatedExpenses);
  };

  const saveExpensesToLocalStorage = (updatedExpenses) => {
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const filteredExpenses = filterCategory === 'All'
    ? expenses
    : expenses.filter(expense => expense.category === filterCategory);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Budget Dashboard</h1>

      <form className="expense-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
      </form>

      <div className="budget-summary">
        <p><strong>Total Income:</strong> Rs {income.toFixed(2)} </p>
        <p><strong>Total Expenses:</strong> Rs {totalExpenses.toFixed(2)} </p>
        <p><strong>Remaining Budget:</strong> Rs {(income - totalExpenses).toFixed(2)} </p>
      </div>

      <div className="filter-container">
        <label htmlFor="filter-category">Search by Category:</label>
        <select
          id="filter-category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="expense-list-container">
        <h2>Expenses</h2>
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map(expense => (
            <div key={expense.id} className="expense-item">
              <p><strong>Name:</strong> {expense.name}</p>
              <p><strong>Amount:</strong> Rs {expense.amount.toFixed(2)}</p>
              <p><strong>Category:</strong> {expense.category}</p>
              <p><strong>Date:</strong> {expense.date}</p>
              <button
                className="edit-expense-button"
                onClick={() => {
                  setFormData({
                    name: expense.name,
                    amount: expense.amount,
                    category: expense.category,
                    date: expense.date
                  });
                  setEditingExpense(expense);
                }}
              >
                Edit
              </button>
              <button
                className="delete-expense-button"
                onClick={() => handleDeleteExpense(expense.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No expenses to display.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
