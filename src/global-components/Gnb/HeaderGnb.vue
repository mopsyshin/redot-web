<template>
  <div class="container-header-gnb">
    <div class="gnb-left">
      <div class="wrapper-search-input">
        <img src="@/assets/gnb-search.svg">
        <input type="text" placeholder="Channels, Users and Posts">
      </div>
    </div>
    <div class="gnb-right">
      <img src="@/assets/icn-menu.svg" @click="toggleSideBar">
    </div>
    <SideBar v-show="sideBarState"/>
  </div>
</template>

<script>
import SideBar from './components/SideBar';

export default {
  name: 'HeaderGnb',
  data() {
    return {
      sideBarState: false,
    };
  },
  methods: {
    toggleSideBar() {
      this.sideBarState = !this.sideBarState;
    },
  },
  components: {
    SideBar,
  },
};

</script>

<style lang="scss" scoped>
@import '@/global-style/variables.scss';
.container-header-gnb {
  position: fixed;
  top:0;
  left:0;
  z-index: 10000;
  background-color: $white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 56px;
  box-shadow: 0px 10px 20px 0px rgba(255,255,255,1);
  .gnb-left, .gnb-right {
      display: flex;
      align-items: center;
  }
  .gnb-left {
      width: 85%;
  }
  .wrapper-search-input {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 1058px;
      height: 38px;
      background-color: #f8f8f8;
      border-radius: 100px;
      padding: 7px 16px;
      input {
          background-color: transparent;
          border: none;
          width: calc(100% - 32px);
          font-size: 14px;
          margin-left: 12px;
      }
  }
  .wrapper-search-input {
      input::placeholder {
          color: #bbb;
      }
      input:focus {
          outline: none;
      }
  }
  .login-state {
      & > div {
          cursor: pointer;
          margin-left: 5px;
      }
      span {
          cursor: pointer;
      }
      .user-box {
          display: flex;
          align-items: center;
          cursor: pointer;
          height: 38px;
          background-color: #fff;
          transition: all 0.3s;
          border-radius: 30px;
          box-sizing: border-box;
          padding: 0 14px;
          &:hover {
            @include background-hover;
          }
      }
      .user-icon-box {
          display: inline-block;
          width: 25px;
          height: 25px;
          margin-left: 5px;
          background-image: url(../../assets/user-img.png);
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: $shadow-2;
          border-radius: 30px;
      }
      .wrapper-noti {
          display: flex;
          position: relative;
          width: 38px;
          height: 38px;
          button {
              border-radius: 100px;
              &:hover {
                  @include background-hover;
              }
              img {
                  position: relative;
                  top: 2px;
                  width: 20px;
              }
          }
          .noti-count {
              background-color: $point-red;
              color: #fff;
              font-weight: 600;
              font-size: 10px;
              line-height: 10px;
              padding: 3px 5px;
              border-radius: 10px;
              height: 14px;
              position: relative;
              right: 16px;
              top: 4px;
          }
      }
      .gnb-more {
          border-radius: 100px;
          width: 38px;
          height: 38px;
          &:hover {
              @include background-hover;
          }
      }
  }
  .logout-state {
      span {
          margin: 5px;
          cursor: pointer;
          &.btn-signin {
          font-weight: 800;
          }
      }
  }
}
</style>

