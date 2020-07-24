<template>
  <div class="cc-calendar">
    <calendarHeader
      :headOptions="headOptions"
      @handlePrevMonth="handlePrevMonth"
      @handleNextMonth="handleNextMonth"
      @handleToday="handleToday"
    />
    <!-- 星期表头 -->
    <ul class="calendar-week clear">
      <li v-for="(item, index) in calendarTitleArr" :key="index" class="week-item">{{item}}</li>
    </ul>
    <ul class="calendar-view clear">
      <li
        v-for="(item, index) in visibleCalendar"
        :key="index"
        class="date-view"
        :style="clickStyle(item)"
        @click="handleClickDay(item)"
      >
        <!--  日期在左边  <span class="date-day">{{item.date}}</span> -->
        <span :style="fontStyle(item)" class="calendar-num">{{item.date}}</span>
        <div :class="spotClass(item)"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import calendarHeader from './calendar-head';
import { monthDate } from '../../../utils/calendar';
export default {
  components: { calendarHeader },
  props: {
    // 判断是否展示日期下方点传入数组里面为对象key是天数，值1为蓝色2为红色其他不显示
    spotData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 星期几头部
      calendarTitleArr: ['日', '一', '二', '三', '四', '五', '六'],
      // 日期显示
      visibleCalendar: [],
      // 年份
      year: '',
      // 月份
      month: '',
      // 日
      date: '',
      // 时间
      time: '',
      headOptions: ''
    };
  },
  mounted() {
    this.time = new Date();
    this.timedataFormat();
    // this.day = this.time.getDay();
  },
  methods: {
    // 标题日期赋值
    setheadOptions() {
      this.headOptions = this.year + '年';
      if (this.month + 1 < 10) {
        this.headOptions += '0';
      }
      this.headOptions += this.month + 1 + '月';
      if (this.date < 10) {
        this.headOptions += '0';
      }
      this.headOptions += this.date + '日';
    },
    // 判读点的颜色
    spotClass(item) {
      if (item.month != this.month) {
        return;
      }
      let result = '';
      if (this.spotData) {
        let it = this.spotData[item.date];
        if (it == 1) {
          result = 'spotClassSuss';
        } else if (it == 2) {
          result = 'spotClassErr';
        }
      }

      return result;
    },
    //当前选中日期的样式
    clickStyle(item) {
      let result = '';
      if (item.month == this.month && this.date == item.date) {
        result = 'background: #fb0;';
      }
      return result;
    },
    // 字体样式
    fontStyle(item) {
      let style = '';
      if (item.month !== this.month) {
        style = 'color:#dcdfe6';
      } else if (item.month == this.month && this.date == item.date) {
        style = 'color: #fff';
      }
      return style;
    },
    // 日历数据
    timedataFormat() {
      this.year = this.time.getFullYear();
      this.month = this.time.getMonth();
      this.date = this.time.getDate();
      let result = monthDate(this.year, this.month);
      this.visibleCalendar = result;
      this.setheadOptions();
      // 月分变动和初始化日历数据返回年月日给父级组件
      this.$emit('timedataFormat', {
        year: this.year,
        month: this.month,
        date: this.date
      });
      // console.log(result);
    },
    // 日期点击
    handleClickDay(item) {
      if (item.month != this.month) {
        return;
      }
      this.date = item.date;
      this.time = new Date(this.year, this.month, this.date);
      this.setheadOptions();
      this.$emit('handleClickDay', this.time);
    },
    isCurrentMonth() {},
    // 回到今天
    handleToday() {
      this.time = new Date();
      this.timedataFormat();
    },
    // 下一个月
    handleNextMonth() {
      this.time.setDate(1);
      this.time.setMonth(this.time.getMonth() + 1);
      this.timedataFormat();
    },
    // 上一个月
    handlePrevMonth() {
      this.time.setDate(1);
      this.time.setMonth(this.time.getMonth() - 1);
      this.timedataFormat();
    }
  }
};
</script>

<style  lang="scss" scoped>
.cc-calendar {
  padding: 23px 30px 30px;
  width: 500px;
  height: 530px;
  box-sizing: border-box;
  margin: 0;

  .calendar-week {
    width: 100%;
    height: 46px;
    line-height: 46px;
    border-top: 1px solid #e4e7ea;
    border-bottom: 1px solid #e4e7ea;
    border-right: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .week-item {
      // float: left;
      width: 14.2%;
      text-align: center;
      font-size: 14px;
      color: #424953;
      // border-right: 1px solid #e4e7ea;
      font-weight: 600;
    }
  }
  .calendar-view {
    width: 100%;
    border-left: 1px solid #e4e7ea;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    .date-view {
      // float: left;
      width: 14.2%;
      height: 70px;
      text-align: center;
      // border-right: 1px solid #e4e7ea;
      border-bottom: 1px solid #e4e7ea;
      cursor: pointer;
      .date-day {
        padding: 8px 8px 0;
        display: block;
        width: 100%;
        font-size: 14px;
        color: #7f8794;
      }
      .calendar-num {
        margin-top: 6px;
        display: block;
        width: 100%;
        text-align: center;
        font-size: 30px;
        color: #424953;
      }
      // 日期下方原点，警告样式
      .spotClassErr {
        width: 5px;
        height: 5px;
        border: 1px solid;
        border-radius: 3px;
        border-color: red;
        background-color: red;
        position: relative;
        left: 47%;
      }
      // 日期下方原点，成功样式
      .spotClassSuss {
        width: 5px;
        height: 5px;
        border: 1px solid;
        border-radius: 3px;
        border-color: #2061ff;
        background-color: #2061ff;
        position: relative;
        left: 47%;
      }
    }
    .opacity-class {
      opacity: 0.5;
    }
    .month-class {
      background-image: linear-gradient(
        45deg,
        rgba(000, 000, 000, 0.03) 25%,
        transparent 25%,
        transparent 50%,
        rgba(000, 000, 000, 0.03) 50%,
        rgba(000, 000, 000, 0.03) 75%,
        transparent 75%,
        transparent
      );
      background-size: 20px 20px;
    }
    .todayBg {
      background: #fffdef;
    }
    .handleDay {
      background: #2061ff !important;
      .date-day {
        color: #bccfff !important;
      }
      .calendar-num {
        color: #fff !important;
      }
    }
  }
}
</style>