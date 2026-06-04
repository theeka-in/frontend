import "@repo/ui/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./App";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HomePage />
    </StrictMode>,
);
