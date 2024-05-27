import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";
import Overview from "./routes/overview.tsx";
import Root from "./routes/root.tsx";
import Entry from "./routes/entry.tsx";
import PageContextProvider from "./providers/page-context";
import { GOOGLE_API_KEY } from "./constants";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: ":entryId",
        element: <Entry />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <APIProvider apiKey={GOOGLE_API_KEY}>
      <PageContextProvider>
        <RouterProvider router={router} />
      </PageContextProvider>
    </APIProvider>
  </React.StrictMode>
);
