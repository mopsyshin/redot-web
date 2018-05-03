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
<<<<<<< HEAD:src/spa/Channel/Channel.vue

<style lang="scss" scoped>
@import '@/global-style/variables.scss';

</style>
=======
>>>>>>> ef90c000a50749eefd3bb0b72fe38e7d33f95f7a:src/spa/channel/Channel.vue
