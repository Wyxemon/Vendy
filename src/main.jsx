import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";


// root (no tocar)
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App /> {/*componente de rutas*/}
  </StrictMode>,
);
