// state.js

export const initialState = {
  isAuthenticated: false,
};

export const actions = (set) => ({
  signIn: (token) => {
    localStorage.setItem("accessToken", token);
    set({ isAuthenticated: true });
  },
  signOut: () => {
    localStorage.removeItem("accessToken");
    set({ isAuthenticated: false });
  },
});
