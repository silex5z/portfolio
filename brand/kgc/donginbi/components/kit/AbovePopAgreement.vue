<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :className="'agreement'"
    :mask="false"
    class="popup__agree"
  >
    <template #header>
      <h2 v-show="currentAgree === 'agree1'">개인정보 위탁 동의</h2>
      <h2 v-show="currentAgree === 'agree0'">개인정보 수집 &#183; 이용 동의</h2>
    </template>

    <template #content>
      <div v-show="currentAgree === 'agree1'">
        <div class="popup__desc">
          <p>
            이벤트 참여를 위해서는 아래 사항에 대한 동의가 필요합니다. 아래
            사항에 동의하지 않을 수 있으나, 동의하지 않으실 경우 이벤트 참여가
            불가능함을 알려 드립니다.
          </p>
          <p>
            본인은 귀사가 아래의 내용과 같이 본인의 개인정보를 수집/이용하는
            것에 동의합니다.
          </p>
          <dl>
            <dt>개인정보를 위탁 받는 자 :</dt>
            <dd>메가존㈜</dd>
            <dt>개인정보 위탁 목적 :</dt>
            <dd>영상 확인, 경품 배송 등 이벤트 진행 관련 업무</dd>
            <dt>제공하는 개인정보의 항목 :</dt>
            <dd>성명, 연락처, 주소</dd>
            <dd>(주소는 온라인 수령자에 한함)</dd>
            <dt>위탁 받는 자의 개인정보 보유 및 이용 기간 :</dt>
            <dd>이벤트 최종 종료 시점에 일괄 삭제</dd>
          </dl>
        </div>
      </div>

      <div v-show="currentAgree === 'agree0'">
        <div class="popup__desc">
          <p>
            이벤트 참여를 위해서는 아래 사항에 대한 동의가 필요합니다. 아래
            사항에 동의하지 않을 수 있으나, 동의하지 않으실 경우 이벤트 참여가
            불가능함을 알려 드립니다.
          </p>
          <p>
            본인은 귀사가 아래의 내용과 같이 본인의 개인정보를
            <br />수집/이용하는 것에 동의합니다.
          </p>
          <dl>
            <dt>개인정보를 제공 받는 자 :</dt>
            <dd>메가존㈜</dd>
            <dt>개인정보를 제공 받는 자의 개인정보 이용 목적 :</dt>
            <dd>영상 확인, 경품 배송 등 이벤트 진행 관련 업무</dd>
            <dt>제공하는 개인정보의 항목 :</dt>
            <dd>성명, 연락처, 주소</dd>
            <dd>(주소는 온라인 수령자에 한함)</dd>
            <dt>위탁 받는 자의 개인정보 보유 및 이용 기간 :</dt>
            <dd>이벤트 최종 종료 시점에 일괄 삭제</dd>
          </dl>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="popup__footer">
        <button @click="close" type="button" class="popupBtn__close">
          닫기
        </button>
      </div>
    </template>
    <template #closeButton>
      <button type="button" hidden></button>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'

import { mapState } from 'vuex'

export default {
  name: 'PopAgreement',
  components: { PopBase },
  model: {
    prop: 'currentAgree',
    event: 'close'
  },
  props: {
    currentAgree: {
      type: String,
      default: null
    }
  },
  data() {
    return {}
  },

  computed: {
    ...mapState({
      imageUrl: (state) => `${state.kit.imageUrlRoot}/popup`
    }),
    isShow() {
      return !!this.currentAgree
    }
  },
  watch: {
    currentAgree() {
      if (!this.currentAgree) {
        $('.popup__personal .popup__dialog').css('opacity', 1)
      } else {
        $('.popup__personal .popup__dialog').css('opacity', 0)
        window.scrollTo(0, $('.popup__personal .popup__dialog').offset().top)
      }
    }
  },
  methods: {
    close($event) {
      $event.target.blur()
      this.$emit('close', null)
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  &__inner {
    padding-bottom: 48px;
  }
  &__desc {
    // width: 560px;
    // height: 430px;
    padding: 30px;
    background: #fff;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -1px;
    p {
      margin-bottom: 20px;
      word-break: break-all;
      word-break: keep-all;
    }
  }
  dl {
    overflow: hidden;
    dt,
    dd {
      float: left;
      padding-left: 10px;
      word-break: break-all;
      word-break: keep-all;
    }
    dt {
      position: relative;
      &::before {
        content: '·';
        position: absolute;
        left: 0;
      }
    }
    dd:first-of-type:after {
      content: '';
      display: table;
      width: 200px;
    }
  }
}
</style>
