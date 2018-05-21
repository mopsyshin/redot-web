<template>
  <div class="container-trending" @scroll="onScroll">
    <SectionHeader :content="sectionHeaderContent"/>
    <div v-masonry transition-duration="0s"
         item-selector=".post-card-item" class="post-list">
      <transition-group name="card-animation" appear>
        <PostCard v-masonry-tile
                  class="post-card-item"
                  v-for="(post) in posts"
                  :key="post.post_id"
                  :post="post">
        </PostCard>
        <div v-masonry-tile
              class="post-card-item skeleton"
              v-for="(item, index) in 4"
              :key="index"
              v-if="!postReady">
          <div class="channel"></div>
          <div class="title1"></div>
          <div class="title2"></div>
          <div class="image" :style="{height : randomNumber() + 'px' }"
                            v-if="index % 3 !== 1"></div>
          <div class="author"></div>
          <div class="footer"></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import SectionHeader from '@/shared-components/SectionHeader';
import PostCard from '@/shared-components/PostCard';
import Vue from 'vue';
import { VueMasonryPlugin } from 'vue-masonry';
import { db } from '../../firebase';

Vue.use(VueMasonryPlugin);

export default {
  name: 'Trending',
  data() {
    return {
      sectionHeaderContent: {
        title: 'Recent Posts',
        funcIcon: 'nope',
      },
      postReady: false,
      posts: [],
      next: null,
    };
  },
  watch: {
    '$store.state.refreshCount': function () {
      this.$nextTick(() => {
        this.getPosts();
      });
    },
  },
  created() {
    this.getPosts();
  },
  methods: {
    randomNumber() {
      const random = Math.floor(Math.random() * 80) + 30;
      return random;
    },
    getPosts() {
      this.posts = [];
      this.$redrawVueMasonry();
      this.postReady = false;
      const first = db.collection('post_list_thumb').orderBy('post_created_date', 'desc').limit(20);
      first.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.posts.push(doc.data());
        });
      }).then(() => {
        this.postReady = true;
        setTimeout(() => {
          this.$redrawVueMasonry();
        }, 500);
      });
      return first.get().then((querySnapshot) => {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.next = db.collection('post_list_thumb')
          .orderBy('post_created_date', 'desc')
          .startAfter(lastVisible)
          .limit(20);
      });
    },
    loadmore() {
      this.$redrawVueMasonry();
      this.next.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.posts.push(doc.data());
        });
        this.$redrawVueMasonry();
      });
      return this.next.get().then((querySnapshot) => {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.next = db.collection('post_list_thumb')
          .orderBy('post_created_date', 'desc')
          .startAfter(lastVisible)
          .limit(20);
      }).catch((err) => {
        const message = '마지막 포스트입니다';
        console.log(message + err);
      });
    },
    onScroll: _.debounce(function () {
      let docHeight = 0;
      let winHeight = 0;
      let pos = 0;
      let target = 0;
      target = document.querySelector('.main-router-view').scrollTop;
      docHeight = document.querySelector('.post-list').offsetHeight;
      winHeight = window.innerHeight;
      pos = docHeight - (winHeight + target);
      console.log(pos);
      if (pos < 10) {
        this.loadmore();
      }
    }, 400),
  },
  components: {
    SectionHeader,
    PostCard,
  },
};

</script>

<style lang='scss' scoped>
@import '@/assets/css/variables.scss';
.container-trending {
  padding-bottom: 140px;
  .post-list {
    padding: 1.5%;
    .post-card-item {
      padding: 16px;
      box-shadow: 1px 2px 16px 0px rgba(0,0,0,0.06);
      border-radius: 14px;
      width: 46.5%;
      margin: 1%;
      &.skeleton {
      padding: 16px;
        div {
          background-color: #f0f0f0;
          border-radius: 100px;
          animation: skeleton 3s infinite;
        }
        .channel {
          height: 12px;
          width: 36px;
          margin-bottom: 8px;
        }
        .title1 {
            height: 22px;
            width: 130px;
            margin-bottom: 6px;
        }
        .title2 {
            height: 22px;
            width: 70px;
            margin-bottom: 8px;
        }
        .image {
          height: 80px;
          width: 100%;
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .author {
          height: 12px;
          width: 42px;
          margin-bottom: 12px;
        }
        .footer {
          width: 60px;
          height: 12px;
        }
      }
    }
  }
}
</style>
