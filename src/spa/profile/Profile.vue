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
