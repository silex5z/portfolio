<template>
  <PopPost
    :eventName="$store.state.singleEssence.eventName"
    @complete="complete"
  >
    <template #header>
      <img :src="imageUrl + '/tit_post.png'" alt="우편번호 찾기" />
    </template>

    <template #closeButton>
      <button
        @click="openPop({ popName: 'PopPersonal' })"
        class="popupBtn__close"
      ></button>
    </template>
  </PopPost>
</template>

<script>
import PopPost from '@/components/shared/PopPost'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopPostSemester',
  components: {
    PopPost
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.singleEssence.imageUrlRoot}/popup`
    })
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    complete() {
      this.openPop({ popName: 'PopPersonal' })
    }
  }
}
</script>
