import AddBook from "./../pages/AddBook/AddBook";
import Root from "./../layout/Root";
import Books from "./../pages/Books/Books";
import { createBrowserRouter } from "react-router";
import BorrowSummary from "./../pages/BorrowSummary/BorrowSummary";
import Home from "./../pages/Home/Home";
import SingleBook from "./../pages/Shared/SingleBook/SingleBook";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/books",
        Component: Books,
      },
      {
        path: "/books/:id",
        Component: SingleBook,
      },
      {
        path: "/add-book",
        Component: AddBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default Router;
