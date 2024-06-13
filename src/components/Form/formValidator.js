import Swal from "sweetalert2";

export const validateFormData = (formData) => {
  const { date, amount, spendItem, spendDetail } = formData;

  if (!isTextExistValid({ date, amount, spendItem, spendDetail })) {
    Swal.fire({
      title: "Error!",
      text: "모든 값을 입력해주세요.",
      icon: "error",
    });
    return false;
  }
  if (!isAmountVailid(amount)) {
    Swal.fire({
      title: "Error!",
      text: "금액은 숫자만 입력해주세요.",
      icon: "error",
    });
    return false;
  }
  if (!isDateValid(date)) {
    Swal.fire({
      title: "Error!",
      text: "날짜는 YYYY-MM-DD 형식으로 입력해주세요(ex, 2024-05-24)",
      icon: "error",
    });
    return false;
  }

  return true;
};

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
