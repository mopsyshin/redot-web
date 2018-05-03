<template>
  <div>
    <top-navigation-bar/>
    <hello-world/>
  </div>
</template>

<script>
import TopNavigationBar from '../shared-components/TopNavigationBar';
import HelloWorld from './components/HelloWorld';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    TopNavigationBar,
  },
};
</script>

<style lang="scss" scoped>

</style>
