import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import api from "../../api/api";
import useAuthStore from "../zustand/auth/auth.store";
import useRecordStore from "../zustand/record/record.store";
import { isAmountVailid, isDateValid, isTextExistValid } from "./formValidator";

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

  // useEffect(() => {
  //   if (userInfoError) {
  //     alert("로그아웃 되어있습니다.");
  //     navigate("/SignIn");
  //   }
  // }, [userInfoError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDateValid(date))
      return alert("날짜는 YYYY-MM-DD 형식으로 입력해주세요(ex, 2024-05-24)");
    if (!isAmountVailid(amount)) return alert("금액은 숫자만 입력해주세요.");
    if (
      !isTextExistValid({
        date: date,
        amount: amount,
        spendItem: spendItem,
        spendDetail: spendDetail,
      })
    )
      return alert("모든 값을 입력해주세요");
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
          type="number"
          step={100}
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
