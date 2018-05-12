const mixin = {
  computed: {
    user() {
      return this.$store.state.accountStore.user;
    },
    loginState() {
      return this.$store.state.accountStore.loginState;
    },
  },
};

export default mixin;
