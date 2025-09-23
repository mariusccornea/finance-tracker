function TransactionEdit({ transactions, categories, setTransactions, t, i }) {
  return (
    <tr key={i}>
      <td>
        <input
          id="date"
          className="transactionInput"
          type="date"
          defaultValue={t.date}
          onChange={(e) => {
            t.date = e.target.value;
          }}
          required
        />
      </td>
      <td>
        <input
          id="description"
          className="transactionInput"
          type="text"
          defaultValue={t.description}
          onChange={(e) => (t.description = e.target.value)}
          required
        />
      </td>
      <td>
        <input
          id="amount"
          className="transactionInput"
          type="number"
          defaultValue={t.amount}
          onChange={(e) => (t.amount = e.target.value)}
          required
        />
      </td>
      <td>
        <select
          defaultValue={t.category}
          onChange={(e) => (t.category = e.target.value)}
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
        <button className="btn"
        onClick={async ()=>{
          const res = await fetch(
            `http://localhost:5000/transactions/${t.id}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                date:t.date,
                amount:t.amount,
                description:t.description,
              }),
              method: "PUT",
            }
          );
          const data = await res.json();
          console.log(data);
        }}
        >Save</button>
        <button className="btn">Cancel</button>
        {/* <button
          className="btn"
            onClick={async () => {
              const newTransactions = transactions.filter(
                (x) => x.id !== t.id
              );
              const res = await fetch(
                `http://localhost:5000/transactions/${t.id}`,
                {
                  method: "DELETE",
                }
              );

              const result = await res.json();
              console.log(result);

              if (result.success) {
                setTransactions(newTransactions);
              }
            }}
          >
            Delete
          </button> */}
      </td>
    </tr>
  );
}

export default TransactionEdit;
