import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Fatal: Can't find root element to mount the app.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
