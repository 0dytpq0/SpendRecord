function Input({ value, id, type, placeholder, onChange: handleChangeValue }) {
  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeValue}
      />
    </>
  );
}

export default Input;
