import { createRoot } from "react-dom/client";
import App from "./App";
import "./css/reset.css";
import "./css/main.css";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(<App />);
