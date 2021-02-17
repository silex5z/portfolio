<template>
  <div class="three__star">
    <template v-if="rank === '1'">
      <template v-if="fixed">
        <Custom-Star />
        <Custom-Star />
      </template>
      <Custom-Star :bgColor="bgColor" />
    </template>
    <template v-if="rank === '2'">
      <template v-if="fixed">
        <Custom-Star />
      </template>
      <Custom-Star :bgColor="bgColor" />
      <Custom-Star :bgColor="bgColor" />
    </template>
    <template v-if="rank === '3'">
      <Custom-Star :bgColor="bgColor" />
      <Custom-Star :bgColor="bgColor" />
      <Custom-Star :bgColor="bgColor" />
    </template>
  </div>
</template>

<script>
import CustomStar from '@/components/icons/Shape/Custom-Star'
export default {
  components: {
    CustomStar
  },
  props: {
    rank: {
      type: String,
      required: true
    },
    fixed: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return {
      bgColor: '#FFB900'
    }
  }
}
</script>

<style lang="scss" scoped>
.three__star {
  display: flex;
  justify-content: center;
  margin-left: 2px;

  > svg {
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
