import styled from "styled-components";
import RecordItem from "./RecordItem";

function Record() {
  return (
    <Container>
      <RecordItem />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default Record;
