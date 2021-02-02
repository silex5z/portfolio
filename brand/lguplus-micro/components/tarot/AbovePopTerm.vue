<template>
  <PopBase v-show="isShow" :show="isShow" :className="'term'" :mask="false">
    <template #header>
      <h1 v-if="currentAgree === 'agree0'">
        개인정보 보호를 위한 이용자 동의사항
      </h1>
      <h1 v-else>개인정보 처리 위탁에 대한 동의</h1>
    </template>

    <template #content>
      <div v-if="currentAgree === 'agree0'">
        <p>
          주식회사 엘지유플러스(이하 ＂회사＂라 합니다)는 「정보통신망 이용촉진
          및 정보보호 등에 관한 법률」 및 「개인정보 보호법」에 따라 고객
          혜택정보·광고정보 제공을 위해 귀하의 개인정보를 다음과 같이
          수집·이용하고자 합니다.
        </p>
        <ul>
          <li>수집 이용 항목 : 성명, 연락처, IP,통신사, 성별, 연령대</li>
          <li>
            수집 이용 목적 : 마케팅 활동(유플러스, 고객센터, 협력사에서 제공하는
            추가 혜택과 서비스 안내)의 타겟팅과 가입자 특성 분석에 사용
          </li>
          <li>
            개인정보 보유 및 이용기간 : 개인정보는 수집 및 이용목적 달성 시까지
            최대 3개월 한도 내에서 보유하며, 개인정보의 수집 및 이용 목적을
            달성하거나 3개월이 경과하게 되면 지체 없이 파기하는 것을 원칙으로 함
          </li>
          <li>
            고객은 개인정보 수집 및 이용에 동의하지 않을 수 있으며, 동의하지
            않을 경우 본 이벤트 신청이 불가
          </li>
        </ul>
      </div>
      <div v-else>
        <p>
          회사는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 및
          「개인정보 보호법」에 따라 고객 혜택정보·광고정보 제공에 필요한 업무
          수행을 위해 다음과 같이 수탁자에게 귀하의 개인정보 처리 업무를
          위탁하고 있습니다.
        </p>
        <ul>
          <li>
            개인정보 처리위탁을 받는 자 및 위탁 업무의 내용 : 엘지유플러스,
            엘지유플러스 고객센터, 메가존㈜, ㈜젤라블루코리아 : 홈페이지 구축,
            회사의 고객 혜택정보·광고정보를 제공을 위한 시스템 구축, 개인정보
            분석, 취급 등 위탁업무수행
          </li>
        </ul>
      </div>
    </template>

    <template #closeButton>
      <button @click="close" type="button" class="popupBtn__close">
        닫기
      </button>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'

// import { mapState } from 'vuex'

export default {
  name: 'PopPolicyTerm',
  components: { PopBase },
  model: {
    // v-model custom
    prop: 'currentAgree',
    event: 'close'
  },
  props: { currentAgree: { type: String, default: null } },
  data() {
    return {}
  },
  computed: {
    // ...mapState({
    //   // TODO :: example event명으로 변경해서 사용
    //   imageUrl: (state) => `${state.example.imageUrlRoot}/popup`
    // }),
    isShow() {
      return !!this.currentAgree
    }
  },
  methods: {
    close() {
      this.$emit('close', null)
    }
  }
}
</script>
