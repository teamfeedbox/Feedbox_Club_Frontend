import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import { ToastProvider } from "react-toast-notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <ToastProvider autoDismiss={true} autoDismissTimeout="2000">
        <App />
      </ToastProvider>
    </StateProvider>
  </React.StrictMode>
);
reportWebVitals();