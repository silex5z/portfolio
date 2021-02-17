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
        <span class="header__text">({{ info.buttonIconNames.length }})</span>
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
        v-for="(item, index) in info.buttonIconNames"
        :key="index"
        class="btn__box"
      >
        <input
          :id="info.iconName + index"
          v-model="info.picked"
          :value="item"
          type="radio"
        />
        <label :for="info.iconName + index">
          <span class="btn__box__icon">
            <img
              v-if="index === 0"
              :src="require(`@/assets/img/icons/etc/${item}.png`)"
              alt
            />
            <img
              v-else
              :src="require(`@/assets/img/icons/${info.iconName}/${item}.png`)"
              alt
            />
          </span>
        </label>
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
      buttonIconNames: {
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

.btn__box {
  .btn__box__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    width: 44px;
    padding: 5px;
    border: 1px solid #c3cbd1;
    border-radius: 50px;

    img {
      width: 34px;
      height: 34px;
    }
  }

  &:first-child {
    .btn__box__icon {
      padding: 0;
      border: none;

      img {
        width: 44px;
        height: 44px;
      }
    }
  }
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
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  line-height: 140%;
  text-align: center;
  box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  transition: border-color 0.15s ease-out, color 0.25s ease-out,
    background-color 0.15s ease-out, box-shadow 0.15s ease-out;
  cursor: pointer;
  color: #202d37;
  font-size: 12px;
}
</style>
