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
            <th>골드</th>
            <th>실버</th>
            <th>챔피언쉽</th>
            <th>총 ACP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1000</td>
            <td>100</td>
            <td>500</td>
            <td>
              <b>1600</b>
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

export default {
  components: {
    RankingTier,
    Pagination
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
