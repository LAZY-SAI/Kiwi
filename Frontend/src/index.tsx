import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import {AuthProvider} from "@/context/AuthContext.tsx";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
        <App/>
    </AuthProvider>
  </React.StrictMode>
);
