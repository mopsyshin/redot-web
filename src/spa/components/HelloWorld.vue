<template>
  <div class="container">
    <h1>
      안녕하세요.
    </h1>
    <h2>
      새로운 어플리케이션 프로젝트를 만드셨습니다.
    </h2>
    <a href="https://github.com/Reedot/redot-web">
      <p>저장소로 바로 가기</p>
    </a>
    <router-link to="/edit">
      <p>Post 페이지로 가기</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
};
</script>

<style lang="scss" src="./HelloWorld.scss"></style>
