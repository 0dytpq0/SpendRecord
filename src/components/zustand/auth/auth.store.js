// store.js
import create from "zustand";
import { persist } from "zustand/middleware";
import { actions, initialState } from "./auth.state";

const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      ...actions(set),
    }),
    {
      name: "auth-store",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
