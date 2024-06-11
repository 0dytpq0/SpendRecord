import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  changeValue,
  deleteData,
  initFormData,
  updateData,
} from "../../redux/slices/record.slice";
import { isDateValid } from "./detailFormValidator";

function DetailForm() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.record);

  const navigate = useNavigate();
  const dateRef = useRef(null);

  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.focus();
      dateRef.current.value = selector.date;
    }
  }, [selector.date]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (isDateValid(selector.date)) {
      const action = updateData();
      const initAction = initFormData();
      dispatch(action);
      dispatch(initAction);
      navigate(-1);
    } else {
      return alert("날짜는 YYYY-MM-DD ");
    }
  };

  const handleDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      const action = deleteData();
      dispatch(action);

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
          value={selector.date}
          onChange={(e) => {
            const action = changeValue({
              content: e.target.value,
              type: "date",
            });
            dispatch(action);
          }}
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="content-item">항목</Label>
        <Input
          id="content-item"
          type="text"
          placeholder="지출 항목"
          value={selector.spendItem}
          onChange={(e) => {
            const action = changeValue({
              content: e.target.value,
              type: "spendItem",
            });
            dispatch(action);
          }}
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="content-amount">금액</Label>
        <Input
          id="content-amount"
          type="text"
          placeholder="지출 금액"
          value={selector.amount}
          onChange={(e) => {
            const action = changeValue({
              content: e.target.value,
              type: "amount",
            });
            dispatch(action);
          }}
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="content-detail">내용</Label>
        <Input
          id="content-detail"
          type="text"
          placeholder="지출 내용"
          value={selector.spendDetail}
          onChange={(e) => {
            const action = changeValue({
              content: e.target.value,
              type: "spendDetail",
            });
            dispatch(action);
          }}
        />
      </InputBox>
      <ButtonBox>
        <Button onClick={handleUpdate}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
        <Button onClick={() => navigate(-1)}>뒤로가기</Button>
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
