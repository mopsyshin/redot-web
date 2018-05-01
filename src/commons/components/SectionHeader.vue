<template>
  <div class="section-title-wrapper">
    <div class="title">
      {{ content.title }}
    </div>
    <div class="section-right">
      <button class="btn-filter" v-if="content.funcIcon == 'setting'">
        <img src="@/assets/gnb-setting.svg" alt="">
      </button>
      <button class="btn-filter" v-if="content.funcIcon == 'more'">
        <img src="@/assets/post-more.svg" alt="">
      </button>
      <button class="btn-filter" v-if="content.funcIcon == 'down'">
        <img src="@/assets/icn-down.svg" alt="">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: ['content'],
};

</script>

<style lang="scss" scoped>
  .section-title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px 4px 16px;
    .title {
      font-size: 1.8rem;
      font-weight: 900;
    }
    .section-right {
      display: flex;
      align-items: center;
    }
  }
</style>
