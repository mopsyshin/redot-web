<template>
  <div class="dropdown-container">
    <div class="selected-item"
      @click="toggleDropdown"
      v-if="selectedItem !== ''">
      {{ selectedItem }}
      <img class="icn-down" src="@/assets/images/icn-down.svg" alt="">
    </div>
    <div class="selected-item placeholder"
      @click="toggleDropdown"
      v-if="selectedItem == ''">
      {{ this.placeholder }}
      <img class="icn-down" src="@/assets/images/icn-down.svg" alt="">
    </div>
    <transition name="dropdown-animation" mode="out-in" appear>
      <div class="dropdown-list" v-if="dropdownState">
        <div class="dropdown-list-item"
            v-for="item in items"
            :key="item.key"
            @click="selectItem(item)">
            {{ item }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['items', 'placeholder'],
  data() {
    return {
      selectedItem: '',
      dropdownState: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownState = !this.dropdownState;
    },
    selectItem(item) {
      this.selectedItem = item;
      this.dropdownState = false;
      this.$emit('itemSelected', item);
    },
  },
};

</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.dropdown-container {
    .selected-item {
        display: inline-block;
        min-width: 180px;
        width: 100%;
        padding: 8px 10px;
        cursor: pointer;
        &.placeholder {
          color: $light-grey2;
        }
        .icn-down {
            position: relative;
            top: 5px;
            float: right;
        }
    }
    .dropdown-list {
        position: absolute;
        z-index: 1000;
        box-shadow: $shadow-2;
        width: calc(100% - 32px);
        .dropdown-list-item {
            min-width: 180px;
            width: 100%;
            padding: 12px 10px;
            background-color: $white;
            cursor: pointer;
            &:hover {
                background-color: $light-grey4;
            }
        }
    }
}
</style>
