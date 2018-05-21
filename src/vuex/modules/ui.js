const ui = {
  state: {
    AddChannelState: false,
  },
  mutations: {
    toggleAddChannel(state) {
      state.AddChannelState = !state.AddChannelState;
    },
  },
};

export default ui;
