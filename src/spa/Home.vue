<template>
  <div>
    <div class="container-main-view">
      <transition name="main-view-transition" appear>
        <keep-alive>
          <router-view class="main-router-view"/>
        </keep-alive>
      </transition>
    </div>
    <footer-gnb/>
    <transition name="downtoup" mode="out-in" appear>
      <UploadPage v-show="uploadPageState"/>
    </transition>
    <transition name="downtoup" mode="out-in" appear>
      <AddChannel v-show="AddChannelState"/>
    </transition>
    <transition name="rtl" appear>
      <router-view name="detailView" class="detail-router-view"></router-view>
    </transition>
  </div>
</template>

<script>
import FooterGnb from '@/shared-components/gnb/FooterGnb';
import UploadPage from '@/spa/upload/Upload';
import AddChannel from '@/spa/channel/AddChannel';
import { db, auth } from '@/firebase';

export default {
  name: 'Home',
  computed: {
    uploadPageState() {
      return this.$store.state.uploadPageState;
    },
    AddChannelState() {
      return this.$store.state.uiStore.AddChannelState;
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
    FooterGnb,
    UploadPage,
    AddChannel,
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
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    max-width: 768px;
    margin: 0 auto;
  }
}
</style>
