import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import styled from "styled-components";
import api from "../../api/api";
import useAuthStore from "../zustand/auth/auth.store";

function Profile() {
  const userNickname = useRef(null);
  const userAvatar = useRef(null);
  const queryClient = useQueryClient();
  const { curUserInfo } = useAuthStore();

  const { mutate: updateProfile } = useMutation({
    mutationFn: (data) => api.auth.updateProfile(data),
    onSuccess: queryClient.invalidateQueries(["userInfo"]),
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const file = userAvatar.current.files[0];
    const profile = {
      avatar: file,
      nickname: userNickname.current.value,
    };
    updateProfile(profile);
  };

  return (
    <Container onSubmit={handleUpdateProfile}>
      <InputBox>
        <Label htmlFor="content-date">{curUserInfo.nickname ?? "닉네임"}</Label>
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
          ref={userAvatar}
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
