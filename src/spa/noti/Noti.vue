<template>
  <div class="container-noti">
    <SectionHeader :content="sectionHeaderContent"/>
  </div>
</template>

<script>
import SectionHeader from '@/shared-components/SectionHeader';

export default {
  data() {
    return {
      sectionHeaderContent: {
        title: 'Notification',
        funcIcon: 'setting',
      },
    };
  },
  components: {
    SectionHeader,
  },
};

</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';

</style>
