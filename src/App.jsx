import { useState } from "react";
import Login from "./Login";
import FinanceTracker from "./FinanceTracker";

function App() {
  // const [token, setToken] = useState(localStorage.getItem("token"));

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <FinanceTracker  />
  );
}

export default App;