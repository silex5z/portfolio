<template>
  <ul :class="paginationClass" class="pagination">
    <li :class="[{ disabled: value === 1 }]" class="page-item prev-page">
      <span @click="prevPage" class="page-link" aria-label="Previous">
        <slot name="prev">
          <span class="prev__icon"></span>
        </slot>
      </span>
    </li>
    <li
      v-for="item in range(minPage, maxPage)"
      :key="item"
      :class="[{ active: value === item }]"
      class="page-item"
    >
      <span @click="changePage(item)" class="page-link">{{ item }}</span>
    </li>
    <li
      :class="[{ disabled: value === totalPages }]"
      class="page-item page-pre next-page"
    >
      <span @click="nextPage" class="page-link" aria-label="Next">
        <slot name="next">
          <span class="next__icon"></span>
        </slot>
      </span>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    pageCount: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      defaultPagesToDisplay: 5
    }
  },
  computed: {
    paginationClass() {
      return `pagination-${this.type}`
    },
    totalPages() {
      if (this.pageCount > 0) return this.pageCount
      if (this.total > 0) {
        return Math.ceil(this.total / this.perPage)
      }
      return 1
    },
    pagesToDisplay() {
      if (this.totalPages > 0 && this.totalPages < this.defaultPagesToDisplay) {
        return this.totalPages
      }
      return this.defaultPagesToDisplay
    },
    minPage() {
      if (this.value >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
        const newMaxPage = pagesToAdd + this.value
        if (newMaxPage > this.totalPages) {
          return this.totalPages - this.pagesToDisplay + 1
        }
        return this.value - pagesToAdd
      } else {
        return 1
      }
    },
    maxPage() {
      if (this.value >= this.pagesToDisplay) {
        const pagesToAdd = Math.floor(this.pagesToDisplay / 2)
        const newMaxPage = pagesToAdd + this.value
        if (newMaxPage < this.totalPages) {
          return newMaxPage
        } else {
          return this.totalPages
        }
      } else {
        return this.pagesToDisplay
      }
    }
  },
  watch: {
    perPage() {
      this.$emit('input', 1)
    },
    total() {
      this.$emit('input', 1)
    }
  },
  methods: {
    range(min, max) {
      const arr = []
      for (let i = min; i <= max; i++) {
        arr.push(i)
      }
      return arr
    },
    changePage(item) {
      this.$emit('input', item)
    },
    nextPage() {
      if (this.value < this.totalPages) {
        this.$emit('input', this.value + 1)
      }
    },
    prevPage() {
      if (this.value > 1) {
        this.$emit('input', this.value - 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-direction: row;
}
.page-item {
  width: 30px;
  height: 28px;
  margin: 0 4px;
  border-radius: 4px;
  background-color: #f7f7f9;
  color: #758592;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  > .page-link {
    position: relative;
    top: 1px;
    display: block;
    padding: 8px 11px;

    img {
      width: 7px;
      height: 12px;
    }
  }
}

.pagination .page-item.active {
  background-color: #fff;
  color: #202d37;
}

.prev-page {
  .prev__icon {
    display: block;
    width: 7px;
    height: 12px;
    @include background(
      '~@/assets/img/icons/symbol/arrow_left_on.png',
      null,
      null,
      null,
      contain
    );
  }

  &.disabled {
    .prev__icon {
      @include background(
        '~@/assets/img/icons/symbol/arrow_left.png',
        null,
        null,
        null,
        contain
      );
    }
  }
}

.next-page {
  .next__icon {
    display: block;
    width: 7px;
    height: 12px;
    @include background(
      '~@/assets/img/icons/symbol/arrow_right_on.png',
      null,
      null,
      null,
      contain
    );
  }

  &.disabled {
    .next__icon {
      @include background(
        '~@/assets/img/icons/symbol/arrow_right.png',
        null,
        null,
        null,
        contain
      );
    }
  }
}
</style>
