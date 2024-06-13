import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import api from "../api/api";
import useAuthStore from "../components/zustand/auth/auth.store";

function AuthLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, signIn } = useAuthStore();

  const excludePaths = ["/sign-in", "/sign-up"];
  // 이름이 알맞지 못하다. 검증에 대한 내용인데 UI와 관련된 이름처럼 보인다.
  const shouldRenderLayout = !excludePaths.includes(location.pathname);

  // error => isError => bollean값임 확인
  const { isError: isUnauthenticated } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const info = await api.auth.getUserInfo();
      signIn(info);
      return info;
    },
    retry: 1,
  });

  useEffect(() => {
    if (isUnauthenticated && shouldRenderLayout) {
      signOut();
      Swal.fire({
        title: "Error!",
        text: "로그아웃 상태입니다.",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      navigate("/sign-in");
    }
    // 정말 필요없다면 quick fix로 아래처럼 달아줄 것
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnauthenticated]);

  return <Container>{children}</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 97vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default AuthLayout;
