import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AuthLayout from "./AuthLayout";

// 레이아웃에서 비즈니스 로직이 있는 것 보다는 auth layout이나 auth container같은 것들을 만들어서 쓰는 것이 좋다.
// UI 와 로직 구분
function DefaultLayout() {
  return (
    <AuthLayout>
      <Header />
      <Outlet />
    </AuthLayout>
  );
}

export default DefaultLayout;
