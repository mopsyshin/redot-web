const mixin = {
  data() {
    return {
      mixinData: 1,
    };
  },
  computed: {
    user() {
      return this.$store.state.accountStore.user;
    },
  },
};

export default mixin;
