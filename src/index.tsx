import React from "react";
import ReactDOM from "react-dom/client";
import { CustomProvider } from "rsuite";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "rsuite/dist/rsuite.min.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CustomProvider theme={"dark"}>
      <App />
    </CustomProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
