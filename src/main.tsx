import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./contexts/QueryContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter
    future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
  >
    <QueryProvider>
      <App />
    </QueryProvider>
  </BrowserRouter>
);
