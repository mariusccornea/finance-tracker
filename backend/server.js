import express from "express";
import cors from "cors";
import db from "./db.js";
import { randomUUID } from "crypto";

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// health endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/transactions", (req, res) => {
    const rows = db.prepare("SELECT * FROM transactions").all();
    res.json(rows)
})

app.post("/transactions", (req, res) => {
    const { amount, description, date, category } = req.body;
    if (!amount || !description || !date || !category) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const id = randomUUID();
    db.prepare(
        "INSERT INTO transactions (id, amount, description, date, category) VALUES (?, ?, ?, ?, ?)"
    ).run(id, amount, description, date, category);

    res.json({ id, amount, description, date, category });

 
})
//update 
app.put("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const { date, amount, description, category } = req.body;

  const result = db
    .prepare(
      "UPDATE transactions SET date = ?, amount = ?, description = ?, category = ? WHERE id = ?"
    )
    .run(date, amount, description,category, id );
  const updated = db
    .prepare("SELECT * FROM transactions WHERE id = ?")
    .get(id);
  
  console.log("After update:", updated);
  console.log("Updating id:", id);
  console.log("With body:", req.body);
  console.log("Result:", result);

  res.json({ success: true, result });
});
//delete
app.delete("/transactions/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM transactions WHERE id = ?").run(id);
    res.json({ success: true });
  });
  

// start server

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
