<template>
  <div id="app">
    <HeaderGnb/>
    <div class="container-main-view">
      <transition name="main-view-transition" appear>
        <router-view class="main-router-view"/>
      </transition>
    </div>
    <FooterGnb/>
  </div>
</template>

<script>
import HeaderGnb from './global-components/Gnb/HeaderGnb';
import FooterGnb from './global-components/Gnb/FooterGnb';

export default {
  name: 'App',
  components: {
    HeaderGnb,
    FooterGnb,
  },
};
</script>

<style lang="scss">
@import './global-style/variables.scss';
@import './global-style/init.scss';
@import './global-style/animation.scss';
.container-main-view {
  .main-router-view {
    position: absolute;
    width: 100vw;
    max-width: 768px;
    margin: 0 auto;
    margin-top:56px;
  }
}
</style>
