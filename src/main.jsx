import React from "react";
import ReactDOM from "react-dom/client";
import { StateProvider } from "./StateManagement/StateProvider";
import reducer, { initialState } from "./StateManagement/reducer";

import App from "./Components/App";
import "./Styles/main.css";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>
);
