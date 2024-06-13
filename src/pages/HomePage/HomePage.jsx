import styled from "styled-components";
import Form from "../../components/Form";
import Month from "../../components/Month/Month";
import Records from "../../components/Record/Records";

function HomePage() {
  return (
    <Container>
      <Form />
      <Month />
      <Records />
    </Container>
  );
}

const Container = styled.div`
  width: 800px;
  height: 700px;
  margin: 0 auto;
  padding: 12px 20px;
  border-radius: 20px;
  background-color: #d8e8f0;
`;

export default HomePage;
