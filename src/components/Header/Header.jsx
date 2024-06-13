import { Link } from "react-router-dom";
import styled from "styled-components";
import useAuthStore from "../zustand/auth/auth.store";

function Header() {
  const { curUserInfo, isAuthenticated, signOut } = useAuthStore();

  const validatedLoginButton = () => {
    if (isAuthenticated)
      return (
        <HeaderButton onClick={signOut}>
          <div>로그아웃</div>
        </HeaderButton>
      );

    return (
      <HeaderButton to={"/sign-in"}>
        <div>로그인</div>
      </HeaderButton>
    );
  };

  return (
    <HeaderContainer>
      <HeaderButtonContainer>
        <HeaderButton to={"/"}>
          <div>HOME</div>
        </HeaderButton>
      </HeaderButtonContainer>
      <HeaderButtonContainer>
        <ProfileButton to={"/profile"}>
          {curUserInfo.avatar && <ProfileImg src={curUserInfo?.avatar} />}
          <ProfileNickname>{curUserInfo?.nickname ?? "게스트"}</ProfileNickname>
        </ProfileButton>
        {validatedLoginButton()}
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
  height: 50px;
  border-bottom: 3px solid #3280a5;
  background-color: #d8e8f0;
`;

const HeaderButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 70px;
`;

const HeaderButton = styled(Link)`
  width: 45%;
  color: #577b8d;
  font-weight: bold;
  font-size: 24px;
  border: none;
  background-color: #d8e8f0;
  & div {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const ProfileButton = styled(Link)`
  display: flex;
  align-items: center;
  width: 45%;
  color: #577b8d;
  font-weight: bold;
  font-size: 24px;
  border: none;
  background-color: #d8e8f0;
`;
const ProfileNickname = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
`;
const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 30px;
`;

export default Header;
