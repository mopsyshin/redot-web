<template>
  <div class="container-post-detail">
    <div class="header">
      <div class="btn-back" @click="back">
        <img src="@/assets/images/icn-back.svg">
      </div>
      <div class="post-btn-set">
        <div class="btn">
          <img src="@/assets/images/post-link.svg">
        </div>
        <div class="btn">
          <img src="@/assets/images/post-scrap.svg">
        </div>
        <div class="btn">
          <img src="@/assets/images/post-more.svg">
        </div>
      </div>
    </div>
    <div class="post-title">
      {{ post_body }}
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';

export default {
  data() {
    return {
      post_body: '',
    };
  },
  created() {
    this.getContent();
  },
  methods: {
    back() {
      this.$router.push({ name: 'trending' });
    },
    getContent() {
      const postId = this.$route.params.id;
      const content = [];
      db.collection('post').doc(postId).get().then((doc) => {
        content.push(doc.data());
      })
        .then(() => {
          this.post_body = content[0].post_body;
        });
    },
  },
};

</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.container-post-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background-color: $white;
  padding-top: 64px;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 48px;
    background-color: $white;
    border-bottom: 1px solid $light-grey4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-back {
      width: 48px;
      height: 48px;
      @include flex-center;
    }
    .post-btn-set {
      @include flex-center;
      padding: 0px 8px;
      .btn {
        width: 40px;
        height: 36px;
        @include flex-center;
      }
    }
  }
}

</style>
