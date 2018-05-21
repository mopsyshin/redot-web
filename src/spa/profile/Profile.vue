<template>
  <div class="container-profile">
    <SectionHeader :content="sectionHeaderContent"/>
    <div class="wrapper-button">
      <button @click="logout">logout</button>
    </div>
  </div>
</template>

<script>
import SectionHeader from '@/shared-components/SectionHeader';
import { auth } from '@/firebase';

export default {
  name: 'Profile',
  data() {
    return {
      sectionHeaderContent: {
        title: 'Profile',
        funcIcon: 'nope',
      },
    };
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$store.commit({
          type: 'setLoginState',
          loginState: false,
        });
        this.$store.commit({
          type: 'setUser',
          user: null,
          userInfo: [],
        });
        this.$router.push({ name: 'login' });
      });
    },
  },
  components: {
    SectionHeader,
  },
};

</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.wrapper-button {
  padding: 16px;
  button {
    width: 100%;
    height: 48px;
    color: $point-red;
    font-size: 16px;
    border: 1px solid $point-red;
    border-radius: 48px;
  }
}
</style>
