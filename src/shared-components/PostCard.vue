<template>
  <div class="container-card">
    <div class="card-header">
      <div class="channel-name" :style="{color : post.post_channel_color}">
        @{{ post.post_channel_name }}
      </div>
      <div class="more">
        <!-- <img src="@/assets/post-more.svg" alt=""> -->
      </div>
    </div>
    <div class="card-body" @click="toPostDetail">
      <div class="card-title">
        {{ post.post_title.slice(0, 30) }}
        <span class="comment-count">[{{ post.post_comment_count }}]</span>
      </div>
      <div class="card-image">
        <img :src="post.post_thumb_image" alt="" v-show="!post.post_thumb_image == ''">
      </div>
    </div>
    <div class="card-user-name">
      by <span class="user-name">{{ post.post_user_name }}</span>
    </div>
    <div class="card-footer">
      <div class="date">
        <!-- 3 hours ago -->
      </div>
      <div class="like">
        <span class="like-count">{{ likeCount }}</span>
        <img class="btn-heart"
        src="@/assets/images/icn-heart.svg"
        :class="{ active: heartState, 'pop': popState }"
        @click="toggleLike">
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';

export default {
  props: ['post'],
  data() {
    return {
      heartState: false,
      likeCount: 0,
      popState: false,
    };
  },
  mounted() {
    this.likeCount = this.post.post_like_count;
  },
  methods: {
    toPostDetail() {
      this.lockBackground();
      this.$router.push({ name: 'postdetail', params: { id: this.post.post_original_id } });
    },
    toggleLike() {
      this.popState = true;
      const id = this.post.post_id;
      const originalId = this.post.post_original_id;
      let currentLikeCount;
      if (!this.heartState) {
        this.likeCount = this.likeCount + 1;
        db.collection('post').doc(originalId).get().then((doc) => {
          currentLikeCount = doc.data().post_like_count + 1;
        })
          .then(() => {
            db.collection('post').doc(originalId).update({
              post_like_count: currentLikeCount,
            })
              .then(() => {
                console.log('update1-success');
              });
            db.collection('post_list_thumb').doc(id).update({
              post_like_count: currentLikeCount,
            })
              .then(() => {
                console.log('update2-success');
              });
          });
      }
      this.heartState = true;
      setTimeout(() => {
        this.popState = false;
      }, 200);
    },
  },
};

</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.container-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 4px;
    .channel-name {
      font-size: 0.8rem;
      font-weight: 700;
    }
  }
  .card-title {
    width: 80%;
    font-size: 1.2rem;
    line-height: 1.4rem;
    padding-bottom: 6px;
    .comment-count {
      font-size: 0.7rem;
      color: $light-grey1;
    }
  }
  .card-image {
    padding-bottom: 2px;
    img {
      width: 100%;
      border-radius: 8px;
      filter: brightness(1.1);
    }
  }
  .card-user-name {
    font-size: 0.8rem;
    margin-bottom: 0.6rem;
    color: $light-grey2;
    .user-name {
      font-weight: 700;
    }
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    .date {
      font-size: 0.7rem;
      color: $light-grey1;
    }
    .like {
      display: flex;
      align-items: center;
      .like-count {
        font-size: 0.8rem;
        color: $light-grey1;
        margin-right: 6px;
      }
      .btn-heart {
        filter: grayscale(1);
        opacity: 0.2;
        transition: all 0.2s;
        &.active {
          animation: likeit 0.2s;
          filter: none;
          opacity: 1;
        }
        &.pop {
          animation: popit 0.2s;
        }
      }
    }
  }
}
</style>
