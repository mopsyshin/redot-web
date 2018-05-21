<template>
  <div class="container-add-channel">
    <div class="upload-header flex-container flex-align-center-between">
      <button class="btn-cancel"
        @click="cancelAddChannel">
        취소
      </button>
      <button class="btn-submit"
        @click="addChannel"
        :disabled="channelName === ''">
        완료
      </button>
    </div>
    <div class="wrapper-channel-preview">
      <div class="channel-preview"
          :style="{ 'background-color': selectedColor }">
        @{{ channelName }}
      </div>
    </div>
    <div class="input-field">
      <input type="text"
            placeholder="Channel Name"
            v-model="channelName">
      <div class="err-msg" v-if="channelName.length < 3 && channelName !== ''">
        채널 이름은 최대 15자까지만
      </div>
    </div>
    <div class="input-field">
      <input type="text"
            placeholder="Channel Description"
            v-model="channelDesc">
      <div class="err-msg" v-if="channelDesc.length < 3 && channelDesc !== ''">
        채널 이름은 최대 15자까지만
      </div>
    </div>
    <div class="common-input-area">
      <div class="label">채널 대표색상 선택</div>
      <div class="wrapper-color-select">
        <div class="color-item"
        v-for=" (color, index) in colors"
        :key="index"
        :color="color"
        :style="{ backgroundColor : color }"
        @click="selectColor(color)"
        :class="{ selected : selectedColor === color }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from '@/shared-components/SectionHeader';
import moment from 'moment';
import { db } from '@/firebase';

export default {
  data() {
    return {
      colors: [
        '#E6132B', '#FF3145', '#FF4E5F', '#FF6675', '#FF828E',
        '#E2126C', '#EF217A', '#FF3C90', '#FF59A1', '#FF73B0',
        '#970BCA', '#A71ADB', '#B02FE0', '#B847E1', '#BD58E2',
        '#4000D9', '#571BE5', '#652DE9', '#7541F0', '#8556F5',
        '#004FAE', '#065DC5', '#156DD6', '#3284E6', '#4C95ED',
        '#006485', '#0E789C', '#177FA2', '#2099C2', '#22A9D6',
        '#00B9BA', '#14CACC', '#20D6D7', '#31DFE1', '#00BD98',
        '#43BE57', '#4ECC62', '#57DE6D', '#63E878', '#80A900',
        '#96C20D', '#A0CD12', '#A6D317', '#B3E21F', '#D9D300',
        '#ECE600', '#F6EF05', '#EEA700', '#FFB300', '#FFBA16',
        '#EB6300', '#FF6C00', '#FF7917', '#FF842A', '#000000',
        '#222222', '#444444', '#666666', '#888888', '#aaaaaa',
      ],
      selectedColor: '#ff0000',
      channelName: '채널이름입력',
      channelDesc: '',
      sectionHeaderContent: {
        title: 'Add Channel',
        funcIcon: 'nope',
      },
    };
  },
  computed: {
    channelCreator() {
      return this.userInfo.user_name;
    },
  },
  methods: {
    cancelAddChannel() {
      this.unlockBackground();
      this.$store.commit('toggleAddChannel');
    },
    addChannel() {
      const ref = db.collection('channel').doc();
      ref.set({
        channel_id: ref.id,
        channel_admin: this.channelCreator,
        channel_name: this.channelName,
        channel_color: this.selectedColor,
        channel_desc: this.channelDesc,
        channel_created_date: moment().format('YYYY-MM-DD, HH:mm:ss'),
        channel_score: 0,
        channel_post_count: 0,
      }).then(() => {
        this.$router.push({ name: 'channel' });
        this.$store.commit('toggleAddChannel');
        this.$store.dispatch('getChannels');
      });
    },
    selectColor(color) {
      this.selectedColor = color;
    },
  },
  components: {
    SectionHeader,
  },
};

</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.container-add-channel {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: scroll;
  background-color: $white;
  z-index: 50;
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
  .wrapper-channel-preview {
    padding: 16px 24px;
    .channel-preview {
      display: inline-block;

    }
  }
  .header {
    height: 38vh;
    min-height: 200px;
    transition: all 0.3s;
    &.small {
      height: 20vh;
      min-height: 100px;
      img {
        width: 25%;
      }
    }
    img {
      width: 50%;
      transition: all 0.3s;
    }
  }
  .input-field {
    padding: 12px 16px;
    input {
      padding: 12px 16px;
      font-size: 16px;
      width: 100%;
      border-bottom: 1px solid $light-grey3;
    }
    button {
      margin: 8px 0px;
      font-size: 16px;
      font-weight: 700;
      border-radius: 48px;
      background-color: $dark-grey2;
      color: $white;
      width: 100%;
      height: 48px;
      &:disabled {
        background-color: $light-grey3;
      }
    }
    .btn-sign-in {
      background-color: $dark-grey2;
      color: $white;
    }
    .btn-sign-up {
      border: 1px solid $dark-grey2;
      background-color: $white;
      color: $dark-grey2;
    }
    .err-msg {
      font-size: 14px;
      padding: 6px 16px;
      color: $point-red;
    }
  }
  .channel-preview {
    color: $white;
    font-weight: 700;
    padding: 8px 24px 4px;
    border-radius: 24px;
  }
  .common-input-area {
    padding: 24px;
    .label {
      font-size: 1.4rem;
      padding: 16px 0px;
    }
    .wrapper-color-select {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .color-item {
        width: 36px;
        height: 36px;
        border-radius: 40px;
        margin: 6px;
        cursor: pointer;
        &:hover {
          transform: scale(1.2);
        }
        &.selected {
          transform: scale(1.2);
        }
        &:before {
          position: absolute;
          transform: translate( -3px, -3px);
          content: '';
          width: 40px;
          height: 40px;
          border-radius: 42px;
        }
        &.selected:before {
          border: 1px solid #000;
        }
      }
    }
  }
}
</style>
