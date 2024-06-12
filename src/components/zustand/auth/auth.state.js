// state.js

export const initialState = {
  isAuthenticated: false,
};

export const actions = (set) => ({
  login: (token) => {
    localStorage.setItem("accessToken", token);
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isAuthenticated: false });
  },
});
