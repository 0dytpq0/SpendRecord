import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import { login } from "../../redux/slices/record.slice";

function SignIn() {
  const userId = useRef(null);
  const userPassword = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: signIn } = useMutation({
    mutationFn: (data) => api.auth.signIn(data),
    onSuccess: (data) => {
      dispatch(login(data.accessToken));
      api.auth.setAccessToken(data.accessToken);
      return data;
    },
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    const userInfo = {
      id: userId.current.value,
      password: userPassword.current.value,
    };
    try {
      signIn(userInfo);
    } catch (error) {
      console.log("error", error);
    }
  };

  // const handleSignOut = (e) => {
  //   e.preventDefault();
  //   dispatch(signOut());
  // };

  return (
    <Container onSubmit={handleSignIn}>
      <InputBox>
        <Label htmlFor="content-date">아이디</Label>
        <Input
          ref={userId}
          id="content-date"
          type="text"
          placeholder={"아이디"}
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="content-item">비밀번호</Label>
        <Input
          ref={userPassword}
          id="content-item"
          type="password"
          placeholder="비밀번호"
        />
      </InputBox>

      <ButtonBox>
        <Button type="submit">확인</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate("/SignUp");
          }}
        >
          회원가입
        </Button>
      </ButtonBox>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  max-width: 800px;
  margin: 0 auto;
  padding: 12px 20px;
  border-radius: 20px;
  background-color: #d8e8f0;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  margin: 15px 0px;
  width: 90%;
  height: 30%;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px;
  margin-top: 5px;
  border-radius: 10px;
  border: none;

  &:focus {
    outline: 2px solid #d8e8f0;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;
const Button = styled.button`
  width: 100px;
  height: 50px;
  margin-right: 30px;
  border-radius: 10px;
  border: none;
  background-color: white;
  font-weight: 600;
  font-size: 18px;
  color: #7f858b;

  &:hover {
    cursor: pointer;
  }
`;

const Label = styled.label`
  font-size: 24px;
  font-weight: bold;
  color: #577b8d;
`;

export default SignIn;
