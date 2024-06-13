import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import api from "../../api/api";
import useAuthStore from "../zustand/auth/auth.store";
import useFormStore from "../zustand/record/form.store";
import { validateDetailFormData } from "./detailFormValidator";

function RecordDetailForm() {
  const { date, amount, spendItem, spendDetail, changeValue } = useFormStore();
  const { signOut } = useAuthStore();

  const queryClient = useQueryClient();
  const params = useParams();

  const navigate = useNavigate();

  const { mutate: deleteRecordToServer } = useMutation({
    mutationFn: async (id) => {
      await api.auth.getUserInfo();

      return await api.record.deleteRecord(id);
    },
    onSuccess: () => queryClient.invalidateQueries(["records"]),
    onError: () => {
      signOut();
      Swal.fire({
        title: "Error!",
        text: "로그인을 하셔야 삭제가 가능합니다.",
        icon: "error",
      });
    },
  });

  const { mutate: updateRecordToServer } = useMutation({
    mutationFn: async ({ id, data }) => {
      await api.auth.getUserInfo();

      return await api.record.updateRecord(id, data);
    },
    onSuccess: () => queryClient.invalidateQueries(["records"]),
    onError: () => {
      signOut(),
        Swal.fire({
          title: "Error!",
          text: "로그인을 하셔야 수정이 가능합니다.",
          icon: "error",
        });
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateDetailFormData({ date, amount, spendItem, spendDetail }))
      return;

    const newData = {
      date: date,
      amount: amount,
      spendItem: spendItem,
      spendDetail: spendDetail,
    };

    Swal.fire({
      title: "수정 하시겠습니까?",
      text: "되돌릴 수 없습니다, 신중하세요.",
      icon: "warning",
      confirmButtonText: "수정",
      cancelButtonText: "취소",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updateRecordToServer({ id: params.id, data: newData });

        navigate(-1);
      }
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "삭제 하시겠습니까?",
      text: "되돌릴 수 없습니다, 신중하세요.",
      icon: "warning",
      confirmButtonText: "삭제", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정

      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecordToServer(params.id);
        navigate(-1);
      }
    });
  };

  return (
    <Container>
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

export default RecordDetailForm;
