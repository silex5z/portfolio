<template>
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :fill="bgColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 6.2L1.64886 7.23607L1.90768 4.67984L0.195774 2.76393L2.70687 2.22016L4 0L5.29313 2.22016L7.80423 2.76393L6.09232 4.67984L6.35114 7.23607L4 6.2Z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#758592',
      required: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
