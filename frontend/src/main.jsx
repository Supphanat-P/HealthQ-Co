import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { HashRouter } from "react-router-dom";

dayjs.extend(customParseFormat);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
