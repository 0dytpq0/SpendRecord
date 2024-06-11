import { configureStore } from "@reduxjs/toolkit";
import recordSlice from "./slices/record.slice";
// import recordReducer from "./reducers/record.reducer";

// const store = configureStore({
//   reducer: {
//     record: recordReducer,
//   },
// });

const store = configureStore({
  reducer: {
    record: recordSlice,
  },
});

export default store;
