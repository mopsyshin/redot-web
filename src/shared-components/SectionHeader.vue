<template>
  <div class="section-title-wrapper">
    <div class="title">
      {{ content.title }}
    </div>
    <div class="section-right">
      <button class="btn-filter" v-if="content.funcIcon === 'setting'">
        <img src="@/assets/images/gnb-setting.svg">
      </button>
      <button class="btn-filter"
              v-if="content.funcIcon === 'more'">
        <img src="@/assets/images/post-more.svg">
      </button>
      <button class="btn-filter"
              @click="openAddChannel"
              v-if="content.funcIcon === 'add-channel'">
        채널 생성
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: ['content'],
  methods: {
    openAddChannel() {
      this.lockBackground();
      this.$store.commit('toggleAddChannel');
    },
  },
};

</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

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
    .btn-filter {
      font-size: 0.9rem;
      font-weight: 400;
      color: $active-blue;
    }
  }
}
</style>
