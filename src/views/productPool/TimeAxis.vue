<template>
  <div class="time-axis" ref="timeAxis">
    <i class="icon iconfont icon-Up-1" @click="upLineDate"></i>
    <div class="itme-axis" v-for="(item,index) in timeList" :key="index">
      <div class="item-axis-sig" @click="tollgleAxis(index)">
        <i class="icon iconfont icon-circleyuanquan" v-if="item.isActived"></i>
        <i class="icon iconfont icon-circle2yuanquan" v-else></i>
        <p style="margin-left:6px;">{{item.value}}</p>
      </div>
      <div class="single-line" v-if="Number(timeList.length-1) !== index"></div>
    </div>
    <i class="icon iconfont icon-down" @click="downLineDate"></i>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import bus from '../../utils/bus';
import { deepClone } from '@/utils/tools';
export default {
  data() {
    return {
      HEIGHT: window.innerHeight,
      timeList: [],
    };
  },
  computed: {
    // timeList() {
    //   return this.$store.state.productPool.dateList;
    // },
  },
  created() {
    this.timeList = deepClone(this.$store.state.productPool.dateList);
  },
  mounted() {
    this.$refs.timeAxis.style['margin-top'] = `${this.HEIGHT * 0.17}px`;
    bus.$on('toggle_axis', (index) => {
      this.tollgleAxis(index);
    });
    bus.$on('set_month_list', (data) => {
      this.timeList = deepClone(data);
    });
  },
  methods: {
    tollgleAxis(index) {
      this.timeList = this.timeList.map((item) => ({
        isActived: false,
        value: item.value,
      }));
      this.timeList[index].isActived = true;
      bus.$emit('time_axis_init_date', this.timeList[index].value);
    },
    upLineDate() {
      let lastTimeAxisIndex = this.timeList.findIndex((item) => item.isActived);
      let leg = this.timeList.length;
      let date = new Date(this.timeList[0].value).getTime();
      date = dayjs(date + 86400000 * 31).format('YYYY-MM');
      this.timeList = this.timeList.map((item) => ({
        isActived: false,
        value: item.value,
      }));
      if (lastTimeAxisIndex !== 0) {
        this.timeList[lastTimeAxisIndex - 1].isActived = true;
        bus.$emit(
          'time_axis_init_date',
          this.timeList[lastTimeAxisIndex - 1].value
        );
      } else {
        this.timeList.pop();
        this.timeList.unshift({
          isActived: true,
          value: date,
        });
        bus.$emit('time_axis_init_date', this.timeList[0].value);
      }
    },
    downLineDate() {
      let lastTimeAxisIndex = this.timeList.findIndex((item) => item.isActived);
      let leg = this.timeList.length;
      let date = new Date(this.timeList[leg - 1].value).getTime();
      date = dayjs(date - 86400000).format('YYYY-MM');
      this.timeList = this.timeList.map((item) => ({
        isActived: false,
        value: item.value,
      }));
      if (lastTimeAxisIndex !== leg - 1) {
        this.timeList[lastTimeAxisIndex + 1].isActived = true;
        bus.$emit(
          'time_axis_init_date',
          this.timeList[lastTimeAxisIndex + 1].value
        );
      } else {
        this.timeList.shift();
        this.timeList.push({
          isActived: true,
          value: date,
        });
        bus.$emit(
          'time_axis_init_date',
          this.timeList[this.timeList.length - 1].value
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.time-axis {
  .itme-axis {
    padding: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
    cursor: pointer;
    .item-axis-sig {
      display: flex;
      align-items: center;
      color: rgba(181, 196, 213, 0.6);
      font-weight: 500;
      i {
        font-size: 22px;
        font-weight: 900;
        color: rgba(203, 200, 181, 0.6);
      }
      i:hover {
        color: rgba(203, 200, 181, 1);
      }
      p:hover {
        color: rgba(181, 196, 213, 1);
      }
    }
    .single-line {
      width: 0px;
      height: 40px;
      border: 2px dotted rgba(203, 200, 181, 0.9);
      position: relative;
      z-index: 1;
      left: 9px;
    }
  }
  .icon-Up-1 {
    font-size: 23px;
    color: #d7d5bf;
    position: relative;
    top: -4px;
    left: 9px;
  }
  .icon-down {
    font-size: 23px;
    color: #d7d5bf;
    position: relative;
    margin-top: 10px;
    top: 4px;
    left: 9px;
  }
  .icon-down:hover,
  .icon-Up-1:hover {
    color: #4f707b;
    cursor: pointer;
  }
}
</style>

