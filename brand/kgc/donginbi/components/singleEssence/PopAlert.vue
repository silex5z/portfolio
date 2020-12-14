<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :className="'alert'"
    :mask="true"
    class="popup_alert"
  >
    <template #content>
      <!-- 당첨 -->
      <img
        v-if="popAlertParam == 'win'"
        :src="`${imageUrl}/txt-win.png`"
        alt="2주체험 kit 당첨안내"
      />
      <p v-if="popAlertParam == 'win'" class="complete-day">
        &middot; 배송 시작일 : {{ deliveryDate }}
      </p>

      <!-- 꽝 -->
      <img
        v-if="popAlertParam == 'lose'"
        :src="`${imageUrl}/txt-lose.png`"
        alt="다음 기회에!"
      />
    </template>

    <template #footer>
      <button
        @click="eventEnd(popAlertParam)"
        type="button"
        class="popupBtn popupBtn__close--full popupBtn--full"
      >
        완료닫기
      </button>
    </template>

    <template #closeButton>
      <button
        @click="eventEnd(popAlertParam)"
        type="button"
        class="popupBtn__close"
      >
        완료닫기
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
    return {
      popText: null
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.singleEssence.imageUrlRoot}/popup`,
      popAlertParam: (state) => state.singleEssence.popAlertParam,
      deliveryDate: (state) => state.singleEssence.deliveryDate
    })
  },
  methods: {
    ...mapActions('popup', ['closePop']),
    eventEnd(popAlertParam) {
      const event2OffsetTop = $('#event2').offset().top
      if (popAlertParam === 'win') {
        $('html, body').animate(
          {
            scrollTop: Math.ceil(event2OffsetTop)
          },
          500
        )
      }

      this.closePop()
      this.$store.commit('singleEssence/SET_EVENT_STEP', 'step1')
    }
  }
}
</script>
