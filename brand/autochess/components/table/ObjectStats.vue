<template>
  <div class="object__stats">
    <table class="table--left">
      <thead>
        <tr>
          <th>성급</th>
          <th>생명력</th>
          <th>방어력</th>
          <th>마법 저항력</th>
          <th>공격력</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Three-Star :rank="'3'" :fixed="false" />
          </td>
          <td>550</td>
          <td>4</td>
          <td>45%</td>
          <td>50</td>
        </tr>

        <tr>
          <td>
            <Three-Star :rank="'1'" :fixed="false" />
          </td>
          <td>550</td>
          <td>4</td>
          <td>45%</td>
          <td>50</td>
        </tr>
      </tbody>
    </table>
    <table class="table--right">
      <thead>
        <tr>
          <th>공격속도</th>
          <th>공격사거리</th>
          <th>기수에게 주는 피해량</th>
          <th>판매가</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1.2</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>

        <tr>
          <td>1.2</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ThreeStar from '@/components/icons/Shape/Three-Star'

export default {
  name: 'HomeTable',
  components: {
    ThreeStar
  }
}
</script>

<style lang="scss" scoped>
.object__stats {
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

@media (min-width: 768px) and (max-width: 1280px) {
  .object__stats {
    margin-top: 24px;
  }
}

@media (max-width: 767px) {
  .object__stats {
    margin-top: 13px;
  }
}
</style>
