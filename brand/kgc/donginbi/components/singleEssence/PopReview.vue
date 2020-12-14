<template>
  <div>
    <!-- type종류 empty:빈팝업 -->
    <PopBase v-show="isShow" :show="isShow" :className="'review'">
      <!-- 기본틀가지고 있는 팝업 사용 예시 -->
      <template #header>
        <img :src="`${imageUrl}/tit_personal.png`" alt="개인정보 입력" />
      </template>
      <template #content>
        <PersonalForm
          ref="childPersonal"
          :id="'review'"
          :key="forceUpdate"
          :eventName="$store.state.singleEssence.eventName"
          :infoAddress="false"
          :infoUrl="true"
          :defaultUrlText="true"
          :agreement="{
            list: [
              {
                txt: '개인정보 보호를 위한 이용자 동의사항',
                name: 'agree0'
              },
              {
                txt: '개인정보 처리 위탁에 대한 동의',
                name: 'agree1'
              }
            ],
            agreeAll: false,
            checkboxSize: [32, 32, 10]
          }"
          @openAbovePop="(agreePopName) => (currentAgree = agreePopName)"
        >
        </PersonalForm>
      </template>
      <template #footer>
        <button
          @click="openPop('example')"
          type="button"
          class="popupBtn popup__btn--reviewComplete"
        >
          응모완료
        </button>
      </template>

      <!-- 닫기버튼 custom 사용 예시 -->
      <template #closeButton>
        <!-- <button @click="openPop('example')" type="button" class="popup__close">
          닫기
        </button> -->
      </template>
    </PopBase>
    <AbovePop v-model="currentAgree"></AbovePop>
  </div>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import PersonalForm from '@/components/shared/PersonalForm'
import AbovePop from '@/components/singleEssence/AbovePopAgreement'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopPersonal',
  components: { PopBase, PersonalForm, AbovePop }, // AbovePopExample
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      currentAgree: null
    }
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
