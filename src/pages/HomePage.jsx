import styled from "styled-components";
import Form from "../components/Form";
import Month from "../components/Month/Month";
import Record from "../components/Record/Record";

function HomePage() {
  return (
    <Div>
      <Form />
      <Month />
      <Record />
    </Div>
  );
}

const Div = styled.div`
  width: 800px;
  height: 800px;
  margin: 0 auto;
  padding: 12px 20px;
  border-radius: 20px;
  background-color: #d8e8f0;
`;

export default HomePage;
