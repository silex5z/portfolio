<template>
  <div
    :class="isBtns ? 'active' : ''"
    @click="handleClickMoreItems"
    class="expansion"
  >
    <section class="header">
      <div class="header--left">
        <img
          :src="require(`@/assets/img/icons/pictogram/${info.iconName}.png`)"
          class="header--left__icon"
          alt
        />
        <h3 class="header__title">{{ info.title }}</h3>
        <span class="header__text">({{ info.buttonNames.length }})</span>
      </div>
      <div
        v-if="isMobile"
        :class="isBtns ? 'active' : ''"
        class="header--right"
      >
        <span class="header--right__icon" />
      </div>
    </section>
    <div v-show="isBtns" class="btns">
      <div
        v-for="(item, index) in info.buttonNames"
        :key="index"
        class="btn__box"
      >
        <input
          :id="info.iconName + index"
          v-model="info.picked"
          :value="item"
          type="radio"
        />
        <label :for="info.iconName + index">{{ item }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,

      iconName: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      buttonNames: {
        type: Array,
        required: true
      },
      picked: {
        type: String,
        required: true
      }
    }
  },
  data() {
    return {
      isMobile: this.$device.isMobile,
      isBtns: false
    }
  },
  created() {
    if (!this.isMobile) {
      this.isBtns = true
    }
  },
  methods: {
    handleClickMoreItems() {
      if (!this.isMobile) return
      this.isBtns = !this.isBtns
    }
  }
}
</script>

<style lang="scss" scoped>
.expansion {
  width: 324px;
  padding: 12px 16px;
  margin: 0 auto 8px;
  border-radius: 4px;
  background-color: #f7f7f9;
  cursor: pointer;

  &.active {
    background-color: #fff;
  }
}

@media (max-width: 1280px) {
  .expansion {
    max-width: 740px;
    width: 100%;
  }
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header--left {
  display: flex;
  align-items: center;

  .header--left__icon {
    position: relative;
    top: -1px;
    width: 14px;
  }
  .header__title {
    margin-left: 4px;
    margin-right: 3px;
    color: #202d37;
    font-size: 12px;
    font-weight: bold;
    line-height: normal;
  }
  .header__text {
    color: #9aa4af;
    font-size: 11px;
  }
}

.header--right {
  margin-left: auto;
  cursor: pointer;

  &.active {
    .header--right__icon {
      height: 1px;
      @include background(
        '~@/assets/img/icons/symbol/minus.png',
        null,
        null,
        null,
        contain
      );
    }
  }

  .header--right__icon {
    display: block;
    width: 6px;
    height: 6px;
    @include background(
      '~@/assets/img/icons/symbol/plus.png',
      null,
      null,
      null,
      contain
    );
  }
}

.btns {
  display: flex;
  flex-flow: wrap;
  margin-top: 16px;
}

input[type='radio'] {
  width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
}
input[type='radio'] + label {
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 8px 16px;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  border: solid 1px #dbe0e4;
  border-radius: 4px;
  background-color: #fff;
  line-height: 140%;
  text-align: center;
  box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  transition: border-color 0.15s ease-out, color 0.25s ease-out,
    background-color 0.15s ease-out, box-shadow 0.15s ease-out;
  cursor: pointer;
  color: #202d37;
  font-size: 12px;
}
input[type='radio']:checked + label {
  z-index: 1;
  border-color: #5383e8;
  box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);
  background-color: #5383e8;
  color: #fff;
  font-weight: bold;
}
</style>
