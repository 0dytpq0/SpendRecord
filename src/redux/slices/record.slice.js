import { createSlice } from "@reduxjs/toolkit";
import getToday from "../../utils/getToday";

const initialState = {
  recordList: [],
  month: new Date().getMonth() + 1,
  date: getToday(),
  amount: 0,
  spendItem: "",
  spendDetail: "",
  selectedItemId: "",
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
      console.log("action.payload", action.payload);
      state.selectedItemId = action.payload.id;
      state.date = action.payload.date;
      state.amount = action.payload.amount;
      state.spendItem = action.payload.spendItem;
      state.spendDetail = action.payload.spendDetail;
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
  initRecords,
} = recordSlice.actions;

export default recordSlice.reducer;
