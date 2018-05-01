<template>
  <div class="container-trending">
    <SectionHeader :content="sectionHeaderContent"/>
    <div v-masonry transition-duration="0.3s"
         item-selector=".post-card-item" class="post-list">
      <PostCard v-masonry-tile class="post-card-item"
                v-for="(item, index) in 24"
                :key="item.key"
                :index="index"/>
    </div>
  </div>
</template>

<script>
import SectionHeader from '@/commons/components/SectionHeader';
import PostCard from '@/commons/components/PostCard';
import Vue from 'vue';
import { VueMasonryPlugin } from 'vue-masonry';

Vue.use(VueMasonryPlugin);

export default {
  name: 'Trending',
  data() {
    return {
      sectionHeaderContent: {
        title: 'Trending Posts',
        funcIcon: 'setting',
      },
    };
  },
  components: {
    SectionHeader,
    PostCard,
  },
};

</script>

<style lang="scss" scoped>
@import '@/global-style/variables.scss';
.container-trending {
  padding-bottom: 140px;
  .post-list {
    padding: 1.5%;
  }
}
</style>
