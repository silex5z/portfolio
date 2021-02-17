<template>
  <ul :class="[type, { multi__row: names.length >= 4 }]">
    <li v-for="(item, index) in names" :key="index">
      <img
        :src="require(`@/assets/img/icons/chess/en/${item}.jpg`)"
        :alt="`${item}  아이콘`"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
      required: false
    },
    names: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 40px;

  li {
    height: 34px;
    margin-left: 6px;

    &:first-child {
      margin-left: 0;
    }
  }
}

.three {
  flex-flow: wrap;
  max-height: none;

  &.multi__row {
    width: 114px;
  }

  li {
    &:nth-child(4n) {
      margin-left: 0;
    }
    &:nth-child(n + 4) {
      margin-top: 2px;
    }
  }
}

img {
  width: 34px;
  height: 34px;
  border-radius: 4px;
}

@media (max-width: 767px) {
  li {
    height: 24px;
  }
  img {
    width: 24px;
    height: 24px;
  }
}
</style>
