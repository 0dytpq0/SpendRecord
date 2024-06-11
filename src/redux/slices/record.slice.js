import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
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
    createData: (state) => {
      const dataObj = {
        date: state.date,
        amount: state.amount,
        spendItem: state.spendItem,
        spendDetail: state.spendDetail,
      };
      api.record.postRecord(dataObj);
      state.recordList = [dataObj, ...state.recordList];
    },

    deleteData: (state) => {
      api.record.deleteRecord(state.selectedItemId);
      const recordIdx = state.recordList.findIndex(
        (item) => item.id === state.selectedItemId
      );
      const deletedRecordList = state.recordList.splice(recordIdx, 1);

      state.recordList = deletedRecordList;
    },

    updateData: (state) => {
      const newData = {
        date: state.date,
        amount: state.amount,
        spendItem: state.spendItem,
        spendDetail: state.spendDetail,
      };

      const recordIdx = state.recordList.findIndex(
        (item) => item.id === state.selectedItemId
      );

      state.recordList[recordIdx] = newData;
      api.record.updateRecord(state.selectedItemId, newData);
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
    initRecords: (state, action) => {
      state.recordList = action.payload;
    },
    selectItem: (state, action) => {
      const selectedItem = state.recordList.filter(
        (item) => item.id === action.payload
      )[0];
      console.log("action.payload", action.payload);
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
  initRecords,
} = recordSlice.actions;

export default recordSlice.reducer;
