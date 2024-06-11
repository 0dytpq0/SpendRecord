const checkLength = (string) => {
  return string.length > 0;
};

const isTextExistValid = ({ date, amount, spendItem, spendDetail }) => {
  return (
    checkLength(date) &&
    checkLength(amount) &&
    checkLength(spendItem) &&
    checkLength(spendDetail)
  );
};

const isDateValid = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  return dateRegex.test(date);
};

const isAmountVailid = (amount) => {
  const amountRegex = /^\d+$/;

  return amountRegex.test(amount);
};

export { isAmountVailid, isDateValid, isTextExistValid };
