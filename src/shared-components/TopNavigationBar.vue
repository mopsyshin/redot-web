<template>
  <header>
    <p>상단 네비게이션 바</p>
  </header>
</template>

<script>
export default {
  name: 'TopNavigationBar',
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.3);

  margin: 0;
  padding: 0;

  position: fixed;
}
</style>
