<template>
  <div class="product-pool-index">
    <div class="operation-show">
      <rotate-select></rotate-select>
    </div>
    <time-axis></time-axis>
    <div class="show-game-list">
      <game-card :data="item" v-for="(item,index) in gameList" :key="index"></game-card>
    </div>
    <search-sidebar></search-sidebar>
    <Garbage></Garbage>
    <AddProduct :dialogVisible="addProduct.visiable" @handleClose="addProduct.visiable=false" />
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
      nowDistance: 0,
    };
  },
  computed: {
    // gameList() {
    //   return this.$store.state.productPool.gameList;
    // },
  },
  created() {
    this.initData();
  },
  mounted() {
    window.addEventListener(
      'scroll',
      this.debounce(this.handleScroll, 300),
      true
    );
  },
  methods: {
    async initData() {
      let res = await productSearch({ del: 1 });
      if (res.code === 1000) {
        this.$store.commit('productPool/SET_GAME_LIST', res.data);
        this.gameList = res.data;
        console.log(this.gameList);
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
    handleScroll: function (e) {
      this.nowDistance++;
      var top = Math.floor(
        document.body.scrollTop ||
          document.documentElement.scrollTop ||
          window.pageXOffset
      );
      console.log(top);
      // var scrollTop =
      //   window.pageYOffset ||
      //   document.documentElement.scrollTop ||
      //   document.body.scrollTop;
      // var scroll = scrollTop - this.i;
      // this.i = scrollTop;
      // console.log(this.i);
      // if (scroll < 0) {
      //   console.log('up');
      // } else {
      //   console.log('down');
      // }
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
}
</style>

