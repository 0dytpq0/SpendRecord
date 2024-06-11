import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  changeValue,
  createData,
  initFormData,
} from "../../redux/slices/record.slice";
import { isTextExistValid } from "../DetailForm/detailFormValidator";
import { isAmountVailid, isDateValid } from "./formValidator";

function Form() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.record);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDateValid(selector.date))
      return alert("날짜는 YYYY-MM-DD 형식으로 입력해주세요(ex, 2024-05-24)");
    if (!isAmountVailid(selector.amount))
      return alert("금액은 숫자만 입력해주세요.");
    if (
      !isTextExistValid({
        date: selector.date,
        amount: selector.amount,
        spendItem: selector.spendItem,
        spendDetail: selector.spendDetail,
      })
    )
      return alert("모든 값을 입력해주세요");

    const createAction = createData();
    const initAction = initFormData();
    dispatch(createAction);
    dispatch(initAction);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <InputBox>
        <Label htmlFor="content-date">날짜</Label>
        <Input
          id="content-date"
          type="text"
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
          type="number"
          step={100}
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
            "e.target.value", e.target.value;
          }}
        />
      </InputBox>
      <ButtonBox>
        <Button type="Container">저장</Button>
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

const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: white;
`;

export default Form;
