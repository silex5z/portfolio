<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :className="'event1Step1'"
    :mask="true"
    :class="{ on: currentPop == 'PopEvent1Step1' }"
    class="popup_event1Step1"
  >
    <template #content>
      <div class="product__textBox">
        <p class="product__text">
          <img
            :src="`${imageUrl}/list_showText` + userSelect.number + '.png'"
            alt=""
          />
        </p>
      </div>

      <img
        :src="`${imageUrl}/emblem` + userSelect.number + '.png'"
        class="emblem"
        alt=""
      />

      <button
        @click="openPop({ popName: 'PopEvent1Step2' })"
        :class="{ on: userSelect.tit }"
        class="popupBtn popupBtn__nextStep"
      >
        다음단계
      </button>
    </template>

    <template #closeButton>
      <button
        @click="closePop"
        type="button"
        class="popupBtn__close popupBtn__close-b"
      >
        닫기
      </button>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopAlert',
  components: { PopBase },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.singleEssence.imageUrlRoot}/popup`,
      userSelect: (state) => state.singleEssence.userSelect,
      currentPop: (state) => state.popup.currentPop
    })
  },
  watch: {
    currentPop() {
      const $textBox = $('.wrap__m .product__textBox')
      const $emblem = $('.wrap__m .emblem')
      if (this.currentPop === 'PopEvent1Step1') {
        setTimeout(() => {
          $emblem.addClass('on')
          $textBox.addClass('on')
        }, 2000)
      } else {
        $emblem.removeClass('on')
        $textBox.removeClass('on')
      }

      $('.popup_event1Step1 .popup__content').css(
        'background',
        'url(https://donginbi.s3.amazonaws.com/static/singleessence/images/popup/product.gif?_=' +
          Math.random() +
          ')'
      )
      // return v
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop'])
  }
}
</script>
