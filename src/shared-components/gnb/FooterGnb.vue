<template>
  <div class="wrapper-gnb">
    <div class="container-footer-gnb">
      <div class="footer-gnb-item"
        @click="changeTab(gnbItem)"
        v-for="gnbItem in gnbItemList"
        :key="gnbItem.key">
        <img :src='"@/assets/images/" + gnbItem + "-on.svg"'
        :class="{active: gnbItem == currentTab}">
      </div>=
    </div>
  </div>
</template>

<script>
import Scroll from 'scroll-js';

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
    changeTab(targetUrl) {
      const scroll = new Scroll(document.body);
      if (targetUrl === 'upload') {
        this.$store.dispatch('toggleUploadPageState');
        this.lockBackground();
      } else if (targetUrl === 'trending' && this.currentTab === 'trending') {
        this.$store.dispatch('refreshTrending');
        scroll.to(0, 1);
      } else {
        this.$router.push({ name: targetUrl });
        this.currentTab = targetUrl;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.wrapper-gnb {
  position: fixed;
  width: 100vw;
  bottom: 0;
  left: 0;
  .container-footer-gnb {
    @include flex-around;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
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
}
</style>
