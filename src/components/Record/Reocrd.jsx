import { Link } from "react-router-dom";
import styled from "styled-components";
import useFormStore from "../zustand/record/form.store";

function Reocrd({ record }) {
  const { selectRecord } = useFormStore();
  const paintRecord = (record) => {
    return (
      <LinkDiv
        key={record.id}
        to={`/records/${record.id}`}
        onClick={() => {
          const dataObj = {
            id: record.id,
            date: record.date,
            amount: record.amount,
            spendItem: record.spendItem,
            spendDetail: record.spendDetail,
          };
          selectRecord(dataObj);
        }}
      >
        <ColFlexer>
          <div>{record.date}</div>
          <RowFlexer>
            <span>
              {record.spendItem} - {record.spendDetail}
            </span>
          </RowFlexer>
        </ColFlexer>
        <Amount>{Number(record.amount).toLocaleString()}원</Amount>
      </LinkDiv>
    );
  };

  return <>{paintRecord(record)}</>;
}
const LinkDiv = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #d8e8f0;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 10px;
  width: 95%;
  font-size: 16px;

  background-color: #577b8d;
  color: white;
  font-weight: 500;
  :hover {
    cursor: pointer;
  }
`;
const RowFlexer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  span {
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const ColFlexer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 85%;

  > div:first-child {
    margin-bottom: 5px;
  }
`;
const Amount = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default Reocrd;
