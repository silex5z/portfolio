<template>
  <PopBase
    v-show="isShow"
    :show="isShow"
    :class-name="'additionalInfo'"
    :width="500"
  >
    <template #contents>
      <header class="popup__header">
        <h2 class="popup__tit">추가정보 입력</h2>
        <p class="popup__desc">
          추가 정보만 입력해도<br v-if="$device.isMobile" />
          <em> <span class="eng">50,000</span> 포인트</em>를 지급해드려요!
        </p>
      </header>
      <div class="popup__content">
        <PersonalForm
          :id="'additionalInfo'"
          ref="childPersonal"
          :is-show="isShow"
        ></PersonalForm>
        <button
          v-if="!isExistAdditionalInfo"
          type="button"
          class="btn btn--big btn--white btn__save"
          @click="save"
        >
          작성완료
        </button>
      </div>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import PersonalForm from '@/components/shared/PersonalForm'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'PopAdditionalInfo',
  components: { PopBase, PersonalForm },
  props: { isShow: { type: Boolean, default: false, required: true } },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot
    }),
    ...mapGetters('auth', ['isExistAdditionalInfo'])
  },
  methods: {
    ...mapActions('auth', ['saveAdditionalInfo']),
    save() {
      const additinalUserInfo = {
        name: this.$refs.childPersonal.userInfo.name,
        phoneNo: this.$refs.childPersonal.userInfo.phoneNo,
        companyName: this.$refs.childPersonal.userInfo.companyName,
        jobGrade: this.$refs.childPersonal.userInfo.jobGrade
      }
      if (!this.isExistAdditionalInfo)
        this.saveAdditionalInfo(additinalUserInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.popup__desc {
  em {
    color: $pointBlueGreen2;
  }
  .eng {
    font-weight: $font-bold;
  }
}
.btn__save {
  @include breakpoint() {
    margin-top: 60px;
  }
  @include breakpoint('pc') {
    margin-top: 40px;
  }
}
</style>
