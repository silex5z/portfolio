<template>
  <div class="low__combine">
    <img
      :src="require(`@/assets/img/temp/${item1}.png`)"
      class="item__icon"
      alt
    />
    <img class="plus__icon" src="~@/assets/img/icons/symbol/plus.png" alt />
    <img
      :src="require(`@/assets/img/temp/${item2}.png`)"
      class="item__icon"
      alt
    />
  </div>
</template>

<script>
export default {
  props: {
    item1: {
      type: String,
      required: true
    },
    item2: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.low__combine {
  display: flex;
  justify-content: center;
  align-items: center;
}

.item__icon {
  width: 34px;
  height: 34px;
  margin: 0 4px;
}

.plus__icon {
  width: 6px;
  height: 6px;
}
</style>
