<template>
  <div>
    <PopBase v-show="isShow" :show="isShow" :className="'address'">
      <template #header>
        <h2>
          동인비 1899 싱글 에센스
          <br />
          <span class="color--pink">체험 KIT 당첨을 축하 드립니다.</span>
        </h2>
        <p class="popup__header__desc">
          택배 수령을 위한
          <strong>주소 입력</strong>부탁 드립니다.
        </p>
      </template>
      <template #content>
        <PersonalForm
          ref="address"
          :id="'address'"
          :key="forceUpdate"
          :eventName="$store.state.kit.eventName"
          :infoDefault="false"
          :infoAddress="true"
        ></PersonalForm>
        <div class="popup__notice">
          <ul>
            <li>수집된 개인정보는 이벤트 최종 종료 후 일괄 삭제됩니다.</li>
          </ul>
        </div>
      </template>
      <template #footer>
        <div class="popup__footer">
          <button
            @click="closePop"
            type="button"
            class="popupBtn popupBtn__close"
          >
            <span>닫기</span>
          </button>
          <button
            @click="nextStep"
            type="button"
            class="popupBtn popupBtn__result"
          >
            <span
              data-gtm-category="EVENT"
              data-gtm-action="당첨 안내"
              data-gtm-label="주소입력"
              >주소 입력완료</span
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
import PersonalForm from '@/components/shared/PersonalForm'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopAddress',
  components: { PopBase, PersonalForm },
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
  updated() {
    if (this.isShow) {
    }
  },
  mounted() {
    if (process.browser) {
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.kit.imageUrlRoot}/popup`,
      forceUpdate: (state) => state.popup.forceUpdate,
      userSelect: (state) => state.kit.userSelect
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop']),
    ...mapActions('kit', ['saveUserAddress']),
    nextStep() {
      this.saveUserAddress(this.$refs.address.userModel.addressDetail)
    }
  }
}
</script>
