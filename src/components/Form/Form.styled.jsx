import styled from "styled-components";
import { Input } from "../Input";
import Label from "../Label";

export const LabelStyle = styled(Label)`
  font-size: 12px;
  font-weight: 500;
  color: white;
`;

const InputStyle = styled(Input)`
  width: 100%;
  height: 24px;
  padding: 3px;
  margin-top: 5px;
  border-radius: 10px;
  border: none;

  &:focus {
    outline: 2px solid #d8e8f0;
  }
`;

export default InputStyle;
