<template>
  <div>
    <!-- type종류 empty:빈팝업 -->
    <PopBase v-show="isShow" :show="isShow" :className="'popDuplicated'">
      <template #header>
        <h2 class="popup__header--layerAlert">
          동인비 1899 싱글 에센스<br />
          <span class="colored">체험 KIT에 이미 당첨</span> 되셨습니다.
        </h2>
      </template>
      <template #content>
        <p class="popup__desc">
          더 많은 분들의 경험을 위해<br />
          <b>중복당첨</b>은 <b>불가</b>합니다.
        </p>
      </template>
      <template #footer>
        <div class="popup__footer">
          <button
            @click="closePop"
            type="button"
            class="popupBtn popupBtn__close"
          >
            <span data-gtm-category="EVENT" data-gtm-action="중복참여">
              닫기</span
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
  name: 'PopDuplicated',
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
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.singleEssence.imageUrlRoot}/popup`,
      forceUpdate: (state) => state.popup.forceUpdate
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop'])
  }
}
</script>
