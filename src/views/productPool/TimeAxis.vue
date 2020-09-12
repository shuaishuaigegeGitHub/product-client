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
    <i class="icon iconfont icon-xiasanjiaoxing"></i>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeList: [
        {
          isActived: false,
          value: '2020-09',
        },
        {
          isActived: false,
          value: '2020-08',
        },
        {
          isActived: true,
          value: '2020-07',
        },
        {
          isActived: false,
          value: '2020-06',
        },
        {
          isActived: false,
          value: '2020-05',
        },
        {
          isActived: false,
          value: '2020-04',
        },
        {
          isActived: false,
          value: '2020-03',
        },
      ],
      HEIGHT: window.innerHeight,
    };
  },
  created() {},
  mounted() {
    this.$refs.timeAxis.style['margin-top'] = `${this.HEIGHT * 0.17}px`;
  },
  methods: {
    showDetail() {},
    tollgleAxis(index) {
      this.timeList = this.timeList.map((item) => ({
        isActived: false,
        value: item.value,
      }));
      this.timeList[index].isActived = true;
    }
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
      color: #b5c4d5;
      font-weight: 500;
      i {
        font-size: 22px;
        font-weight: 900;
        color: rgba(203, 200, 181, 0.6);
      }
      i:hover {
        color: rgba(203, 200, 181, 1);
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

