<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :className="'personalCheckInfo'"
    class="popup__personal"
  >
    <template #header>
      <h1>
        <img :src="`${imageUrl}/tit-check-info.jpg`" alt="참여 이력 확인" />
      </h1>
    </template>
    <template #content>
      <PersonalForm
        ref="childCheckInfo"
        :key="forceUpdate"
        :eventName="$store.state.newSemester.eventName"
        :infoAddress="false"
        :id="'check'"
      >
      </PersonalForm>
      <p><img :src="`${imageUrl}/notice-check-info.jpg`" alt="" /></p>
    </template>
    <template #footer>
      <div class="btnBox">
        <button
          @click="openNextPop()"
          :data-gtm-category="activeEventName == 'movie' ? 'EVENT 01' : 'MAIN'"
          type="button"
          class="popupBtn popupBtn--full popupBtn__confirm"
          data-gtm-action="참여 이력 확인"
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
  name: 'PopPersonalCheckInfo',
  components: { PopBase, PersonalForm },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    // 이벤트 구분짓기 위해 추가
    // kit || movie
    activeEventName: {
      type: String,
      default: '',
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
    ...mapActions('newSemester', ['checkUserModel']),
    ...mapMutations('newSemester', ['SET_USER_MODEL']),
    openNextPop() {
      // validate
      if (
        this.$refs.childCheckInfo.userModel.name === '' ||
        this.$refs.childCheckInfo.userModel.phone === ''
      ) {
        alert('필수 정보를 확인하시고 다시 입력해주세요')
        return false
      }

      this.SET_USER_MODEL({
        name: this.$refs.childCheckInfo.userModel.name,
        phoneNum: this.$refs.childCheckInfo.userModel.phone,
        agree1: true,
        agree2: true,
        agree3: true,
        agree4: true,
        agree5: true
      })

      this.checkUserModel(this.activeEventName)
    }
  }
}
</script>
