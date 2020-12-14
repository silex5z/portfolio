<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  computed: {},
  watch: {
    chartData() {
      this.$data._chart.update()
    }
  },
  mounted() {
    $('#chartjs-tooltip').show()
    this.renderChart(this.chartData, this.options)
  },
  beforeDestroy() {
    $('#chartjs-tooltip').hide()
  },
  method: {}
}
</script>

<style lang="scss">
#chartjs-tooltip {
  border: 1px solid #ebeef1;
  border-radius: 4px;
  table {
    width: 100%;
    border-spacing: 0 8px;
    border-collapse: initial;
    tr {
      width: auto;
    }
  }
}
</style>
