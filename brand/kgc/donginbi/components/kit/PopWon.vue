<template>
  <div>
    <!-- type종류 empty:빈팝업 -->
    <PopBase v-show="isShow" :show="isShow" :className="'popWon'">
      <template #header>
        <h2 class="popup__header--layerAlert">
          동인비 1899 싱글 에센스<br />
          <div class="colored">
            체험 KIT 당첨을 축하 드립니다.
          </div>
        </h2>
      </template>
      <template #content>
        <p class="popup__desc">매장 수령을 위한 문자 확인 부탁드립니다.</p>
      </template>
      <template #footer>
        <div class="popup__footer">
          <button
            @click="closePop"
            type="button"
            class="popupBtn popupBtn__close"
          >
            <span
              data-gtm-category="EVENT"
              data-gtm-action="당첨 안내"
              data-gtm-label="오프라인"
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
  name: 'PopWon',
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
