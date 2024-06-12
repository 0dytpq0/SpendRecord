import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import DetailPage from "../pages/DetailPage/DetailPage";
import HomePage from "../pages/HomePage/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        // loader: HomePageLoader,
      },
      {
        path: "/detailRecord/:id",
        element: <DetailPage />,
      },
      {
        path: "/SignIn",
        element: <SignInPage />,
      },
      {
        path: "/SignUp",
        element: <SignUpPage />,
      },
      {
        path: "/Profile",
        element: <ProfilePage />,
        // loader: ProfilePageLoader,
      },
    ],
  },
]);

export default router;
