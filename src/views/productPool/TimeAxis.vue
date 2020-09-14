<template>
  <div class="time-axis" ref="timeAxis">
    <div class="itme-axis" v-for="(item,index) in timeList" :key="index">
      <div class="item-axis-sig" @click="tollgleAxis(index)">
        <i class="icon iconfont icon-circleyuanquan" v-if="item.isActived"></i>
        <i class="icon iconfont icon-circle2yuanquan" v-else></i>
        <p style="margin-left:6px;">{{item.value}}</p>
      </div>
      <div class="single-line"></div>
    </div>
    <i class="icon iconfont icon-xiasanjiaoxing" @click="addlineDate"></i>
  </div>
</template>
<script>
import dayjs from 'dayjs';
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
    this.timeList = this.$store.state.productPool.dateList;
  },
  mounted() {
    this.$refs.timeAxis.style['margin-top'] = `${this.HEIGHT * 0.17}px`;
  },
  methods: {
    tollgleAxis(index) {
      this.timeList = this.timeList.map((item) => ({
        isActived: false,
        value: item.value,
      }));
      this.timeList[index].isActived = true;
    },
    addlineDate() {
      this.timeList.shift();
      let date = new Date(
        this.timeList[this.timeList.length - 1].value
      ).getTime();
      date = dayjs(date - 86400000).format('YYYY-MM');
      this.timeList.push({
        isActived: false,
        value: date,
      });
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
      height: 50px;
      border: 2px dotted rgba(203, 200, 181, 0.9);
      position: relative;
      z-index: 1;
      left: 9px;
    }
  }
  .icon-xiasanjiaoxing {
    font-size: 23px;
    color: rgba(203, 200, 181, 0.9);
    position: relative;
    top: -8px;
    left: 9px;
  }
}
</style>

