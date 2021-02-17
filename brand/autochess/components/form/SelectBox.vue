<template>
  <div :tabIndex="tabIndex" @blur="open = false" class="custom-select">
    <div :class="{ open: open }" @click="open = !open" class="selected">
      <span class="selected__text">{{ selected }}</span>
      <span class="selected__icon"></span>
    </div>
    <div :class="{ selectHide: !open }" class="items">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option
          open = false
          $emit('input', option)
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    default: {
      type: String,
      required: false,
      default: null
    },
    tabIndex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false
    }
  },
  mounted() {
    this.$emit('input', this.selected)
  }
}
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  display: flex;
  outline: none;
}

.custom-select .selected {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dbe0e4;
  color: #202d37;
  font-size: 12px;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid #dbe0e4;
  border-radius: 6px 6px 0px 0px;
}

.selected__icon {
  position: relative;
  top: 2px;
  margin-left: 8px;
  border: 5px solid transparent;
  border-color: #9aa4af transparent transparent transparent;
}

.custom-select .items {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  top: 32px;
  line-height: 32px;
  background-color: #fff;
  color: #202d37;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #dbe0e4;
  border-left: 1px solid #dbe0e4;
  border-bottom: 1px solid #dbe0e4;
}

.custom-select .items div {
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #dbe0e4;
}

.selectHide {
  display: none;
}
</style>
