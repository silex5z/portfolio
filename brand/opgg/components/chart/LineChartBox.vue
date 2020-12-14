<template>
  <div>
    <!-- <v-btn @click="fillData">test</v-btn> -->
    <LineChart
      ref="chart"
      v-if="chartShow"
      :width="904"
      :height="200"
      :chartData="finalData"
      :options="finalOption"
    ></LineChart>
  </div>
</template>

<script>
import LineChart from '@/components/chart/multi'
export default {
  name: 'LineChartBox',
  components: {
    LineChart
  },
  props: {
    isChartShow: {
      type: Boolean,
      default: false
    },
    playerChartData: {
      type: Object,
      default: () => {}
    },
    labelType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      chartShow: false,
      finalData: {},
      finalOption: {}
    }
  },
  computed: {
    labels() {
      return this.playerChartData.gameStats.map((data) => {
        return data.ddate
      })
    },
    gameStatsCountArr() {
      return this.playerChartData.gameStats.map((data) => {
        return data.count
      })
    }
  },
  watch: {
    isChartShow(value) {
      this.$nextTick(() => {
        // console.log(value)
        this.fillData()
      })
    }
  },
  beforeDestroy() {
    this.finalData = {}
    this.finalOption = {}
  },
  methods: {
    fillData() {
      //   console.log(this.playerChartData.gameStats)
      //   return
      const colorChip = ['#7CA1EA', '#B6CFFF', '#A1BBED', '#99AACC', '#BBC3D3']
      const _this = this

      // 바차트
      const barChart = {
        label: '게임수',
        yAxisID: 'bar',
        type: 'bar',
        barThickness: 8,
        data: this.gameStatsCountArr,
        backgroundColor: '#DBE0E4',
        order: 2
      }
      // 라인차트
      const lineChart = this.playerChartData.leagueEntryStats.map(
        (data, idx) => {
          const leaguePointArr = data.leagueEntries.map((leagueEntry) => {
            return leagueEntry.leaguePoints
          })
          return {
            label: data.summmonerName,
            yAxisID: 'line',
            type: 'line',
            borderColor: colorChip[idx],
            borderWidth: 2,
            fill: false,
            data: leaguePointArr,
            pointBorderColor: 'white', // blue point border
            pointBackgroundColor: colorChip[idx], // wite point fill
            pointBorderWidth: 1, // point border width
            order: 1
          }
        }
      )
      //   console.log(this.playerChartData.gameStats.length)

      // 차트 최종 data
      const chartData = {
        labels: this.labels,
        datasets: [barChart, ...lineChart]
      }

      this.finalData = chartData

      // 옵션
      this.finalOption = {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            fontSize: 13,
            fontFamily: '"Roboto", sans-serif',
            fontColor: '#758592',
            padding: 20
          }
        },
        tooltips: {
          enabled: false,
          intersect: false,
          axis: 'x',

          custom(tooltipModel) {
            /* console.log(
              '==================== tooltipModel ====================='
            ) */
            // console.log(chartData.labels)
            // console.log(tooltipModel)
            // console.log(tooltipModel.caretY)
            // Tooltip Element
            let tooltipEl = document.getElementById('chartjs-tooltip')

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div')
              tooltipEl.id = 'chartjs-tooltip'
              tooltipEl.innerHTML = '<table></table>'
              document.body.appendChild(tooltipEl)
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0
              return
            }

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform')
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign)
            } else {
              tooltipEl.classList.add('no-transform')
            }

            /* function getBody(bodyItem) {
              return bodyItem.lines
            } */

            // 차트 라벨 on, off 일 때 안보일 데이터 인덱스 필터
            function _filterSkippedIndex(obj) {
              // console.log(obj)
              return obj.datasets.reduce((acc, cur) => {
                for (const i in cur._meta) {
                  if (cur._meta[i].hidden === true) {
                    if (cur.label !== '게임수') {
                      acc.push(cur.label)
                    }
                  }
                }
                return acc
              }, [])
            }

            // Set Text
            if (tooltipModel.body) {
              //   const titleLines = tooltipModel.title || []
              // const bodyLines = tooltipModel.body.map(getBody)

              //   let innerHtml = '<thead>'

              //   titleLines.forEach(function(title, i) {
              //     innerHtml +=
              //       '<tr><th style=font-weight:bold;color:' +
              //       tooltipModel.labelColors[i].borderColor +
              //       '>' +
              //       title +
              //       '</th></tr>'
              //   })
              //   innerHtml += '</thead><tbody>'
              // console.log()

              // console.log(bodyLines)

              // skip 할 인덱스 배열을 리턴 받음
              const skipData = _filterSkippedIndex(chartData)

              // skip 할 인덱스 chartData에서 매칭
              const skipIndex = []
              if (skipData.length !== 0) {
                skipData.map((val, idx) => {
                  chartData.datasets.map((InnerVal, idx) => {
                    if (InnerVal.label === val) {
                      skipIndex.push(idx - 1)
                    }
                  })
                })
              }

              // console.log(skipIndex)

              // 마우스로 선택된 x축 인덱스 chartData 라벨에서 타이틀로 매칭해서 찾기
              // console.log(tooltipModel.title)
              const currentIndex = chartData.labels.indexOf(
                tooltipModel.title.toString()
              )

              const labelDate =
                _this.labelType === 7
                  ? `${_this
                      .$moment(tooltipModel.title.toString())
                      .format('MM')}월`
                  : `${_this
                      .$moment(tooltipModel.title.toString())
                      .format('MM.DD')}`
              // console.log(bodyLines)
              let innerHtml = `<tbody><tr><td>${labelDate}</td><td>${_this.gameStatsCountArr[currentIndex]}게임</td></tr>`

              // 툴팁에 데이터 바인딩 시켜서 Dom 앨리먼트로 등록
              for (let i = 0; i < chartData.datasets.length - 1; i++) {
                if (!skipIndex.includes(i)) {
                  const summmonerName =
                    _this.playerChartData.leagueEntryStats[i].summmonerName
                  const detailData =
                    _this.playerChartData.leagueEntryStats[i].leagueEntries[
                      currentIndex
                    ]
                  // const colors = tooltipModel.labelColors[i]
                  const style = `font-weight:bold; color: ${colorChip[i]}`
                  // style += '; border-color:' + colors.borderColor
                  // style += '; border-width: 2px'
                  const span = `<span style="${style}">${summmonerName}</span><br><span style="font-weight:bold">${
                    detailData.leagueRank === 'Unranked'
                      ? detailData.leagueRank
                      : detailData.tierAbbreviation + detailData.leagueRank
                  } </span><span> ${detailData.leaguePoints}LP</span>`

                  innerHtml += '<tr><td>' + span + '</td></tr>'
                }
              }

              innerHtml += '</tbody>'

              const tableRoot = tooltipEl.querySelector('table')
              tableRoot.innerHTML = innerHtml
            }

            // `this` will be the overall tooltip
            const position = this._chart.canvas.getBoundingClientRect()

            tooltipEl.style.opacity = 1
            tooltipEl.style.backgroundColor = 'rgb(255, 255, 255, .9)'
            tooltipEl.style.bodyFontColor = '#758592'
            // tooltipEl.style.borderColor = '#EBEEF1'
            // tooltipEl.style.borderWidth = 1
            tooltipEl.style.position = 'absolute'
            tooltipEl.style.left =
              position.left +
              window.pageXOffset +
              tooltipModel.caretX +
              10 +
              'px'
            tooltipEl.style.top =
              position.top + window.pageYOffset + tooltipModel.caretY / 2 + 'px'
            // position.top + window.pageYOffset + tooltipModel.caretY + 'px'
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px'
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle
            tooltipEl.style.padding = '8px 10px'
            tooltipEl.style.pointerEvents = 'none'
          }
        },
        scales: {
          xAxes: [
            {
              // barThickness: 8,
              gridLines: {
                color: 'transparent',
                display: false,
                drawBorder: false,
                zeroLineColor: 'transparent',
                zeroLineWidth: 0
              },
              ticks: {
                fontColor: '#9AA4AF',
                fontSize: 13,
                fontFamily: '"Roboto", sans-serif',
                maxTicksLimit: 14,
                callback(value, index, values) {
                  return _this.labelType === 7
                    ? `${_this.$moment(value).format('MM')}월`
                    : _this.$moment(value).format('MM.DD')
                }
              }
            }
          ],
          yAxes: [
            {
              id: 'bar',
              position: 'left',
              gridLines: {
                color: '#EBEEF1',
                borderDash: [2, 5],
                zeroLineColor: 'transparent',
                zeroLineWidth: 0
              },
              ticks: {
                fontColor: '#9AA4AF',
                fontSize: 13,
                fontFamily: '"Roboto", sans-serif',
                maxTicksLimit: 5
              }
            },
            {
              id: 'line',
              position: 'right',
              type: 'linear',
              gridLines: {
                color: '#EBEEF1',
                borderDash: [2, 5],
                zeroLineColor: 'transparent',
                zeroLineWidth: 0
              },
              ticks: {
                fontColor: '#9AA4AF',
                fontSize: 13,
                fontFamily: '"Roboto", sans-serif',
                maxTicksLimit: 5
              }
            }
          ]
        }
      }

      this.chartShow = true

      //   console.log(chartData)
      //   console.log(this.finalData)
      //   console.log(this.finalOption)
    }
  }
}
</script>
