import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";  // notice the .js extension in ESM

const router = express.Router();

// signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(email, hashed);
  res.json({ success: true });
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, "your-secret-key", { expiresIn: "1h" });
  res.json({ token });
});

// middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// protected route
router.get("/transactions", authMiddleware, (req, res) => {
  const rows = db.prepare("SELECT * FROM transactions WHERE userId = ?").all(req.user.userId);
  res.json(rows);
});

export default router;
