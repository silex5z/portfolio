<template>
  <svg
    :width="`${size}px`"
    :height="`${size}px`"
    :viewBox="`${viewBox0} ${viewBox1} ${viewBox} ${viewBox}`"
    :movie-id="movieId"
  >
    <path
      :d="path"
      :fill="fill"
      :stroke="stroke"
      :stroke-linejoin="strokeLinejoin"
      :stroke-linecap="strokeLinecap"
      :stroke-width="strokeWidth"
      :movie-id="movieId"
    />
  </svg>
</template>

<script>
import icons from '@/assets/js/icons.json'

export default {
  name: 'Icon',
  props: {
    size: {
      type: Number,
      default: 24
    },
    viewBox0: {
      type: Number,
      default: 0
    },
    viewBox1: {
      type: Number,
      default: 0
    },
    viewBox: {
      type: Number,
      default: 24
    },
    name: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: '#fff'
    },
    stroke: {
      type: String,
      default: 'none'
    },
    strokeLinecap: {
      type: String,
      default: 'round'
    },
    strokeLinejoin: {
      type: String,
      default: 'round'
    },
    strokeWidth: {
      type: Number,
      default: 0
    },
    movieId: {
      type: String,
      default: ''
    }
  },
  computed: {
    path() {
      return icons[this.name]
    }
  }
}
</script>
