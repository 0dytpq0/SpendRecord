// state.js

export const initialState = {
  isAuthenticated: false,
  curUserInfo: {},
};

export const actions = (set) => ({
  signIn: (token) => {
    localStorage.setItem("accessToken", token);
    set({ isAuthenticated: true });
  },
  signOut: () => {
    localStorage.removeItem("accessToken");
    set({ isAuthenticated: false, curUserInfo: {} });
  },
  setUserInfo: (data) => {
    set({ curUserInfo: data });
  },
});

// 요청 로그인 했을 때만 가능
// 어볼트컨트롤러 요철을 중간에 멈추게하는 도구
// 인터셉터를 사용하려면
