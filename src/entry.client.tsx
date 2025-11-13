import {
  startTransition,
  StrictMode,
} from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router";
import { routes } from "./routes";
import "./index.css";

const router =
  createBrowserRouter(
    routes,
  );

startTransition(
  () => {
    createRoot(
      document.getElementById(
        "root",
      )!,
    ).render(
      <StrictMode>
        <RouterProvider
          router={
            router
          }
        />
      </StrictMode>,
    );
  },
);
