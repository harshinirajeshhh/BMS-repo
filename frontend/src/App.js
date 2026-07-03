import React from "react";
import "./App.css";
import BMSLanding from "./pages/BMSLanding";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <BMSLanding />
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
