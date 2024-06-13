// store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  isAuthenticated: false,
  curUserInfo: {},
};

const actions = (set) => ({
  signIn: (info) => {
    set({ isAuthenticated: true, curUserInfo: info });
  },
  signOut: () => {
    set({ isAuthenticated: false, curUserInfo: {} });
  },
});

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

// 요청 로그인 했을 때만 가능
// 어볼트컨트롤러 요철을 중간에 멈추게하는 도구
// 인터셉터를 사용하려면
