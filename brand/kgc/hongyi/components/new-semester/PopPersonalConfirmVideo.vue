<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :className="'personalConfirmVideo'"
    class="popup__personal"
  >
    <template #header>
      <h1>
        <img
          :src="`${imageUrl}/tit-personal.jpg`"
          alt="우리 아이 영상 확인하기"
        />
      </h1>
    </template>
    <template #content>
      <PersonalForm
        ref="childvideoconfirm"
        :key="forceUpdate"
        :eventName="$store.state.newSemester.eventName"
        :infoAddress="false"
        :id="'confirm'"
      >
      </PersonalForm>
    </template>
    <template #footer>
      <div class="btnBox">
        <button
          @click="openNextPop()"
          type="button"
          class="popupBtn popupBtn--full popupBtn__confirm"
          data-gtm-category="EVENT 01"
          data-gtm-action="영상 확인_확인"
        >
          확인
        </button>
      </div>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import PersonalForm from '@/components/shared/PersonalForm'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PopPersonalConfirmVideo',
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
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.newSemester.imageUrlRoot}/popup`,
      forceUpdate: (state) => state.popup.forceUpdate
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop', 'setLoading']),
    ...mapActions('newSemester', ['getVideoList']),
    ...mapMutations('newSemester', ['SET_USER_MODEL']),

    openNextPop() {
      // validate
      if (
        this.$refs.childvideoconfirm.userModel.name === '' ||
        this.$refs.childvideoconfirm.userModel.phone === ''
      ) {
        alert('필수 정보를 확인하시고 다시 입력해주세요')
        return false
      }

      this.SET_USER_MODEL({
        name: this.$refs.childvideoconfirm.userModel.name,
        phoneNum: this.$refs.childvideoconfirm.userModel.phone
      })

      this.getVideoList()
    }
  }
}
</script>
