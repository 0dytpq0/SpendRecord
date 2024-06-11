import styled from "styled-components";
import DetailForm from "../components/DetailForm";

function DetailPage() {
  return (
    <Div>
      <DetailForm />
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 97vh;
  margin: 0 auto;
`;
export default DetailPage;
