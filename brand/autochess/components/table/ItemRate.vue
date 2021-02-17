<template>
  <div class="wrap">
    <table class="table--left">
      <thead>
        <tr>
          <th>성급</th>
          <th>착용 아이템</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Three-Star :rank="'3'" :fixed="false" />
          </td>
          <td>
            <div class="item__rate__box">
              <Card-Text :type="'itemRate'" :name="'object'" :text="'95%'" />
              <Card-Text :type="'itemRate'" :name="'object'" :text="'95%'" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table--right">
      <thead>
        <tr>
          <th>게임수(선택비율)</th>
          <th>평균 라운드</th>
          <th>최종순위</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>12.345(12.3%)</td>
          <td>3.5</td>
          <td>
            <Bar-Chart :nums="[15, 25, 75, 35, 49, 39, 20, 50]" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ThreeStar from '@/components/icons/Shape/Three-Star'
import CardText from '@/components/text/CardText'
import BarChart from '@/components/chart/BarChart'

export default {
  name: 'HomeTable',
  components: {
    ThreeStar,
    CardText,
    BarChart
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  overflow-x: auto;
  max-width: 740px;
  margin: 0 auto;
  border-radius: 4px;
  background-color: #fff;

  table {
    width: 100%;
    color: #57646f;
    font-size: 12px;

    thead {
      color: #9aa4af;

      th {
        padding: 12px 0 6px;
        background-color: #f7f7f9;
      }
    }

    tbody {
      tr {
        &:nth-child(even) {
          td {
            background-color: #f7f7f9;
          }
        }
      }
      td {
        vertical-align: middle;
        text-align: center;
        height: 40px;
        border-bottom: 1px solid #ebeef1;
      }

      tr {
        &:last-child {
          td {
            border-bottom: 0;
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    table {
      flex: 0 0 100%;
    }
  }

  .table--left {
    thead {
      th {
        &:first-child {
          padding: 0 12px;
          border-radius: 4px 0 0 0;
        }
      }
    }

    tbody {
      tr {
        &:last-child {
          td {
            &:first-child {
              border-radius: 0 0 0 4px;
            }
          }
        }
      }
    }
  }
  .table--right {
    thead {
      th {
        &:last-child {
          border-radius: 0 4px 0 0;
        }
      }
    }

    tbody {
      tr {
        &:last-child {
          td {
            &:last-child {
              border-radius: 0 0 4px 0;
            }
          }
        }
      }
    }
  }
}

.item__rate__box {
  display: flex;

  > div {
    margin-left: 6px;

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
