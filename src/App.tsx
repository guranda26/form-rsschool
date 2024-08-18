// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UncontrolledForm from "./components/UncontrolledForm";
import HookForm from "./components/HookForm";
import Main from "./components/Main";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <header className="header">
        <nav>
          <Link to="/">Main</Link> |
          <Link to="/uncontrolled-form">Uncontrolled Form</Link> |
          <Link to="/hook-form">React Hook Form</Link>
        </nav>
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
            <Route path="/hook-form" element={<HookForm />} />
          </Routes>
        </div>
      </header>
    </Router>
  );
};

export default App;
