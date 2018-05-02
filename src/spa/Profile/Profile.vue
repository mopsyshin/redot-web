<template>
  <div class="container-profile">
    <SectionHeader :content="sectionHeaderContent"/>
  </div>
</template>

<script>
import SectionHeader from '@/commons/components/SectionHeader';

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

<style lang="scss" scoped>
@import '@/global-style/variables.scss';

</style>
