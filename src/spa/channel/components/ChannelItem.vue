<template>
  <div class="container-channel-item">
    <div class="channel-item">
      <div class="flex-container flex-align-center-between">
        <div :class="{ emphasys : index < 3}">
          <span class="rank-number">
            {{ index + 1 }}
          </span>
          <span class="channel-name">
            @{{ content.channel_name }}
          </span>
        </div>
        <div class="channel-score">
          {{ content.channel_score }}
        </div>
      </div>
      <div>
        <div class="score-bar" :style="{ 'background-color' : content.channel_color }">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['content', 'index'],
};

</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.channel-item {
  padding: 12px 16px;
}
.emphasys {
  font-size: 1.1rem;
  font-weight: 700;
}
.rank-number {
  display: inline-block;
  min-width: 24px;
}
.channel-name {
  padding-left: 8px;
}
.channel-score {
  font-size: 12px;
}
.score-bar {
  display: inline-block;
  margin-top: 4px;
  min-width: 20px;
  height: 8px;
  background-color: #000;
  border-radius: 10px;
}
</style>
