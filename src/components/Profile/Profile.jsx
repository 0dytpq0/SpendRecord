import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";

function Profile() {
  const userNickname = useRef(null);
  const userAvartar = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => api.auth.getUserInfo(),
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: (data) => api.auth.updateProfile(data),
    onSuccess: queryClient.invalidateQueries(["userInfo"]),
  });

  const handleSignUp = (e) => {
    e.preventDefault();

    try {
      const profileObj = {
        avatar: "",
        nickname: userNickname.current.value,
      };
      updateProfile(profileObj);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container onSubmit={handleSignUp}>
      <InputBox>
        <Label htmlFor="content-date">{userInfo?.nickname ?? "닉네임"}</Label>
        <Input
          ref={userNickname}
          id="content-date"
          type="text"
          placeholder={"닉네임"}
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="content-item">아바타 이미지</Label>
        <Input
          ref={userAvartar}
          id="content-item"
          type="file"
          placeholder="아바타 이미지"
        />
      </InputBox>

      <ButtonBox>
        <Button type="submit">변경</Button>
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

export default Profile;
