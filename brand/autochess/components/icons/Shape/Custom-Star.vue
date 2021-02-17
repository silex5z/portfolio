<template>
  <svg
    :width="width"
    :height="width"
    :viewBox="`0 0 ${width} ${width}`"
    :fill="bgColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :stroke="strokeColor"
      d="M5.23498 8.09125L5.08984 8.01102L4.94471 8.09125L2.39522 9.50057L2.88593 6.49228L2.91031 6.34284L2.80457 6.23447L0.712294 4.09005L3.59007 3.65037L3.74831 3.62619L3.81633 3.48128L5.08984 0.768065L6.36336 3.48128L6.43137 3.62619L6.58962 3.65037L9.46739 4.09005L7.37512 6.23447L7.26938 6.34284L7.29376 6.49228L7.78447 9.50057L5.23498 8.09125Z"
      stroke-width="0.6"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '11',
      required: false
    },
    bgColor: {
      type: String,
      default: 'none',
      required: false
    },
    strokeColor: {
      type: String,
      default: '#FFB900',
      required: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
