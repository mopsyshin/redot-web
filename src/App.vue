<template>
  <div id="app">
    <Gnb/>
    <router-view/>
  </div>
</template>

<script>
import Gnb from './shared-components/Gnb/Gnb';

export default {
  name: 'App',
  components: {
    Gnb,
  },
};
</script>

<style lang="scss">
@import './global-style/variables.scss';
@import './global-style/init.scss';
@import './global-style/layout.scss';
@import './global-style/animation.scss';
@import './shared-components/Gnb/Gnb.scss';
</style>
