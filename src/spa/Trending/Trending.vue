<template>
  <div class="container-trending">
    <SectionHeader :content="sectionHeaderContent"/>
    <div v-masonry transition-duration="0.3s"
         item-selector=".post-card-item" class="post-list">
      <PostCard v-masonry-tile class="post-card-item"
                v-for="post in posts"
                v-if="postReady"
                :key="post.key"
                :post="post"/>
      <div v-masonry-tile class="post-card-item skeleton"
                v-if="!postReady"
                v-for="(item, index) in 12"
                :key="index">
        <div class="channel"></div>
        <div class="title1"></div>
        <div class="title2"></div>
        <div class="image" :style="{height : randomNumber() + 'px' }" v-if="index % 3 !== 1"></div>
        <div class="author"></div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from '@/commons/components/SectionHeader';
import PostCard from '@/commons/components/PostCard';
import Vue from 'vue';
import { VueMasonryPlugin } from 'vue-masonry';
import _ from 'lodash';
import db from '../../firebase';


Vue.use(VueMasonryPlugin);

export default {
  name: 'Trending',
  data() {
    return {
      sectionHeaderContent: {
        title: 'Trending Posts',
        funcIcon: 'setting',
      },
      postReady: false,
      posts: [],
    };
  },
  created() {
    this.getPosts();
    document.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll, false);
  },
  methods: {
    randomNumber() {
      const random = Math.floor(Math.random() * 80) + 30;
      return random;
    },
    getPosts() {
      this.postReady = false;
      const first = db.collection('post_list_thumb').orderBy('post_created_date', 'desc').limit(20);
      first.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.posts.push(doc.data());
        });
      }).then(() => {
        this.postReady = true;
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
      this.next.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.posts.push(doc.data());
        });
      });
      return this.next.get().then((querySnapshot) => {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.next = db.collection('post_list_thumb')
          .orderBy('post_created_date', 'desc')
          .startAfter(lastVisible)
          .limit(20);
      }).catch((err) => {
        const message = '마지막 포스트입니다';
        console.log(message, err);
      });
    },

    // 한번 스크롤을 감지한 이후엔 300ms 이후 스크롤을 감지합니다
    onScroll: _.debounce(() => {
      let scrOfY = 0;
      let docHeight = 0;
      let winHeight = 0;
      let currentScroll = 0;
      let pos = 0;
      function getScrollY() {
        if (typeof (window.pageYOffset) === 'number') {
          // Netscape compliant
          scrOfY = window.pageYOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
          // DOM compliant
          scrOfY = document.body.scrollTop;
        } else if (document.documentElement && (document.documentElement.scrollLeft
          || document.documentElement.scrollTop)) {
          // IE6 standards compliant mode
          scrOfY = document.documentElement.scrollTop;
        }
        return scrOfY;
      }
      docHeight = document.body.offsetHeight;
      winHeight = window.innerHeight;
      currentScroll = getScrollY();
      pos = docHeight - (winHeight + currentScroll);
      if (pos < 100) {
        this.loadmore();
      }
    }, 100),
  },
  components: {
    SectionHeader,
    PostCard,
  },
};

</script>

<style lang='scss' scoped>
@import '@/global-style/variables.scss';
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
