import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api/api";
import Header from "../components/Header";
import useAuthStore from "../components/zustand/auth/auth.store";

function DefaultLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, setUserInfo } = useAuthStore();

  const excludePaths = ["/SignIn", "/SignUp"];
  const shouldRenderLayout = !excludePaths.includes(location.pathname);

  const { error: userInfoError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const info = await api.auth.getUserInfo();
      setUserInfo(info);
      return info;
    },
    retry: 1,
  });

  useEffect(() => {
    if (userInfoError && shouldRenderLayout) {
      signOut();
      alert("로그아웃 되어있습니다.");
      navigate("/SignIn");
    }
  }, [userInfoError]);

  return (
    <Div>
      <Header />
      <Outlet />
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 97vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default DefaultLayout;
