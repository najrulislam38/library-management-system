import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Router from "./routes/Router.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </StrictMode>
);
