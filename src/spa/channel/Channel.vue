<template>
  <div class="container-channel">
    <SectionHeader :content="sectionHeaderContent"/>
    <ChannelItem v-for="(channel, index) in fullChannel"
      :key="channel.channel_id"
      :content="channel"
      :index="index"/>
  </div>
</template>

<script>
import SectionHeader from '@/shared-components/SectionHeader';
import ChannelItem from './components/ChannelItem';

export default {
  name: 'channel',
  data() {
    return {
      sectionHeaderContent: {
        title: 'Channels',
        funcIcon: 'nope',
      },
    };
  },
  computed: {
    fullChannel() {
      return this.$store.state.channels;
    },
  },
  components: {
    SectionHeader,
    ChannelItem,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.container-channel {
  padding-bottom: 140px;
}
</style>
