import { Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
}

export default App;
