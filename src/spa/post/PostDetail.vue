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
    <div class="dummy-title" v-if="!contentState"></div>
    <div class="dummy-title short" v-if="!contentState"></div>
    <div class="post-title">
      {{ post_title }}
    </div>
    <div class="bar"></div>
    <div class="dummy-body" v-if="!contentState"></div>
    <div class="dummy-body short" v-if="!contentState"></div>
    <div class="dummy-body middle" v-if="!contentState"></div>
    <div class="post-body">
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
      post_title: '',
      contentState: false,
    };
  },
  created() {
    this.getContent();
  },
  methods: {
    back() {
      this.unlockBackground();
      this.$router.push({ name: 'trending' });
    },
    getContent() {
      this.contentState = false;
      const postId = this.$route.params.id;
      const content = [];
      db.collection('post').doc(postId).get().then((doc) => {
        content.push(doc.data());
      })
        .then(() => {
          this.post_body = content[0].post_body;
          this.post_title = content[0].post_title;
          this.contentState = true;
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
  .post-title {
    font-size: 2.2rem;
    width: 75%;
    padding: 4px 24px;
    line-height: 1.2;
    word-break: keep-all;
    word-wrap: break-word;
    transition: none;
  }
  .post-body {
    font-size: 0.9rem;
    width: 100%;
    padding: 4px 24px 100px;
    line-height: 1.6;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-line;
    transition: none;
  }
  .dummy-title {
    background-color: $light-grey4;
    height: 42px;
    width: 75%;
    border-radius: 16px;
    margin: 6px 24px 12px;
    animation: skeleton 3s infinite;
    &.short {
      width: 40%;
    }
  }
  .dummy-body {
    background-color: $light-grey4;
    height: 24px;
    width: 80%;
    border-radius: 16px;
    margin: 12px 24px;
    animation: skeleton 3s infinite;
    &.short {
      width: 30%;
    }
    &.middle {
      width: 50%;
    }
  }
  .bar {
    height: 1px;
    background-color: $light-grey3;
    width: calc(100% - 48px);
    margin: 24px auto 0px;
    transition: none;
  }
}

</style>
