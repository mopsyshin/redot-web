<template>
  <div class="container-footer-gnb">
    <div class="footer-gnb-item"
      @click="toRouter(gnbItem)"
      v-for="gnbItem in gnbItemList"
      :key="gnbItem.key">
      <img :src='"@/assets/" + gnbItem + "-on.svg"'
      :class="{active: gnbItem == currentTab}">
    </div>
  </div>
</template>

<script>
export default {
  nmae: 'FooterGnb',
  data() {
    return {
      gnbItemList: [
        'trending',
        'channel',
        'upload',
        'noti',
        'profile',
      ],
      currentTab: '',
    };
  },
  watch: {
    $route() {
      this.routeCheck();
    },
  },
  mounted() {
    this.routeCheck();
  },
  methods: {
    routeCheck() {
      let path = this.$route.path;
      path = path.slice(1);
      this.currentTab = path;
    },
    toRouter(targetUrl) {
      this.$router.push(targetUrl);
      this.currentTab = targetUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/common';

.container-footer-gnb {
  position: fixed;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 44px;
  border-top: 1px solid $light-grey4;
  background-color: $white;
  .footer-gnb-item {
    width: 20%;
    display: flex;
    justify-content: center;
    img {
      opacity: 0.4;
      transition: all 0.3s;
      &.active {
        opacity: 1;
      }
    }
  }
}
</style>
