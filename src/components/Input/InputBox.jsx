import styled from "styled-components";

function InputBox({ children }) {
  return <InputBoxStyle>{children}</InputBoxStyle>;
}
const InputBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 20px;
  width: 20%;
`;
export default InputBox;
