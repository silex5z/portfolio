<template>
  <div class="viewport">
    <Pc v-if="deviceKind === 'pc'" :image-url="imageUrl"></Pc>
    <Mo v-else-if="deviceKind === 'mo'" :image-url="imageUrl"></Mo>
    <Tablet v-else :image-url="imageUrl"></Tablet>

    <PopJoinRegister
      :is-show="currentPop.includes('join')"
      :show-additional-info="true"
    ></PopJoinRegister>
    <Alert :is-show="isShowAlert"></Alert>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PopJoinRegister from '@/components/popup/PopJoinRegister'
import Alert from '@/components/ui/Alert'

export default {
  name: 'Index',
  components: {
    Pc: () => import('@/components/register/Pc'),
    Tablet: () => import('@/components/register/Tablet'),
    Mo: () => import('@/components/register/Mo'),
    PopJoinRegister,
    Alert
  },
  props: {
    deviceKind: {
      type: String,
      default: 'pc',
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      imageUrl(state) {
        return `${state.imageUrlRoot}/register`
      },
      currentPop: (state) => state.popup.currentPop,
      isShowAlert: (state) => state.popup.alert.isShow
    })
  },
  mounted() {
    // this.openPop({ name: 'join' })
    // alert(this.deviceKind)
  },
  methods: {
    ...mapActions('popup', ['openPop'])
  }
}
</script>

<style lang="scss"></style>
