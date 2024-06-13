import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import RecordDetailPage from "../pages/DetailPage/DetailPage";
import HomePage from "../pages/HomePage/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage";
// url은 일반적으로 케밥 케이스
// 주소가 바꼇으니 Link에 to로 해놓은 주소들 변경할 것
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
        // restapi를 만드는 것처럼 url도 보통 records = 목록페이지 /:id는 상세페이지
        path: "/records/:id",
        // RecordDetailPage로 수정
        element: <RecordDetailPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        // loader: ProfilePageLoader,
      },
    ],
  },
]);

export default router;
