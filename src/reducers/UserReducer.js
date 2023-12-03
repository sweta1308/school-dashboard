export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return { ...state, user: payload };
    case "SET_LOGGED_IN":
      return { ...state, isLoggedIn: payload };
    case "SET_AUTH_LOADING":
      return { ...state, isAuthLoading: payload };
    default:
      return state;
  }
};
