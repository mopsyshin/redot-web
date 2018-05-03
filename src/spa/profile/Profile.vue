<template>
  <div class="container-profile">
    <SectionHeader :content="sectionHeaderContent"/>
  </div>
</template>

<script>
import SectionHeader from '@/shared-components/SectionHeader';

export default {
  name: 'Profile',
  data() {
    return {
      sectionHeaderContent: {
        title: 'Profile',
        funcIcon: 'setting',
      },
    };
  },
  components: {
    SectionHeader,
  },
};

</script>
<<<<<<< HEAD:src/spa/Profile/Profile.vue

<style lang="scss" scoped>
@import '@/global-style/variables.scss';

</style>
=======
>>>>>>> ef90c000a50749eefd3bb0b72fe38e7d33f95f7a:src/spa/profile/Profile.vue
