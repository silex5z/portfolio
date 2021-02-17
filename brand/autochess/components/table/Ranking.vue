<template>
  <div class="wrap">
    <div class="table__wrap">
      <table class="table--left">
        <thead>
          <tr>
            <th>랭킹</th>
            <th>국가</th>
            <th>아바타</th>
            <th>레벨</th>
            <th>닉네임</th>
            <th>티어</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <img class="icon" src="~@/assets/img/icons/flag/korea.png" alt />
            </td>
            <td>
              <img class="icon" src="~@/assets/img/temp/avatar.png" alt />
            </td>
            <td>122</td>
            <td>abcd</td>
            <td>
              <Ranking-Tier :tier="'pawn'" :num="'1'" />
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table--right">
        <thead>
          <tr>
            <th>점수</th>
            <th>평균순위</th>
            <th>승리횟수</th>
            <th>선호시너지</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>22</td>
            <td>20.9</td>
            <td>112</td>
            <td>
              <div class="lineUp__box">
                <Line-Up :name="'Priest'" :num="'4'" />
                <Line-Up :name="'Shaman'" :num="'6'" />
                <Line-Up :name="'Warlock'" :num="'1'" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pageCount="7" class="pagination" />
  </div>
</template>

<script>
import RankingTier from '@/components/icons/Tier/Ranking'
import Pagination from '@/components/pagination/Pagination'
import LineUp from '@/components/icons/LineUp/index'

export default {
  components: {
    RankingTier,
    Pagination,
    LineUp
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
}

.table__wrap {
  display: flex;
  overflow-x: auto;
  max-width: 740px;
  margin: 12px auto 24px;
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
