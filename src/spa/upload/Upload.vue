<template>
  <div class="container-upload">
    <div class="upload-header flex-container flex-align-center-between">
      <button class="btn-cancel"
        @click="closeUploadPage"
        v-if="!selectChannelState">
        취소
      </button>
      <button class="btn-cancel"
        @click="prevStep"
        v-if="selectChannelState">
        뒤로
      </button>
      <button class="btn-submit"
        @click="nextStep"
        :disabled="isEmpty"
        v-if="!selectChannelState">
        다음
      </button>
      <button class="btn-submit"
        @click="addPost"
        :disabled="isChannelSelected"
        v-if="selectChannelState">
        게시
      </button>
    </div>
    <div v-show="!selectChannelState">
      <div>
        <textarea class="title-textarea"
          placeholder="제목을 입력하세요"
          @keyup="catchTitle"
          v-model="postTitle"/>
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
    <div class="wrapper-select-channel"
          v-show="selectChannelState">
      <div class="section-title">
        Favorite Channels
      </div>
      <div class="channel-list">
        <div class="channel-item"
              v-for="channel in channels"
              :key="channel.index"
              @click="selectChannel(channel)"
              :style="channelItemState(channel.channel_name) ?
              { 'border-color': channel.channel_color, 'color': channel.channel_color } :
              { 'border-color': channel.channel_color,
              'background-color': channel.channel_color, 'color': '#ffffff' }">
          @{{ channel.channel_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { db, storage } from '../../firebase';

export default {
  name: 'Upload',
  data() {
    return {
      selectChannelState: false,
      selectedChannel: '',
      selectedChannelColor: '',
      postBody: '',
      images: null,
      bodyHeight: 200,
      titleHeight: 100,
      scrollLocked: false,
      lastPos: 0,
      postTitle: '',
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
    isEmpty() {
      if (this.postTitle === '' || this.postBody === '') {
        return true;
      }
      return false;
    },
    isChannelSelected() {
      if (this.selectedChannel === '') {
        return true;
      }
      return false;
    },
    userName() {
      return this.user.displayName;
    },
  },
  methods: {
    catchTitle() {
      console.log('type');
      if (this.postTitle.length > 30) {
        return false;
      }
      return true;
    },
    channelItemState(channelName) {
      if (this.selectedChannel === channelName) {
        return false;
      }
      return true;
    },
    selectChannel(channel) {
      this.selectedChannel = channel.channel_name;
      this.selectedChannelColor = channel.channel_color;
    },
    prevStep() {
      this.selectChannelState = false;
    },
    nextStep() {
      this.selectChannelState = true;
    },
    onScrollTextarea() {
      if (this.scrollLocked) {
        window.scrollTop = 0;
      }
    },
    onBlurTextarea() {
      console.log('blur');
      this.bodyHeight = window.innerHeight - 258;
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
      this.unlockBackground();
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
    successInit() {
      this.postTitle = '';
      this.postBody = '';
      this.selectChannelState = false;
      this.unlockBackground();
      this.$store.dispatch('toggleUploadPageState');
      this.$store.dispatch('refreshTrending');
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
              this.successInit();
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
            this.successInit();
          }).catch((err) => {
            console.log('err 2');
            console.log(err);
          });
        });
      }
    },
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
    border-bottom: 1px solid $light-grey4;
    .btn-submit {
      font-size: 1rem;
      color: $active-blue;
      &:disabled {
        color: $light-grey2;
      }
    }
    .btn-cancel {
      font-size: 1rem;
      color: $point-red;
    }
  }
  .wrapper-select-channel {
    width: 100%;
    padding: 16px 16px 8px 16px;
    .section-title {
      font-size: 1.8rem;
      font-weight: 700;
      padding-bottom: 0.4rem;
    }
    .channel-list {
      padding-bottom: 2rem;
      .channel-item {
        display: inline-block;
        padding: 10px 24px 7px;
        border-radius: 100px;
        margin: 6px;
        color: $white;
        font-weight: 700;
        border: 1px solid;
      }
    }
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
  .title-textarea {
    width: 75%;
    max-width: 300px;
    font-size: 2.2rem;
    line-height: 1.4;
    padding: 24px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    transition: all 0.3s;
    border: none;
    word-break: keep-all;
    word-wrap: break-word;
    background-color: transparent;
    -webkit-appearance: none;
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
