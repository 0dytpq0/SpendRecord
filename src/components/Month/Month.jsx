import styled from "styled-components";
import useFormStore from "../zustand/record/form.store";
// 비교하고 함 보자
function Month() {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const { changeMonth, month: currentMonth } = useFormStore();

  const handleClickMonth = (month) => {
    // react스럽지 않다, 클릭했을 때
    changeMonth(month);
  };

  return (
    <Container>
      {months.map((month) => (
        <MonthBox
          key={month}
          $month={month}
          $curMonth={currentMonth}
          onClick={() => handleClickMonth(month)}
        >
          {month}월
        </MonthBox>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 40px;
  background-color: #577b8d;

  :hover {
    cursor: pointer;
  }
`;

const MonthBox = styled.div`
  width: 15%;
  height: 35%;
  border-radius: 10px;
  margin: 10px 5px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-weight: 600;
  background-color: ${(props) =>
    props.$month === props.$curMonth ? "#d8e8f0" : "white"};
`;

export default Month;
