import styled from "styled-components";
import { v4 as uuid } from "uuid";
import useRecordStore from "../zustand/record/record.store";

function Month() {
  const months = Array.from({ length: 12 }, (_, index) => index + 1 + "월");
  const { changeMonth, month } = useRecordStore();

  const handleClickMonth = (e) => {
    const month = e.target.innerHTML.replace("월", "");
    changeMonth(Number(month));
  };

  const monthLists = () =>
    months.map((item) => {
      return (
        <MonthBox
          key={uuid()}
          $month={Number(item.replace("월", ""))}
          $curMonth={month}
          onClick={handleClickMonth}
        >
          {item}
        </MonthBox>
      );
    });

  return <Container key={uuid()}>{monthLists()}</Container>;
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
