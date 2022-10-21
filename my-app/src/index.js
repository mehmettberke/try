import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Wörter from "./Wörter";
function Index() {
  return (
    <div>
      <App />
      <Wörter />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
