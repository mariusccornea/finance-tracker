import { useEffect, useState } from "react";
import TransactionRow from "./TransactionRow";
import TransactionEdit from "./TransactionEdit";

function Transactions({ setTransactions, transactions }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [editingRow, setEditingRow] = useState(null);

  const total = transactions.reduce((sum, t) => {
    return sum + Number(t.amount);
  }, 0);
  const numberOfTransactions = transactions.length;

  const categories = ["Rent", "Additional Expenses", "Food"];
  return (
    <div style={{ margin: "2rem" }}>
      <div>
        <p>Number of transactions: {numberOfTransactions}</p>
        <p>Total Amount: {total}</p>
      </div>
      <form
        className="tx-form"
        onSubmit={async (e) => {
          e.preventDefault();

          const newTx = {
            amount: Number(amount),
            description,
            date,
            category,
          };

          const res = await fetch("http://localhost:5000/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTx),
          });

          const savedTx = await res.json();
          setTransactions([...transactions, savedTx]);

          // reset form fields
          setAmount("");
          setDescription("");
          setDate("");
          setCategory("");
        }}
      >
        <div className="newTransactionRow">
          {/* Category */}
          <div className="form-row">
            <label htmlFor="category">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="transactionInput"
              name="Category"
              id="category"
            >
              <option>-- Choose Category --</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="form-row">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              className="transactionInput"
              type="number"
              placeholder="e.g. 59.99"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          {/* Description */}
          <div className="form-row">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              className="transactionInput"
              type="text"
              placeholder="e.g. Groceries"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {/* Date */}
          <div className="form-row">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              className="transactionInput"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="btn bg-black text-white border-black">
            <button type="submit" className="addBtn">
              Add Transaction
            </button>
          </div>
        </div>
      </form>

      {/* Simple list/table view */}
      <div className="tx-list">
        {transactions.length === 0 ? (
          <p className="muted">No transactions yet.</p>
        ) : (
          <table className="tx-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) =>
                editingRow !== t.id ? (
                  <TransactionRow
                    setEditingRow={setEditingRow}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    t={t}
                    i={i}
                  />
                ) : (
                  <TransactionEdit
                    categories={categories}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    t={t}
                    i={i}
                  />
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Transactions;
