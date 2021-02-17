<template>
  <div>
    <ul class="list">
      <li :class="num >= 1 && 'active'" class="item"></li>
      <li :class="num >= 3 && 'active'" class="item"></li>
      <li :class="num >= 5 && 'active'" class="item"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: String,
      default: '1',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  .item {
    width: 6px;
    height: 3px;
    margin-left: 1px;
    background: #c3cbd1;
    border-radius: 2px;

    &:first-child {
      margin-left: 0;
    }

    &.active {
      background: #ffb900;
    }
  }
}
</style>
