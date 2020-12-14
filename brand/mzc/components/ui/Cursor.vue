<template>
  <div
    :class="[
      'g-cursor',
      { 'g-cursor_hover': hover },
      { 'g-cursor_hide': hideCursor }
    ]"
  >
    <div :style="cursorCircle" class="g-cursor__circle"></div>
    <div ref="point" :style="cursorPoint" class="g-cursor__point"></div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      xChild: 0,
      yChild: 0,
      xParent: 0,
      yParent: 0,
      hover: false,
      hideCursor: true
    }
  },
  computed: {
    cursorCircle() {
      return `transform: translateX(${this.xParent}px) translateY(${this.yParent}px) translateZ(0) translate3d(0, 0, 0);`
    },
    cursorPoint() {
      return `transform: translateX(${this.xChild - 3}px) translateY(${this
        .yChild - 3}px) translateZ(0) translate3d(0, 0, 0);`
    }
  },
  mounted() {
    document.documentElement.style.setProperty('--width', '10px')

    document.addEventListener('mousemove', this.moveCursor)
    document.addEventListener('mouseleave', (e) => {
      this.hideCursor = true
    })
    document.addEventListener('mouseenter', (e) => {
      this.hideCursor = false
    })
    $('button').on('mouseenter', function() {
      $('.g-cursor').addClass('active')
      document.documentElement.style.setProperty('--width', '50px')
    })
    $('button').on('mouseleave', function() {
      $('.g-cursor').removeClass('active')
      document.documentElement.style.setProperty('--width', '10px')
    })
  },
  methods: {
    moveCursor(e) {
      const width = getComputedStyle(document.documentElement).getPropertyValue(
        '--width'
      )
      const widthNumber = width.slice(0, 2) / 2 - 5
      //   console.log(width)
      //   console.log(widthNumber / 2)
      this.xChild = e.clientX - widthNumber
      this.yChild = e.clientY - widthNumber
      setTimeout(() => {
        this.xParent = e.clientX - 24
        this.yParent = e.clientY - 24
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.g-cursor {
  &.active {
    .g-cursor__point {
      //   transform: scale(5);
      opacity: 0.4;
      transition-delay: 0.2s;
      transition: width 0.4s ease, height 0.4s ease;
      filter: contrast(1);
    }
    .g-cursor__circle {
      opacity: 0;
    }
  }
  &_hide {
    opacity: 0;
    width: 60px;
    height: 60px;
    transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
  }

  &__circle {
    pointer-events: none;
    user-select: none;
    top: 0;
    left: 0;
    position: fixed;
    width: 50px;
    height: 50px;
    border: 1px solid rgba($color: #fff, $alpha: 0.4);
    border-radius: 100%;
    z-index: 5555;
    backface-visibility: hidden;
    transition: opacity 0.6s ease;
  }

  &__point {
    top: 0;
    left: 0;
    position: fixed;
    width: var(--width);
    height: var(--width);
    pointer-events: none;
    user-select: none;
    border-radius: 100%;
    background: $pointBlueGreen2;
    z-index: 55555555;
    backface-visibility: hidden;
    will-change: transform;
    transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
    // transition-delay: 0.25s;
    // trans
    transform-origin: right center;
  }

  &_hover {
    .g-point {
      opacity: 0;
      width: 60px;
      height: 60px;
      transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
    }
  }
}
.c-stalkerMouse__inner,
.c-stalkerMouse__outer {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  border-radius: 50%;
}
.c-stalkerMouse__outer {
  width: 50px;
  height: 50px;
  top: 0;
  left: 0;
  border: 1px solid #e7e7e7;
  z-index: 12000;
  transform-origin: center;
  mix-blend-mode: difference;
}
</style>
