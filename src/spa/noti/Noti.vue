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
<<<<<<< HEAD:src/spa/Noti/Noti.vue

<style lang="scss" scoped>
@import '@/global-style/variables.scss';

</style>
=======
>>>>>>> ef90c000a50749eefd3bb0b72fe38e7d33f95f7a:src/spa/noti/Noti.vue
