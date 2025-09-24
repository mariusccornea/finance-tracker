import { useState } from "react";

function TransactionEdit({
  transactions,
  setEditingRow,
  categories,
  setTransactions,
  t,
  i,
}) {
  const [transaction, setTransaction] = useState({ ...t });
  
  return (
    <tr key={i}>
      <td>
        <input
          id="date"
          className="transactionInput"
          type="date"
          min="2024-01-01" max="2025-12-31"
          defaultValue={transaction.date}
          onChange={(e) => {
            setTransaction({ ...transaction, date: e.target.value });
          }}
          requiredhow
        />
      </td>
      <td>
        <input
          id="description"
          className="transactionInput"
          type="text"
          defaultValue={transaction.description}
          onChange={(e) =>
            setTransaction({ ...transaction, description: e.target.value })
          }
          required
        />
      </td>
      <td>
        <input
          id="amount"
          className="transactionInput"
          type="number"
          defaultValue={transaction.amount}
          onChange={(e) =>
            setTransaction({ ...transaction, amount: e.target.value })
          }
          required
        />
      </td>
      <td>
        <select
          defaultValue={transaction.category}
          onChange={(e) =>
            setTransaction({ ...transaction, category: e.target.value })
          }
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
      </td>
      <td>
        <button
          className="btn"
          onClick={async () => {
            const res = await fetch(
              `http://localhost:5000/transactions/${transaction.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  date: transaction.date,
                  amount: transaction.amount,
                  description: transaction.description,
                  category: transaction.category,
                }),
                method: "PUT",
              }
            );
            const data = await res.json();
            if (data.success) {
              const res = await fetch("http://localhost:5000/transactions");
              const newTransactions = await res.json();
              setTransactions(newTransactions);
              setEditingRow(null);
            }
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            setEditingRow(null);
            setTransaction({ ...t });
          }}
          className="btn"
        >
          Cancel
        </button>
  
      </td>
    </tr>
  );
}

export default TransactionEdit;
