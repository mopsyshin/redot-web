<template>
  <div class="container-upload">
    <div class="upload-header flex-container flex-align-center-between">
      <img src="@/assets/images/icn-close.svg" @click="closeUploadPage">
      <button class="btn-submit"
        @click="addPost"
        :disabled="isEmpty">
        게시
      </button>
    </div>
    <div class="wrapper-select-channel">
      <Dropdown :items="channel_names"
        :placeholder="'채널을 선택해주세요'"
        @itemSelected="channelSelected"/>
    </div>
    <div>
      <textarea class="body-textarea"
        placeholder="내용을 입력하세요"
        v-model="postBody"
        @blur="onBlurTextarea"
        @focus="onFocusTextarea"
        @scroll="onScrollTextarea"
        :style="{ height: bodyHeight + 'px' }"
        :class="{ emphasys: postBody.length < 30 }"/>
    </div>
    <div class="upload-footer flex-container flex-align-center-between">
      <div class="filebox">
        <label class="btn-upload-image" for="upload-image">
          <img src="@/assets/images/upload-img.svg">
          <span>사진/동영상 추가</span>
        </label>
        <input class="btn-upload-image-fake" id="upload-image"
          type="file"
          @change="getFile($event)">
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import SectionHeader from '@/shared-components/SectionHeader';
import Dropdown from '@/shared-components/Dropdown';
import { db, storage } from '../../firebase';


export default {
  name: 'Upload',
  data() {
    return {
      selectedChannel: '',
      selectedChannelColor: '',
      postBody: '',
      images: null,
      bodyHeight: 200,
      scrollLocked: false,
      lastPos: 0,
    };
  },
  computed: {
    channels() {
      return this.$store.state.channels;
    },
    channel_names() {
      const newArr = [];
      this.channels.forEach((item) => {
        newArr.push(item.channel_name);
      });
      return newArr;
    },
    postTitle() {
      const title = this.postBody;
      return title.slice(0, 20);
    },
    isEmpty() {
      if (this.selectedChannel === '' || this.postBody === '') {
        return true;
      }
      return false;
    },
    userName() {
      return this.user.displayName;
    },
  },
  methods: {
    onScrollTextarea() {
      if (this.scrollLocked) {
        window.scrollTop = 0;
      }
    },
    onBlurTextarea() {
      console.log('blur');
      this.bodyHeight = window.innerHeight - 170;
      this.scrollLocked = false;
      console.log(this.bodyHeight);
    },
    onFocusTextarea() {
      console.log('focus');
      this.bodyHeight = window.innerHeight - 170 - 258;
      this.scrollLocked = true;
      this.lastPos = 0;
      console.log(this.bodyHeight);
    },
    closeUploadPage() {
      this.$store.dispatch('toggleUploadPageState');
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    },
    getFile(event) {
      this.images = event.target.files[0];
    },
    channelSelected(chName) {
      this.selectedChannel = chName;
      this.channels.forEach((item) => {
        if (chName === item.channel_name) {
          this.selectedChannelColor = item.channel_color;
        }
      });
    },
    addPost() {
      const postRef = db.collection('post').doc();
      const postThumbRef = db.collection('post_list_thumb').doc();
      if (this.images !== null) {
        const storageRef = storage.ref();
        const file = this.images;
        const imageRef = storageRef.child(file.name);
        imageRef.put(file).then(() => {
          postRef.set({
            post_id: postRef.id,
            post_channel_color: this.selectedChannelColor,
            post_channel_name: this.selectedChannel,
            post_title: this.postTitle,
            post_body: this.postBody,
            post_user_name: this.userName,
            post_created_date: moment().format('YYYY-MM-DD, HH:mm:ss'),
            post_like_count: 0,
            post_deleted: false,
          }).then(() => {
            postThumbRef.set({
              post_original_id: postRef.id,
              post_id: postThumbRef.id,
              post_channel_color: this.selectedChannelColor,
              post_channel_name: this.selectedChannel,
              post_title: this.postTitle,
              post_user_name: this.userName,
              post_created_date: moment().format('YYYY-MM-DD, HH:mm:ss'),
              post_like_count: 0,
              post_deleted: false,
            }).then(() => {
              this.postBody = '';
              this.$store.dispatch('toggleUploadPageState');
              this.$store.dispatch('refreshTrending');
              document.body.style.overflow = 'auto';
              document.documentElement.style.overflow = 'auto';
            }).catch((err) => {
              console.log('err 1');
              console.log(err);
            });
          });
        });
      } else {
        postRef.set({
          post_id: postRef.id,
          post_channel_color: this.selectedChannelColor,
          post_channel_name: this.selectedChannel,
          post_title: this.postTitle,
          post_body: this.postBody,
          post_user_name: this.userName,
          post_created_date: moment().format('YYYY-MM-DD, HH:mm:ss'),
          post_like_count: 0,
          post_deleted: false,
        }).then(() => {
          postThumbRef.set({
            post_original_id: postRef.id,
            post_id: postThumbRef.id,
            post_channel_color: this.selectedChannelColor,
            post_channel_name: this.selectedChannel,
            post_title: this.postTitle,
            post_user_name: this.userName,
            post_created_date: moment().format('YYYY-MM-DD, HH:mm:ss'),
            post_like_count: 0,
            post_deleted: false,
          }).then(() => {
            this.postBody = '';
            this.$store.dispatch('toggleUploadPageState');
            this.$store.dispatch('refreshTrending');
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
          }).catch((err) => {
            console.log('err 2');
            console.log(err);
          });
        });
      }
    },
  },
  components: {
    SectionHeader,
    Dropdown,
  },
};

</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.container-upload {
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: $white;
  .upload-header {
    padding: 16px;
    border-bottom: 1px solid $light-grey3;
    .btn-submit {
      font-size: 1rem;
      color: $active-blue;
      &:disabled {
        color: $light-grey2;
      }
    }
  }
  .wrapper-select-channel {
    width: 100%;
    padding: 16px 16px 8px 16px;
  }
  .body-textarea {
    font-size: 1rem;
    line-height: 1.4;
    width: 100%;
    padding: 24px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    transition: all 0.3s;
    border: none;
    background-color: transparent;
    -webkit-appearance: none;
    &.emphasys {
      font-size: 1.4rem;
    }
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: $light-grey3;
    }
  }
  .upload-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    padding: 24px;
    border-top: 1px solid $light-grey4;
    .btn-upload-image-fake {
      opacity: 0;
      position: absolute;
    }
    .btn-upload-image {
      color: $light-grey1;
      width: 48px;
      height: 48px;
      span {
        padding-left: 8px;
      }
    }
  }
}
</style>
