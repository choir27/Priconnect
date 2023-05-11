import React from "react"
import {createRoot} from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals.js"
import "./css/reset.css"
import "./css/normalize.css"
import "./css/main.css"
import "./css/mediaQuery.css"

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

reportWebVitals();