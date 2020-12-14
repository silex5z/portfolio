<template>
  <!-- type종류 empty:빈팝업, personal: 개인정보팝업 -->
  <PopBase
    v-show="isShow"
    :show="isShow"
    :className="popName"
    :imageUrl="imageUrl"
  >
    <!-- 기본팝업. 복사 후 변경해서 사용하세요
     -->

    <!-- type:'empty' 사용 예시 -->
    <template #empty>
      변경할 내용
    </template>

    <!-- 기본틀가지고 있는 팝업 사용 예시 -->
    <template #header>
      변경할 내용
    </template>
    <template #content>
      변경할 내용
    </template>
    <template #footer>
      변경할 내용
    </template>

    <!-- 닫기버튼 custom 사용 예시 -->
    <template #closeButton>
      <button
        type="button"
        @click="this.openPop({ popName: 'personal' })"
        class="popup__close"
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
  name: 'PopDefault',
  data() {
    return {
      popName: 'default'
    }
  },
  props: {
    imageUrl: {
      type: String,
      default: ''
    }
  },
  components: { PopBase },
  computed: {
    ...mapState({ currentPop: (state) => state.popup.currentPop }),
    isShow() {
      return this.currentPop === this.popName
    }
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop'])
  }
}
</script>
