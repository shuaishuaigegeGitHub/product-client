<template>
  <div class="product-pool-index" @mousewheel="handleScroll">
    <div class="operation-show">
      <rotate-select></rotate-select>
    </div>
    <time-axis></time-axis>
    <div class="show-game-list">
      <game-card :data="item" v-for="(item,index) in gameList" :key="index"></game-card>
    </div>
    <div class="scroll-ring">
      <div
        class="ring"
        ref="ring"
        v-for="(item,index) in pageList"
        :key="index"
        :style="item.isActived?'background-color: rgb(215, 213, 191);':''"
        @click="toggleGamePage(index)"
      ></div>
    </div>
    <search-sidebar></search-sidebar>
    <Garbage></Garbage>
    <add-product></add-product>
  </div>
</template>
<script>
import GameCard from './GameCard';
import SearchSidebar from './SearchSidebar';
import TimeAxis from './TimeAxis';
import Garbage from './Garbage';
import AddProduct from './AddProduct';
import RotateSelect from './RotateSelect';
import { productSearch } from '../../api/productPool';
export default {
  components: {
    GameCard,
    SearchSidebar,
    TimeAxis,
    Garbage,
    AddProduct,
    RotateSelect,
  },
  data() {
    return {
      // 回收站标识
      // garbage: false,
      // garbage: {
      //   visiable: false,
      // },
      gameList: [],
      addProduct: {
        visiable: false,
        row: {},
        title: '添加',
      },
      nowTimeLeg: 0,
      isScrollOver: true,
      pageList: [],
    };
  },
  computed: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      let res = await productSearch({ del: 1 });
      if (res.code === 1000) {
        this.$store.commit('productPool/SET_GAME_LIST', res.data);
        this.gameList = res.data;
        // console.log(this.gameList);
      }
    },
    debounce(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    },
    handleScroll(e) {
      let that = this;
      if (e.deltaY > 3) {
        if (this.isScrollOver) {
          that.isScrollOver = false;
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            that.isScrollOver = true;
            // console.log('向下滚动');
          }, 500);
        }
      } else if (e.deltaY < -3) {
        if (this.isScrollOver) {
          that.isScrollOver = false;
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            that.isScrollOver = true;
            // console.log('向上滚动');
          }, 500);
        }
      }
    },
    // 切换当前月份的游戏页面
    toggleGamePage(index) {
      for (let i in this.pageList) {
        this.pageList[i].isActived = false;
      }
      this.pageList[index].isActived = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.product-pool-index {
  padding: 15px;
  width: 100%;
  height: 100%;
  background-color: beige;
  display: flex;
  .operation-show {
    position: fixed;
    right: 30px;
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: space-between;
    i {
      font-size: 40px;
      color: rgba(56, 149, 251, 0.7);
      cursor: pointer;
    }
    i:hover {
      color: rgba(56, 149, 251, 0.9);
    }
  }
  .time-axis {
    flex: 1;
  }
  .show-game-list {
    padding-top: 30px;
    display: flex;
    flex-wrap: wrap;
    flex: 9;
  }
  .scroll-ring {
    // width: 350px;
    height: 16px;
    padding: 2px;
    padding-left: 5px;
    padding-right: 5px;
    box-sizing: border-box;
    // border: 2px solid rgb(215, 213, 191);
    border-radius: 20px;
    position: fixed;
    bottom: 30px;
    left: 45%;
    display: flex;
    .ring {
      width: 50px;
      height: 8px;
      border: 2px solid rgb(215, 213, 191);
      border-radius: 10px;
      cursor: pointer;
      margin: 0 10px;
    }
  }
}
</style>

