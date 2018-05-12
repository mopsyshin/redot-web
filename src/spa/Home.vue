<template>
  <div>
    <!-- <header-gnb/> -->
    <div class="container-main-view">
      <transition name="main-view-transition" appear>
        <router-view class="main-router-view"/>
      </transition>
    </div>
    <footer-gnb/>
    <transition name="downtoup" mode="out-in" appear>
      <UploadPage v-show="uploadPageState"/>
    </transition>
  </div>
</template>

<script>
// import HeaderGnb from '@/shared-components/gnb/HeaderGnb';
import FooterGnb from '@/shared-components/gnb/FooterGnb';
import UploadPage from '@/spa/upload/Upload';
import { db, auth } from '@/firebase';

export default {
  name: 'Home',
  computed: {
    uploadPageState() {
      return this.$store.state.uploadPageState;
    },
  },
  beforeCreate() {
    this.$store.dispatch('getChannels');
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.$router.push({ name: 'trending' });
          const userInfo = [];
          db.collection('user').where('user_name', '==', user.displayName).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              userInfo.push(doc.data());
            });
          })
            .then(() => {
              this.$store.commit({
                type: 'setUser',
                user,
                userInfo,
              });
              this.$store.commit({
                type: 'setLoginState',
                loginState: true,
              });
            });
        } else {
          this.$router.push({ name: 'login' });
          this.$store.commit({
            type: 'setLoginState',
            loginState: false,
          });
        }
      });
    },
  },
  components: {
    // HeaderGnb,
    FooterGnb,
    UploadPage,
  },
};
</script>

<style lang="scss">
@import '@/assets/css/common.scss';

.container-main-view {
  width: 100vw;
  max-width: 768px;
  margin: 0 auto;
  .main-router-view {
    position: absolute;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
  }
}
</style>
