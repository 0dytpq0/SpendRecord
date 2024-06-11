import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import { selectItem } from "../../redux/slices/record.slice";

function RecordItem() {
  const month = useSelector((state) => state.record.month);
  const dispatch = useDispatch();
  const { data: records } = useQuery({
    queryKey: ["records"],
    queryFn: () => api.record.getRecord(),
  });

  const paintRecords = () => {
    return records?.map((item) => {
      const itemMonth = Number(item.date.slice(5, 7));
      if (itemMonth === month) {
        return (
          <LinkDiv
            key={item.id}
            to={`/detailRecord/${item.id}`}
            onClick={() => {
              const action = selectItem(item.id);
              dispatch(action);
            }}
          >
            <ColFlexer>
              <div>{item.date}</div>
              <RowFlexer>
                <span>
                  {item.spendItem} - {item.spendDetail}
                </span>
              </RowFlexer>
            </ColFlexer>
            <Amount>{Number(item.amount).toLocaleString()}원</Amount>
          </LinkDiv>
        );
      }
    });
  };
  return <>{paintRecords()}</>;
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
export default RecordItem;
