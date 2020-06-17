<template>
  <table border style="width: 810px">
    <tr>
      <td colspan="7" style="text-align: center; font-weight: bold; font-size: 20px;">结算对账单</td>
    </tr>
    <!-- 详细信息 -->
    <tr>
      <td style="border: 1px solid black; font-weight: bold;" width="150px">结算周期</td>
      <td style="border: 1px solid black; font-weight: bold;" width="100px">游戏名称</td>
      <td style="border: 1px solid black; font-weight: bold;" width="120px">渠道名称</td>
      <td style="border: 1px solid black; font-weight: bold;" width="100px">合作方式</td>
      <td style="border: 1px solid black; font-weight: bold;" width="100px">新增人数</td>
      <td style="border: 1px solid black; font-weight: bold;" width="120px">单价（元/个）</td>
      <td style="border: 1px solid black; font-weight: bold;" width="120px">结算金额（￥）</td>
    </tr>
    <tr v-for="item in data.details" :key="item.id">
      <td style="border: 1px solid black">{{item.cycle}}</td>
      <td style="border: 1px solid black">{{item.game_name}}</td>
      <td style="border: 1px solid black">{{item.channel_name}}</td>
      <td style="border: 1px solid black">{{item.cooperate | cooperateFilter}}</td>
      <td style="border: 1px solid black">{{item.newly | newlyFilter}}</td>
      <td style="border: 1px solid black">{{Number(item.price) | 1000}}</td>
      <td style="border: 1px solid black">{{item.price * 100 * item.newly / 100 | 1000}}</td>
    </tr>
    <tr>
      <td style="border: 1px solid black">总计</td>
      <td style="border: 1px solid black"></td>
      <td style="border: 1px solid black"></td>
      <td style="border: 1px solid black"></td>
      <td style="border: 1px solid black">{{ result.totalUser | newlyFilter }}</td>
      <td style="border: 1px solid black"></td>
      <td style="border: 1px solid black">{{ result.totalMoney | 1000 }}</td>
    </tr>
    <tr>
      <td colspan="7" style="border: 1px solid black"></td>
    </tr>
    <!-- 公司信息 -->
    <tr>
      <td colspan="3" style="border: 1px solid black">结算类型</td>
      <td
        colspan="4"
        style="border: 1px solid black"
      >{{ data.company.receipts_type | receiptsTypeFilter }}</td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">发票类型</td>
      <td
        colspan="4"
        style="border: 1px solid black"
      >{{ data.company.receipt_type | receiptTypeFilter }}</td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">扣除税点</td>
      <td colspan="4" style="border: 1px solid black">{{ result.taxPoint }}</td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">扣除税额</td>
      <td colspan="4" style="border: 1px solid black">￥{{ result.tax | 1000 }}</td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">总金额</td>
      <td colspan="4" style="border: 1px solid black">￥{{ result.totalMoney | 1000 }}</td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">结算金额</td>
      <td colspan="4" style="border: 1px solid black">￥{{ result.settleMoney | 1000 }}</td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">结算人名币</td>
      <td colspan="4" style="border: 1px solid black">{{ result.settleMoney | rmbMoneyFilter }}</td>
    </tr>
    <tr>
      <td colspan="7" style="border: 1px solid black"></td>
    </tr>

    <tr>
      <td colspan="3" style="border: 1px solid black">
        <span class="complay_label">甲方公司：</span>
        <span>{{ data.company.b_name }}</span>
      </td>
      <td colspan="4" style="border: 1px solid black">
        <span class="complay_label">乙方公司：</span>
        <span>{{ data.company.a_name }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">
        <span class="complay_label">开户银行：</span>
        <span>{{ data.company.b_bank_deposit }}</span>
      </td>
      <td colspan="4" style="border: 1px solid black">
        <span class="complay_label">开户银行：</span>
        <span>{{ data.company.a_bank_deposit }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">
        <span class="complay_label">银行账号：</span>
        <span>{{ data.company.b_bank_number }}</span>
      </td>
      <td colspan="4" style="border: 1px solid black">
        <span class="complay_label">银行账号：</span>
        <span>{{ data.company.a_bank_number }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">
        <span class="complay_label">税号：</span>
        <span>{{ data.company.b_uscc }}</span>
      </td>
      <td colspan="4" style="border: 1px solid black">
        <span class="complay_label">税号：</span>
        <span>{{ data.company.a_uscc }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">
        <span class="complay_label">公司地址：</span>
        <span>{{ data.company.b_address }}</span>
      </td>
      <td colspan="4" style="border: 1px solid black">
        <span class="complay_label">公司地址：</span>
        <span>{{ data.company.a_address }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">
        <span class="complay_label">邮寄地址：</span>
        <span>{{ data.company.b_mail_address }}</span>
      </td>
      <td colspan="4" style="border: 1px solid black">
        <span class="complay_label">邮寄地址：</span>
        <span>{{ data.company.a_mail_address }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">
        <span class="complay_label">联系人：</span>
        <span>{{ data.company.b_person_charge }}</span>
      </td>
      <td colspan="4" style="border: 1px solid black">
        <span class="complay_label">联系人：</span>
        <span>{{ data.company.a_person_charge }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3" style="border: 1px solid black">
        <span class="complay_label">联系电话：</span>
        <span>{{ data.company.b_mobile }}</span>
      </td>
      <td colspan="4" style="border: 1px solid black">
        <span class="complay_label">联系电话：</span>
        <span>{{ data.company.a_mobile }}</span>
      </td>
    </tr>
  </table>
</template>
<script>
import numberUitl from 'num2capital';
import NP from 'number-precision';
import { toThousands } from '@/utils/tools';

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          details: [],
          company: {}
        };
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    result: function() {
      let totalUser = 0,
        totalMoney = 0,
        taxPoint = 0,
        tax = 0,
        settleMoney = 0;
      if (this.data.details) {
        for (let detail of this.data.details) {
          totalUser += detail.newly;
          totalMoney += NP.times(detail.newly, detail.price);
        }
        if (this.data.company.receipt_type === 1) {
          settleMoney = totalMoney;
          taxPoint = '0.00%';
        } else if (this.data.company.receipt_type === 2) {
          taxPoint = '3.72%';
          tax = NP.times(totalMoney, 0.0372);
          settleMoney = NP.minus(totalMoney, tax);
        } else if (this.data.company.receipt_type === 3) {
          taxPoint = '6.72%';
          tax = NP.times(totalMoney, 0.0672);
          settleMoney = NP.minus(totalMoney, tax);
        }
      }
      return {
        totalUser,
        totalMoney,
        settleMoney,
        taxPoint,
        tax
      };
    }
  },
  filters: {
    receiptTypeFilter(val) {
      switch (val) {
        case 1:
          return '增值税专用发票（6%）';
        case 2:
          return '增值税专用发票（3%）';
        case 3:
          return '普通发票';
        default:
          return '未知';
      }
    },
    receiptsTypeFilter(val) {
      switch (val) {
        case 1:
          return '企业';
        case 2:
          return '个人';
        default:
          return '未知';
      }
    },
    rmbMoneyFilter(money) {
      return numberUitl.num2Capital(money, 'rmb_capital');
    },
    cooperateFilter(val) {
      switch (val) {
        case 1:
          return 'CPA';
        case 2:
          return 'UV';
        case 3:
          return 'CPS';
        case 4:
          return 'CPC';
        default:
          return '未知';
      }
    },
    newlyFilter(val) {
      return toThousands(val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>