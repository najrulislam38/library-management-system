import App from "./../App";
import { createBrowserRouter } from "react-router";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
]);

export default Router;
