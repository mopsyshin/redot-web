<template>
  <div class="container-channel">
    <SectionHeader :content="sectionHeaderContent"/>
  </div>
</template>

<script>
import SectionHeader from '@/shared-components/SectionHeader';

export default {
  name: 'channel',
  data() {
    return {
      sectionHeaderContent: {
        title: 'Channels',
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
