import React from "react";
import "./App.css";
import * as Components from "./components";

function App() {
  return (
    <div className="App">
      <Components.LongPooling />
      <hr />
      <Components.EventSourcing/>
    </div>
  );
}

export default App;
