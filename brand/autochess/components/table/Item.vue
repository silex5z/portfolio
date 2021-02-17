<template>
  <div class="wrap">
    <div class="table__wrap">
      <table class="table--left">
        <thead>
          <tr>
            <th>#</th>
            <th>티어</th>
            <th>아이템</th>
            <th>착용기물</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <Tier :num="'1'" />
            </td>
            <td>
              <Card-Text
                :name="'object'"
                :text="'부패한 영혼 수확자'"
              />
            </td>
            <td>
              <Objects
                :type="'three'"
                :names="['Abyssal Guard', 'Abyssalcrawler', 'Argali Knight']"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table--right">
        <thead>
          <tr>
            <th>하위조합</th>
            <th>상위조합</th>
            <th class="underline--blue">게임수(선택비율)</th>
            <th class="underline--blue">최종순위</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Low-Combine :item1="'skill'" :item2="'item'" />
            </td>
            <td>
              <High-Combine :item1="'skill'" :item2="'item'" />
            </td>
            <td>10213(12%)</td>
            <td>
              <Bar-Chart :nums="[15, 25, 75, 35, 49, 39, 20, 50]" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pageCount="7" class="pagination" />
  </div>
</template>

<script>
import Tier from '@/components/icons/Tier/index'
import Objects from '@/components/icons/Objects/index'
import CardText from '@/components/text/CardText'
import LowCombine from '@/components/icons/Item/LowCombine'
import HighCombine from '@/components/icons/Item/HighCombine'
import Pagination from '@/components/pagination/Pagination'
import BarChart from '@/components/chart/BarChart'

export default {
  components: {
    Tier,
    Objects,
    CardText,
    LowCombine,
    HighCombine,
    Pagination,
    BarChart
  }
}
</script>

<style lang="scss" scoped>
.table__wrap {
  display: flex;
  overflow-x: auto;
  max-width: 740px;
  margin: 12px auto 24px;
  border-radius: 4px;
  background-color: #fff;

  table {
    width: 100%;
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
        padding: 3px 0;
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
</style>
