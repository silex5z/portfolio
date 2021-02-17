<template>
  <div class="section section-pagination">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <pagination
            :page-count="pageCount"
            v-model="pagination.simple"
            type="primary"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from './PaginationChild'

export default {
  components: {
    Pagination
  },
  props: {
    pageCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pagination: {
        simple: 1,
        default: 2,
        full: 3
      }
    }
  },
  watch: {
    'pagination.simple'(value) {
      console.log('simple: ', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.section-pagination {
  display: flex;
  justify-content: center;
}
</style>
