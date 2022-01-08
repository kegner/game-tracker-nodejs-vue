const authenticationModule = {
  state: () => ({
    isLoggedIn: false,
    user: {},
    initialLoad: true
  }),
  mutations: {
    setUserData(state, payload) {
      state.isLoggedIn = true;
      state.user = payload;
      state.initialLoad = false;
    },
    clearUserData(state) {
      state.isLoggedIn = false;
      state.user = {};
      state.initialLoad = false;
    }
  },
  actions: {
    setUserData(state, payload) {
      state.commit("setUserData", payload);
    },
    clearUserData(state) {
      state.commit("clearUserData");
    }
  }
}

export default authenticationModule;