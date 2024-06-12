import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import api from "../../api/api";
import { Input, InputBox } from "../Input";
import useAuthStore from "../zustand/auth/auth.store";
import useRecordStore from "../zustand/record/record.store";
import { validateFormData } from "./formValidator";

function Form() {
  const queryClient = useQueryClient();
  const { date, amount, spendItem, spendDetail, changeValue, initFormData } =
    useRecordStore();
  const { signOut } = useAuthStore();

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

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => api.auth.getUserInfo(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFormData({ date, amount, spendItem, spendDetail })) return;

    const dataObj = {
      createdBy: userInfo?.id ?? null,
      date: date,
      amount: amount,
      spendItem: spendItem,
      spendDetail: spendDetail,
    };

    postRecordToServer(dataObj);
    initFormData();
  };

  return (
    <Container onSubmit={handleSubmit}>
      <InputBox>
        <Input
          label={"날짜"}
          id="content-date"
          type="text"
          value={date}
          onChange={(e) => changeValue("date", e.target.value)}
        />
      </InputBox>
      <InputBox>
        <Input
          label={"항목"}
          id="content-item"
          type="text"
          placeholder={"지출 항목"}
          value={spendItem}
          onChange={(e) => changeValue("spendItem", e.target.value)}
        />
      </InputBox>
      <InputBox>
        <Input
          label={"금액"}
          id="content-amount"
          type="number"
          placeholder={"지출 금액"}
          value={amount}
          onChange={(e) => changeValue("amount", e.target.value)}
        />
      </InputBox>
      <InputBox>
        <Input
          label={"내용"}
          id="content-detail"
          type="text"
          placeholder={"지출 내용"}
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

export default Form;
