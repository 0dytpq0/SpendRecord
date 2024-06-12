import getToday from "../../../utils/getToday";

export const initialState = {
  recordList: [],
  month: new Date().getMonth() + 1,
  date: getToday(),
  amount: 0,
  spendItem: "",
  spendDetail: "",
  selectedItemId: "",
};

export const actions = (set) => ({
  changeMonth: (month) => set({ month }),
  changeValue: (type, content) => set(() => ({ [type]: content })),
  initFormData: () =>
    set({
      date: getToday(),
      amount: 0,
      spendItem: "",
      spendDetail: "",
    }),
  selectItem: (item) => {
    console.log("item", item);
    set({
      selectedItemId: item.id,
      date: item.date,
      amount: item.amount,
      spendItem: item.spendItem,
      spendDetail: item.spendDetail,
    });
  },
});
