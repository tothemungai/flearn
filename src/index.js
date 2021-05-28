import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

ReactDOM.render(
  <React.StrictMode>
    {/* <ScopedCssBaseline> */}
    <App />
    {/* </ScopedCssBaseline> */}
  </React.StrictMode>,
  document.getElementById("root")
);
