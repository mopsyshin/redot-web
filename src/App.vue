<template>
  <div id="app">
    <header-gnb/>
    <div class="container-main-view">
      <transition name="main-view-transition" appear>
        <router-view class="main-router-view"/>
      </transition>
    </div>
    <footer-gnb/>
  </div>
</template>

<script>
import HeaderGnb from './shared-components/gnb/HeaderGnb';
import FooterGnb from './shared-components/gnb/FooterGnb';

export default {
  name: 'App',
  components: {
    HeaderGnb,
    FooterGnb,
  },
};
</script>

<style lang="scss">
@import '@/assets/css/common.scss';

.container-main-view {
  width: 100vw;
  max-width: 768px;
  margin: 0 auto;
  margin-top:56px;
  .main-router-view {
    position: absolute;
    width: 100%;
    max-width: 768px;
  }
}
</style>
