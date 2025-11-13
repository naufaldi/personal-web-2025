import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router";
import { routes } from "./routes";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import "./index.css";

const router =
  createBrowserRouter(
    routes,
  );

createRoot(
  document.getElementById(
    "root",
  )!,
).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider
      router={
        router
      }
    />
  </ThemeProvider>,
);
