import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Overview from "./routes/overview.tsx";
import Root from "./routes/root.tsx";
import Entry from "./routes/entry.tsx";
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
