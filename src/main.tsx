import { APIProvider } from "@vis.gl/react-google-maps";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GOOGLE_API_KEY } from "./constants";
import PageContextProvider from "./providers/page-context";
import Entry from "./routes/entry.tsx";
import Overview from "./routes/overview.tsx";
import Root from "./routes/root.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: ":shortcut",
        element: <Entry />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <APIProvider apiKey={GOOGLE_API_KEY}>
      <PageContextProvider>
        <RouterProvider router={router} />
      </PageContextProvider>
    </APIProvider>
  </React.StrictMode>,
);
