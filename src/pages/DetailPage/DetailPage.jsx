import styled from "styled-components";
import RecordDetailForm from "../../components/RecordDetailForm";

function RecordDetailPage() {
  return (
    <Container>
      <RecordDetailForm />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 97vh;
  margin: 0 auto;
`;
export default RecordDetailPage;
