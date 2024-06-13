import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import api from "../../api/api";
import useAuthStore from "../zustand/auth/auth.store";
import useFormStore from "../zustand/record/form.store";
import { validateFormData } from "./formValidator";

function Form() {
  const queryClient = useQueryClient();
  const { date, amount, spendItem, spendDetail, changeValue, initFormData } =
    useFormStore();
  const { curUserInfo } = useAuthStore();
  const { signOut } = useAuthStore();

  // 서버에 요청해서 만들어진 정보는 useQuery를 사용한다면 리액트 쿼리의 캐시에 저장된다.
  const { mutate: postRecordToServer } = useMutation({
    mutationFn: async (data) => {
      await api.auth.getUserInfo();

      return await api.record.postRecord(data);
    },
    onSuccess: () => queryClient.invalidateQueries(["records"]),
    onError: () => {
      signOut();
      alert("로그인을 하셔야 추가가 가능합니다.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!curUserInfo.id) return alert("로그인 하세요");
    if (!validateFormData({ date, amount, spendItem, spendDetail })) return;

    const data = {
      createdBy: curUserInfo.id,
      date: date,
      amount: amount,
      spendItem: spendItem,
      spendDetail: spendDetail,
    };

    postRecordToServer(data);
    initFormData();
  };

  return (
    <Container onSubmit={handleSubmit}>
      <InputBox>
        <Label htmlFor="content-date">날짜</Label>
        <Input
          id="content-date"
          type="text"
          value={date}
          onChange={(e) => changeValue("date", e.target.value)}
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="content-item">항목</Label>
        <Input
          id="content-item"
          type="text"
          placeholder="지출 항목"
          value={spendItem}
          onChange={(e) => changeValue("spendItem", e.target.value)}
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="content-amount">금액</Label>
        <Input
          id="content-amount"
          type="text"
          placeholder="지출 금액"
          value={amount}
          onChange={(e) => changeValue("amount", e.target.value)}
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="content-detail">내용</Label>
        <Input
          id="content-detail"
          type="text"
          placeholder="지출 내용"
          value={spendDetail}
          onChange={(e) => changeValue("spendDetail", e.target.value)}
        />
      </InputBox>
      <ButtonBox>
        <Button type="submit">저장</Button>
      </ButtonBox>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  align-items: center;
  height: 100px;
  margin: 20px 0px;
  background-color: #577b8d;
  border-radius: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 20px;
`;
const Button = styled.button`
  width: 68px;
  margin-top: 15px;
  border-radius: 10px;
  border: none;
  background-color: white;
  height: 34px;
  font-weight: 600;
  color: #7f858b;

  &:hover {
    cursor: pointer;
  }
`;
export const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: white;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 20px;
  width: 20%;
`;
const Input = styled.input`
  width: 100%;
  height: 24px;
  padding: 3px;
  margin-top: 5px;
  border-radius: 10px;
  border: none;

  &:focus {
    outline: 2px solid #d8e8f0;
  }
`;

export default Form;
