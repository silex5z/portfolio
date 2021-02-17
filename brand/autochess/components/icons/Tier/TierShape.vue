<template>
  <svg
    width="20"
    height="23"
    viewBox="0 0 20 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :fill="fillColor" d="M0 0H20V18.0561L10 23L0 18.0561V0Z" />
  </svg>
</template>

<script>
export default {
  props: {
    fillColor: {
      type: String,
      default: '#EB9C00',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
