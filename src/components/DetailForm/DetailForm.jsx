import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import useAuthStore from "../zustand/auth/auth.store";
import useRecordStore from "../zustand/record/record.store";
import { isDateValid } from "./detailFormValidator";

function DetailForm() {
  const { date, amount, spendItem, spendDetail, changeValue } =
    useRecordStore();
  const { signOut } = useAuthStore();

  const queryClient = useQueryClient();
  const params = useParams();

  const navigate = useNavigate();
  const dateRef = useRef(null);

  const { mutate: deleteRecordToServer } = useMutation({
    mutationFn: async (id) => {
      await api.auth.getUserInfo();

      return await api.record.deleteRecord(id);
    },
    onSuccess: () => queryClient.invalidateQueries(["records"]),
    onError: () => {
      signOut();
      alert("로그인을 하셔야 삭제 가능합니다.");
    },
  });

  const { mutate: updateRecordToServer } = useMutation({
    mutationFn: async ({ id, data }) => {
      await api.auth.getUserInfo();

      return await api.record.updateRecord(id, data);
    },
    onSuccess: () => queryClient.invalidateQueries(["records"]),
    onError: () => {
      signOut(), alert("로그인을 하셔야 수정 가능합니다.");
    },
  });

  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.focus();
      dateRef.current.value = date;
    }
  }, [date]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (isDateValid(date)) {
      const newData = {
        date: date,
        amount: amount,
        spendItem: spendItem,
        spendDetail: spendDetail,
      };

      updateRecordToServer({ id: params.id, data: newData });

      navigate(-1);
    } else {
      return alert("날짜는 YYYY-MM-DD ");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("삭제 하시겠습니까?")) {
      deleteRecordToServer(params.id);

      navigate(-1);
    }
  };

  return (
    <Container>
      <InputBox>
        <Label htmlFor="content-date">날짜</Label>
        <Input
          id="content-date"
          type="text"
          ref={dateRef}
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
        <Button onClick={handleUpdate}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          뒤로가기
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
  height: 46%;
  max-width: 800px;
  margin: 0 auto;
  padding: 12px 20px;
  border-radius: 20px;
  background-color: #d8e8f0;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px 0px;
  width: 90%;
`;
const Input = styled.input`
  width: 100%;
  height: 24px;
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
  margin-left: 75px;
  margin-bottom: 12px;
  justify-content: flex-start;
  align-items: center;
`;
const Button = styled.button`
  width: 72px;
  height: 34px;
  margin-right: 30px;
  border-radius: 10px;
  border: none;
  background-color: white;
  font-weight: 600;
  color: #7f858b;

  &:hover {
    cursor: pointer;
  }
`;

const Label = styled.label`
  font-size: 12px;
`;

export default DetailForm;
