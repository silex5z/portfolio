@@ -1,48 +0,0 @@
<template>
  <div class="checkBox">
    <label
      v-for="(op, opIdx) in options"
      :key="opIdx"
      :for="`survey${op.questionId}${op.selectionNumber}`"
      :class="[
        'checkBox__label',
        op.selectionType === 'INPUT' ? 'checkBox__label--underline' : ''
      ]"
    >
      <input
        :id="`survey${op.questionId}${op.selectionNumber}`"
        v-model="userModel"
        :value="op.selectionContents"
        type="radio"
        class="checkBox__input"
        @change="onChange(`${op.questionId}`, op.selectionType, $event)"
      />
      <i class="checkBox__ir"
        ><Icon :name="'check'" :size="$device.isMobile ? 24 : 20"></Icon
      ></i>
      <span v-if="op.selectionType !== 'INPUT'" class="checkBox__desc">{{
        op.selectionContents
      }}</span>
      <input
        v-if="op.selectionType === 'INPUT'"
        v-model="userModelInput"
        type="text"
        class="checkBox__inputBox"
        :placeholder="op.selectionContents"
        @focus="onFocusEtc(`${op.selectionContents}`)"
        @input="onInput(`${op.questionId}`, op.selectionType, $event)"
      />
    </label>
    <!-- {{ options }} -->
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon'

import { debounce } from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'Radiobox',
  components: { Icon },

  props: {
    options: { type: Array, default: () => [], required: true }
  },
  data: () => ({
    userModel: '',
    userModelInput: ''
  }),
  computed: {
    ...mapState({
      imageUrl: (state) => state.imageUrlRoot
    })
  },
  watch: {
    userModel(newVal) {
      this.userModelInput = ''
    }
  },
  mounted() {},
  methods: {
    onChange(id, type, event) {
      this.$emit('change', { [id]: this.userModel.toString() })
      if (type === 'INPUT') {
        // console.log($(event.target).next())
        $(event.target)
          .siblings('input')
          .focus()
      }
    },
    /* onClick(type, event) {
      if (type === 'INPUT') {
        setTimeout(() => {
          $(event.target)
            .siblings('input')
            .focus()
        }, 1000)
      }
    }, */
    onInput: debounce(function(id, type, event) {
      // NOTE: es6 문법으로 바꾸지 마세요 this를 못찾아요
      // console.log(this)
      this.$emit('change', {
        [id]: `${this.userModel}^${this.userModelInput}`
      })
    }, 500),
    onFocusEtc(value) {
      this.userModel = value
    }
  }
}
</script>

<style lang="scss" scoped>
.checkBox__label--underline {
  .checkBox__inputBox {
    // position: absolute;
    // left: 50px;
    // width: auto;
    border-bottom: 1px solid #333;
  }
}

[type='text'].checkBox__inputBox {
  @include breakpoint() {
    height: 40px;
    line-height: 40px;
  }
  @include breakpoint('pc') {
    margin-left: 10px;
  }

  font-size: 16px;

  flex-grow: 1;
}
</style>
