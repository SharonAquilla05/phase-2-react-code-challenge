import React, {useState} from "react";
import "./index.css";

function TransactionsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expenses, setExpenses] = useState([
    {
      date: "2023-11-10",
      description: "Payment to KFC",
      category: "Food",
      amount: 10000,
    },
    {
      date: "2023-11-12",
      description: "Payment from Flatiron Bank",
      category: "Income",
      amount: 300000,
    },
    {
      date: "2023-11-14",
      description: "Payment of tax",
      category: "Tax",
      amount: 56000,
    },
    {
      date: "2023-11-16",
      description: "Payment of a movie ticket",
      category: "Entertainment",
      amount: 1500,
    },
    {
      date: "2023-11-18",
      description: "Payment of Uber chapchap",
      category: "Transport",
      amount: 17000,
    },
    {
      date: "2023-11-20",
      description: "Payment to Mr Price",
      category: "Fashion",
      amount: 50000,
    },
  ]);

  const [sortOrder, setSortOrder] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    if (sortOrder === key) {
      setExpenses([...expenses].reverse());
    } else {
      const sortedExpenses = [...expenses].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      setExpenses(sortedExpenses);
    }

    setSortOrder(key);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div>
      <div className="Header">
        <h1>The Royal Bank Of Flatiron</h1>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search expenses by description"
      />
      <AddExpenseForm addExpense={addExpense} />
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("date")}>Date</th>
              <th onClick={() => handleSort("description")}>Description</th>
              <th onClick={() => handleSort("category")}>Category</th>
              <th onClick={() => handleSort("amount")}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddExpenseForm({ addExpense }) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      date,
      description,
      category,
      amount: parseFloat(amount),
    };
    addExpense(newExpense);
    setDate("");
    setDescription("");
    setCategory("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <button type="submit">Submit New Expense</button>
    </form>
  );
}

export default TransactionsTable;
