const mixin = {
  computed: {
    user() {
      return this.$store.state.accountStore.user;
    },
    userInfo() {
      return this.$store.state.accountStore.userInfo;
    },
    loginState() {
      return this.$store.state.accountStore.loginState;
    },
  },
  methods: {
    lockBackground() {
      const target = document.querySelector('.main-router-view');
      target.style.overflow = 'hidden';
      target.style.position = 'relative';
    },
    unlockBackground() {
      const target = document.querySelector('.main-router-view');
      target.style.overflow = 'auto';
      target.style.position = 'static';
    },
  },
};

export default mixin;
