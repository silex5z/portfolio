<template>
  <PopPost :eventName="$store.state.example.eventName" @complete="complete">
    <template #header>
      <h1>우편번호 타이틀 변경 예시</h1>
    </template>
  </PopPost>
</template>

<script>
import PopPost from '@/components/shared/PopPost'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopPostExample',
  components: {
    PopPost
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.example.imageUrlRoot}/popup`
    })
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    complete() {
      this.openPop({ popName: 'example' })
    }
  }
}
</script>
