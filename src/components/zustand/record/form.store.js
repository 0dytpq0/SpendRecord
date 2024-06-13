import { create } from "zustand";
import { persist } from "zustand/middleware";
import getToday from "../../../utils/getToday";
// 이렇게 나누더라도 파일을 하나로 하자.
const initialState = {
  month: new Date().getMonth() + 1,
  date: getToday(),
  amount: 0,
  spendItem: "",
  spendDetail: "",
};

const actions = (set) => ({
  changeMonth: (month) => set({ month }),
  changeValue: (type, content) => set(() => ({ [type]: content })),
  initFormData: () =>
    set({
      date: getToday(),
      amount: 0,
      spendItem: "",
      spendDetail: "",
    }),
  selectRecord: (record) => {
    set({
      selectedItemId: record.id,
      date: record.date,
      amount: record.amount,
      spendItem: record.spendItem,
      spendDetail: record.spendDetail,
    });
  },
});

const useFormStore = create(
  persist(
    (set) => ({
      ...initialState,
      ...actions(set),
    }),
    {
      name: "record-store",
      getStorage: () => localStorage,
    }
  )
);

export default useFormStore;
