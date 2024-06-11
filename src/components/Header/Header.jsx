import { Link } from "react-router-dom";
import styled from "styled-components";

function Header() {
  return (
    <HeaderContainer>
      <HeaderButtonContainer>
        <HeaderButton to={"/"}>HOME</HeaderButton>
        <HeaderButton to={""}>내 프로필</HeaderButton>
      </HeaderButtonContainer>
      <HeaderButtonContainer>
        <HeaderButton>박요셉(리액트)</HeaderButton>
        <HeaderButton to={"/SignIn"}>로그인</HeaderButton>
      </HeaderButtonContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100px;
  border-bottom: 3px solid black;
  background-color: #d8e8f0;
`;

const HeaderButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 70px;
`;

const HeaderButton = styled(Link)`
  width: 45%;
  color: #577b8d;
  font-weight: bold;
  font-size: 24px;
  border: none;
  background-color: #d8e8f0;
`;
export default Header;
