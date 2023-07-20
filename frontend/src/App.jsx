import "./App.css";
// import { RouterProvider } from "react-router-dom";
import React from "react";
import AppRouter from "./router/router";
import { AuthProvider } from "./router/AuthContext";

function App() {
  return (
    <>
      <React.StrictMode>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
