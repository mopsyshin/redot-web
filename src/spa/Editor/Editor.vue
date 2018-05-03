<template>
  <div class="flex-container flex-align-center flex-sort-column">
    <p class="title">글 작성</p>
    <title-area/>
    <edit-area/>
  </div>
</template>

<script>
import TitleArea from './components/TitleArea';
import EditArea from './components/EditArea';

export default {
  name: 'Editor',
  components: {
    TitleArea,
    EditArea,
  },
};
</script>

<style lang="scss" scoped>
div {
  padding-top: 60px;
}

.title {
  width: 500px;
  text-align: left;
  font-size: 25px;
}
</style>
