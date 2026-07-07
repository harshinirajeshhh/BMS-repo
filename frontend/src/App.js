import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BMSLanding from "./pages/BMSLanding";
import OverviewDashboard from "./pages/OverviewDashboard";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BMSLanding />} />
          <Route path="/dashboard" element={<OverviewDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(11, 15, 24, 0.9)",
            border: "1px solid rgba(45, 212, 191, 0.35)",
            color: "#fff",
            backdropFilter: "blur(16px)",
          },
        }}
      />
    </div>
  );
}

export default App;
