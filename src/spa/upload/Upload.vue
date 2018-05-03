<template>
  <div class="container-upload">
    <SectionHeader :content="sectionHeaderContent"/>
  </div>
</template>

<script>
import SectionHeader from '@/shared-components/SectionHeader';

export default {
  name: 'Upload',
  data() {
    return {
      sectionHeaderContent: {
        title: 'Upload',
        funcIcon: 'none',
      },
    };
  },
  components: {
    SectionHeader,
  },
};

</script>
<<<<<<< HEAD:src/spa/Upload/Upload.vue

<style lang="scss" scoped>
@import '@/global-style/variables.scss';

</style>
=======
>>>>>>> ef90c000a50749eefd3bb0b72fe38e7d33f95f7a:src/spa/upload/Upload.vue
