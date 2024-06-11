import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import getToday from "../../utils/getToday";

const initialSelectedItemId = uuid();

const initialState = {
  recordList: JSON.parse(localStorage.getItem("data")) ?? [],
  month: new Date().getMonth() + 1,
  date: getToday(),
  amount: 0,
  spendItem: "",
  spendDetail: "",
  selectedItemId: initialSelectedItemId,
};
const initializeFormData = (state) => {
  state.date = getToday();
  state.amount = 0;
  state.spendItem = "";
  state.spendDetail = "";
};
const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    createData: (state) => {
      const dataObj = {
        id: uuid(),
        date: state.date,
        amount: state.amount,
        spendItem: state.spendItem,
        spendDetail: state.spendDetail,
      };

      state.recordList = [dataObj, ...state.recordList];
      localStorage.setItem("data", JSON.stringify(state.recordList));
    },

    deleteData: (state) => {
      const filteredData = state.recordList.filter(
        (item) => item.id !== state.selectedItemId
      );
      // state.recordList -> slice, splice 그 자리의 값만 없애는 것 배여ㅑㄹ을 재생성 하지 않고 그 값을 직접 찾아가 조정하는 것!
      // 그것이 이머를 가장 찰 활용하는 방법
      state.recordList = filteredData;
      localStorage.setItem("data", JSON.stringify(filteredData));
    },

    updateData: (state) => {
      const newDataList = state.recordList.map((item) => {
        return item.id === state.selectedItemId
          ? {
              ...item,
              date: state.date,
              amount: state.amount,
              spendItem: state.spendItem,
              spendDetail: state.spendDetail,
            }
          : item;
      });
      state.recordList = newDataList;

      localStorage.setItem("data", JSON.stringify(newDataList));
    },

    changeMonth: (state, action) => {
      state.month = action.payload;
    },
    changeValue: (state, action) => {
      state[action.payload.type] = action.payload.content;
    },
    initFormData: (state) => {
      initializeFormData(state);
    },
    selectItem: (state, action) => {
      const selectedItem = state.recordList.filter(
        (item) => item.id === action.payload
      )[0];
      state.selectedItemId = action.payload;
      state.date = selectedItem.date;
      state.amount = selectedItem.amount;
      state.spendItem = selectedItem.spendItem;
      state.spendDetail = selectedItem.spendDetail;
    },
  },
});

export const {
  createData,
  deleteData,
  updateData,
  changeMonth,
  changeValue,
  initFormData,
  selectItem,
} = recordSlice.actions;

export default recordSlice.reducer;
