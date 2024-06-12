// store.js
import create from "zustand";
import { persist } from "zustand/middleware";
import { actions, initialState } from "./record.state";

const useRecordStore = create(
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

export default useRecordStore;
