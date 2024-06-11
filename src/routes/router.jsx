import { createBrowserRouter } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp/SignUp";
import DefaultLayout from "../layouts/DefaultLayout";
import DetailPage from "../pages/DetailPage/DetailPage";
import HomePage from "../pages/HomePage/HomePage";
import HomePageLoader from "../pages/HomePage/HomePage.loader";

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
      {
        path: "/SignIn",
        element: <SignIn />,
      },
      {
        path: "/SignUp",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
