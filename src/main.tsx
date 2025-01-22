import { APIProvider } from "@vis.gl/react-google-maps";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GOOGLE_API_KEY } from "./constants";
import PageContextProvider from "./providers/page-context";
import Entry from "./routes/entry.tsx";
import Overview from "./routes/overview.tsx";
import Root from "./routes/root.tsx";
import "./index.css";

const basename = import.meta.env.VITE_BASE_PATH || undefined;
console.log(basename);
ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <APIProvider apiKey={GOOGLE_API_KEY}>
      <PageContextProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route element={<Root />}>
              <Route index element={<Overview />} />
              <Route path=":shortcut" element={<Entry />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PageContextProvider>
    </APIProvider>
  </React.StrictMode>,
);
