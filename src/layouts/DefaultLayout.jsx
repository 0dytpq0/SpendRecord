import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

function DefaultLayout() {
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
