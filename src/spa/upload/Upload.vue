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
