import styled from "styled-components";

function FormInput({
  label,
  value,
  id,
  type,
  placeholder,
  onChange: handleChangeValue,
}) {
  return (
    <>
      <LabelStyle htmlFor={id}>{label}</LabelStyle>
      <InputStyle
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeValue}
      />
    </>
  );
}

const LabelStyle = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: white;
`;

const InputStyle = styled.input`
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

export default FormInput;
