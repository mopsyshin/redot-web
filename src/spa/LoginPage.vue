<template>
  <div class="login-page">
    <div class="header flex-container flex-align-center"
          :class="{ small: signUpState }">
      <img src="@/assets/images/img-logo.svg">
    </div>
    <div class="input-field">
      <input type="e-mail"
            placeholder="your-mail@redot.com"
            v-model="email"
            @keyup.enter="signIn">
    </div>
    <div class="input-field" v-if="signUpState">
      <input type="text"
            placeholder="Nickname"
            v-model="username"
            @keyup.enter="signIn">
      <div class="err-msg" v-if="username.length < 3 &&
                                username !== '' && signUpState === true">
        닉네임은 3자 이상으로 해줘
      </div>
    </div>
    <div class="input-field">
      <input type="password"
            placeholder="Password"
            v-model="pwd"
            @keyup.enter="signIn">
      <div class="err-msg" v-if="pwd.length < 6 && pwd !== '' && signUpState === true">
        비밀번호는 6자 이상으로 해줘
      </div>
    </div>
    <div class="input-field" v-if="signUpState">
      <input type="password"
            placeholder="Confirm Password"
            v-model="pwdConfirm"
            @keyup.enter="register">
      <div class="err-msg" v-if="pwd !== pwdConfirm && pwdConfirm !== '' && signUpState === true">
        지 비밀번호도 똑같이 못치냐
      </div>
    </div>
    <div class="input-field" v-if="errMsg !== ''">
      <div class="err-msg">
        {{ errMsg }}
      </div>
    </div>
    <div class="input-field">
      <button class="btn-sign-in"
              @click="signIn"
              v-if="!signUpState"
              :disabled="email === '' || pwd === '' || submitProcess">
        Sign in
      </button>
      <button class="btn-sign-in"
              @click="register"
              v-if="signUpState"
              :disabled="email === '' || pwd === '' || pwd.length < 6 ||
                        pwdConfirm === '' || pwd !== pwdConfirm || submitProcess ||
                        username.length < 3">
        Confirm
      </button>
      <button class="btn-sign-up"
              v-if="!signUpState"
              @click="toggleSignUpSate">
        Sign up
      </button>
      <button class="btn-sign-up"
              v-if="signUpState"
              @click="toggleSignUpSate">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { db, auth } from '@/firebase';
import moment from 'moment';

export default {
  data() {
    return {
      email: '',
      username: '',
      pwd: '',
      pwdConfirm: '',
      errMsg: '',
      signUpState: false,
      submitProcess: false,
    };
  },
  methods: {
    signIn() {
      this.submitProcess = true;
      auth.signInWithEmailAndPassword(this.email, this.pwd).then(() => {
        this.$router.push({ name: 'trending' });
      }).catch((err) => {
        this.errMsg = err.code;
        this.submitProcess = false;
        switch (err.code) {
          case 'auth/wrong-password':
            this.errMsg = '비밀번호 틀림 ㅇㅇ';
            break;
          case 'auth/invalid-email':
            this.errMsg = '이메일도 똑바로 못쓰냐';
            break;
          case 'auth/user-not-found':
            this.errMsg = '가입한적 없는 이메일인데?';
            break;
          default:
            this.errMsg = err.code;
            break;
        }
      });
    },
    toggleSignUpSate() {
      this.signUpState = !this.signUpState;
      this.errMsg = '';
    },
    register() {
      this.submitProcess = true;
      auth.createUserWithEmailAndPassword(this.email, this.pwd).then((user) => {
        user.updateProfile({
          displayName: this.username,
        }).then(() => {
          this.addUserToFirestore();
          this.submitProcess = false;
        }).catch((err) => {
          this.errMsg = err.code;
          this.submitProcess = false;
        });
      }).catch((err) => {
        this.submitProcess = false;
        switch (err.code) {
          case 'auth/email-already-in-use':
            this.errMsg = '이미 가입된 메일인데??';
            break;
          case 'auth/invalid-email':
            this.errMsg = '이메일도 똑바로 못쓰냐';
            break;
          case 'auth/weak-password':
            this.errMsg = '비밀번호는 6자리 이상으로 좀 해라';
            break;
          default:
            this.errMsg = err.code;
            break;
        }
      });
    },
    addUserToFirestore() {
      this.submitProcess = true;
      const ref = db.collection('user').doc();
      ref.set({
        user_name: this.username,
        user_email: this.email,
        user_created_date: moment().format('YYYY-MM-DD, HH:mm:ss'),
        user_dot: 0,
        user_uid: ref.id,
        user_follower: [],
        user_following: [],
        user_bookmark: [],
      }).then(() => {
        this.$router.push({ name: 'trending' });
        this.submitProcess = false;
      }).catch((err) => {
        this.errMsg = err.code;
        this.submitProcess = false;
      });
    },
  },
};

</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';

.login-page {
  z-index: 50;
  height: 100vh;
  overflow: scroll;
  background-color: $white;
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
}
</style>
