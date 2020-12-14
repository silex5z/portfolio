<template>
  <PopBase v-show="isShow" :show="isShow" :className="popName">
    <template #contents>
      <header class="popup__header">
        <h2 class="popup_tit">우편번호 찾기</h2>
      </header>
      <div class="popup__content">
        <DaumPostcode :on-complete="postComplete" :animation="true" />
      </div>
    </template>

    <template #closeButton>
      <slot name="closeButton">
        <button
          @click="openPop({ name: 'personalAddress' })"
          class="popupBtn__close"
        >
          닫기
        </button>
      </slot>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import DaumPostcode from 'vuejs-daum-postcode'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PopPost',
  components: { PopBase, DaumPostcode },
  props: {
    isShow: { type: Boolean, default: false, required: true }
  },
  data() {
    return {
      popName: 'post',
      userInfo: {
        zipcode: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapState({ currentPop: (state) => state.popup.currentPop }),
    isShow() {
      return this.currentPop === this.popName
    }
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    postComplete(data) {
      let fullAddress = data.address
      let extraAddress = ''
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname
        }
        if (data.buildingName !== '') {
          extraAddress +=
            extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
      }
      this.userInfo.zipcode = data.zonecode
      this.userInfo.address = fullAddress

      // this.$store.commit(
      //   `auth/SET_USER_ADDRESS`,
      //   this.userInfo
      // )

      // this.$emit('complete')
      // ie에서 우편번호 팝업 관련 버그 처리
      // $('#personalAddressDetail')
      //   .first()
      //   .focus()
    }
  }
}
</script>

<style lang="scss">
.popup__post .popup__content .popup__inner {
  // ios에서 위치 값을 못찾는 오류가 있어 relative 지정
  position: relative;
  // .vue-daum-postcode {
  //   height: 500px;
  // }
  // .vue-daum-postcode-container {
  //   height: 100% !important;
  // }
}
</style>
