import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import HomePageLoader from "../pages/HomePage.loader";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: HomePageLoader,
      },
      {
        path: "/detailRecord/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
