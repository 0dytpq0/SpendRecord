import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { changeMonth } from "../../redux/slices/record.slice";

function Month() {
  const months = Array.from({ length: 12 }, (_, index) => index + 1 + "월");
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.record);

  const handleClickMonth = (e) => {
    const month = e.target.innerHTML.replace("월", "");
    const action = changeMonth(Number(month));
    dispatch(action);
  };

  const monthLists = () =>
    months.map((item) => {
      return (
        <MonthBox
          key={uuid()}
          $month={Number(item.replace("월", ""))}
          $curMonth={selector.month}
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
