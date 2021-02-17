<template>
  <div class="bar__chart">
    <span
      v-for="(item, index) in rankings"
      :key="index"
      :style="`height: ${Math.round(item.num / 3.3)}px`"
      :class="item.isMax ? 'top' : ''"
      class="chart__item"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    nums: {
      type: Array,
      required: true
    }
  },
  computed: {
    rankings() {
      const maxNum = this.nums.slice().sort((a, b) => b - a)[0]
      const maxNumIndex = this.nums.findIndex((n) => n === maxNum)
      const result = this.nums.map((n, i) => ({
        num: n,
        isMax: i === maxNumIndex
      }))
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.bar__chart {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 0 9px;

  .chart__item {
    display: block;
    width: 6px;
    margin-left: 4px;
    border-radius: 1px;
    background-color: #c3cbd1;

    &:first-child {
      margin-left: 0;
    }

    &.top {
      background-color: #5383e8;
    }
  }
}
</style>
