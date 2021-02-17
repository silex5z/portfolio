<template>
  <span class="lineUp__icon">
    <img
      :src="require(`@/assets/img/icons/job/${name}.png`)"
      :alt="`${name} 아이콘`"
    />
    <Shape :num="num" />
  </span>
</template>

<script>
import Shape from './Shape'

export default {
  components: {
    Shape
  },
  props: {
    name: {
      type: String,
      required: true
    },
    num: {
      type: String,
      default: '1',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.lineUp__icon {
  margin-left: 11px;

  &:first-child {
    margin-left: 0;
  }
}
@media (max-width: 767px) {
  .lineUp__icon {
    margin-left: 8px;
  }
}
img {
  width: 20px;
}
</style>
