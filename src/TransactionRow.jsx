
function TransactionRow({transactions,setEditingRow, setTransactions,t, i}){

    return (
    <tr key={i}>
        <td>
          {new Date(t.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </td>
        <td>{t.description}</td>
        <td>{Number(t.amount).toFixed(2)}</td>
        <td>{t.category}</td>
        <td><button
        className="btn"
        onClick={()=>{
            setEditingRow(t.id)
        }}
        > Edit</button>
        </td>
        <td>
          <button
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
          </button>
        </td>
      </tr>)

    
}

export default TransactionRow;