const account = {
  state: {
    user: null,
    loginState: false,
    userInfo: [],
  },
  mutations: {
    setLoginState(state, payload) {
      state.loginState = payload.loginState;
    },
    setUser(state, payload) {
      state.user = payload.user;
      state.userInfo = payload.userInfo[0];
    },
  },
};

export default account;
