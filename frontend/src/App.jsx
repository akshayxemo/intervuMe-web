import "./App.css";
import { RouterProvider } from "react-router-dom";
import React from "react";
import Router from "./router/router";

function App() {
  return (
    <>
      <React.StrictMode>
        <RouterProvider router={Router} />
      </React.StrictMode>
    </>
  );
}

export default App;
