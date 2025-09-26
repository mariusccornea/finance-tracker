import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SidebarItem from "./SidebarItem";
import { useEffect } from "react";
import { useRef } from "react";
import Transactions from "./Transactions";
import Categories from "./Categories";
import Dashboard from "./Dashboard";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./index.css";

function FinanceTracker() {
  //testing with small external API

  useEffect(() => {
    async function fetchCatFact() {
      const res = await fetch("https://catfact.ninja/fact");
      const data = await res.json();
      console.log(data.fact); // or console.log(data)
    }

    fetchCatFact();
  }, []);

  const [transactions, setTransactions] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function loadTransactions() {
      try {
        const res = await fetch("http://localhost:5000/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      }
    }

    loadTransactions();
  }, []);

  //set document title based on TAB based on useLocaiton (very smart iubesc Reactu)
  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        document.title = "Finance Tracker - Dashboard";
        break;
      case "/transactions":
        document.title = "Finance Tracker - Transactions";
        break;
      case "/categories":
        document.title = "Finance Tracker - Categories";
        break;
      default:
        document.title = "Finance Tracker";
    }
  }, [location]);

  const totalRent = transactions
    .filter((t) => t.category === "Rent")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalAdditional = transactions
    .filter((t) => t.category === "Additional Expenses")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalFood = transactions
    .filter((t) => t.category === "Food")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="layout">
      {/* Left sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="text-2xl font-bold">Finance Tracker</span>
        </div>
        <NavLink to="/dashboard" className="nav-item">
          Dashboard
        </NavLink>
        <NavLink to="/transactions" className="nav-item">
          Transactions
        </NavLink>
        <NavLink to="/categories" className="nav-item">
          Categories
        </NavLink>

        <div className="sidebar-footer">
          <small>v0.5 • Demo</small>
        </div>
      </aside>
      {/* main items  */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/transactions"
            element={
              <Transactions
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <Categories
                totalRent={totalRent}
                totalAdditional={totalAdditional}
                totalFood={totalFood}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
// Done
//save in local storage - done
//componente - done
//react router - done
//add categories
//change TAB when changing page - done
//first draft of db - done
//teste - running/ongoing
//add tailwind - done

// TBDone
//teste deeper dive
//authentication
//edit mode for transactions (introduce Updated) - done
//update DB as discussed ( dupa schema de mai jos)
//UNDO greyed out cu timer 10 sec
//React-Icons
// switch de dark mode

// Backlog
//pt Dashboard : breakdwodn pe chart pe timeline (D, m, y, whatever)
//butoane de plictisiti (pie charts)
// search (de vazut librarii)
// accounts (tbd)
// Chakra

// Tabel:
// user - Categories - Amount, Description, Date
//User: ID(key),Name,Account ID
//Transactions: ID(key), Account ID, Category ID, Amount, Description, Date
//Category: Category ID, Category Desc.

export default FinanceTracker;
