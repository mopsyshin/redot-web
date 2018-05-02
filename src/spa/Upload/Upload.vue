<template>
  <div class="container-upload">
    <SectionHeader :content="sectionHeaderContent"/>
  </div>
</template>

<script>
import SectionHeader from '@/commons/components/SectionHeader';

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

<style lang="scss" scoped>
@import '@/global-style/variables.scss';

</style>
