<template>
  <div>
    <!-- type종류 empty:빈팝업 -->
    <PopBase v-show="isShow" :show="isShow" :className="'popComplete'">
      <template #header>
        <h2 class="popup__header--layerAlert">
          체험 KIT 택배 수령을 위한<br />
          <span class="colored">정보 입력이 완료</span>되었습니다.
        </h2>
      </template>
      <template #content>
        <p class="popup__desc">배송 시작일 : {{ deliveryStartDate }}</p>
      </template>
      <template #footer>
        <div class="popup__footer">
          <button
            @click="closePop"
            type="button"
            class="popupBtn popupBtn__close"
          >
            <span data-gtm-category="EVENT" data-gtm-action="주소 입력 완료"
              >닫기</span
            >
          </button>
        </div>
      </template>
      <template #closeButton>
        <button type="button" hidden></button>
      </template>
    </PopBase>
  </div>
</template>

<script>
import PopBase from '@/components/shared/PopBase'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopComplete',
  components: { PopBase }, // AbovePopExample
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
  created() {},
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.singleEssence.imageUrlRoot}/popup`,
      forceUpdate: (state) => state.popup.forceUpdate,
      deliveryStartDate: (state) => state.kit.deliveryStartDate
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop']),
    setDeliveryStartDate() {
      const d = new Date()
      const year = d.getFullYear()
      let month = d.getMonth() + 1
      month = month >= 10 ? month : '0' + month
      let day = d.getDate()
      day = day >= 10 ? day : '0' + day

      const today = year.toString() + month.toString() + day
      if (today <= '20201011') this.deliveryStartDate = '10월 20일'
      else if (today <= '20201025') this.deliveryStartDate = '10월 27일'
      else if (today <= '20201101') this.deliveryStartDate = '11월 3일'
      else if (today <= '20201108') this.deliveryStartDate = '11월 10일'
      else if (today <= '20201115') this.deliveryStartDate = '11월 17일'
      else if (today <= '20201123') this.deliveryStartDate = '11월 24일'
    }
  }
}
</script>
