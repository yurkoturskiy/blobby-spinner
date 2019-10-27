import React from "react";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";

import "./styles.css";

function App() {
  return <Spinner />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
