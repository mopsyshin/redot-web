<template>
  <div class="container-sidebar">
    sidebar
    <div class="dim"></div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
};

</script>

<style lang="scss" scoped>
@import '@/global-style/variables.scss';
.container-sidebar {
  position: fixed;
  .dim {
    position: fixed;
  }
}
</style>
