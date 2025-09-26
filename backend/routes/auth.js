    const express = require("express");
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");
    const db = require("../db"); // adjust path to your db file
    
    const router = express.Router();


    app.post("/signup", async (req, res) => {
        const { email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
      
        db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(email, hashed);
        res.json({ success: true });
      });
      
      app.post("/login", async (req, res) => {
        const { email, password } = req.body;
        const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
      
        if (!user) return res.status(401).json({ error: "Invalid credentials" });
      
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });
      
        const token = jwt.sign({ userId: user.id }, "your-secret-key", { expiresIn: "1h" });
        res.json({ token });
      });
      
      function authMiddleware(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
      
        if (!token) return res.sendStatus(401);
      
        jwt.verify(token, "your-secret-key", (err, user) => {
          if (err) return res.sendStatus(403);
          req.user = user; // { userId: ... }
          next();
        });
      }
      
      app.get("/transactions", authMiddleware, (req, res) => {
        const rows = db.prepare("SELECT * FROM transactions WHERE userId = ?").all(req.user.userId);
        res.json(rows);
      });



