import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BMSLanding from "./pages/BMSLanding";
import OverviewDashboard from "./pages/OverviewDashboard";
import { Toaster } from "sonner";
import { ThemeProvider } from "./lib/theme";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BMSLanding />} />
            <Route path="/dashboard" element={<OverviewDashboard />} />
          </Routes>
        </BrowserRouter>
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;
