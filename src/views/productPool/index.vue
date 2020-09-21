<template>
  <div class="product-pool-index">
    <div class="operation-show">
      <rotate-select></rotate-select>
    </div>
    <time-axis></time-axis>
    <div class="show-game-list">
      <game-card :data="item" v-for="(item,index) in showGameList" :key="index"></game-card>
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
import { queryUser } from '../../api/user';
import { deepClone } from '../../utils/tools';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
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
      gameList: [],
      addProduct: {
        visiable: false,
        row: {},
        title: '添加',
      },
      nowTimeLeg: 0,
      isScrollOver: true,
      pageList: [],
      showGameList: [],
      currentId: 0,
    };
  },
  created() {
    this.initData();
    this.initUser();
  },
  mounted() {
    bus.$on('time_axis_init_date', (month) => {
      this.initData(month);
    });
    bus.$on('update_filter_data', (data) => {
      this.updateData(data);
    });
    bus.$on('init_data', () => {
      let data = deepClone(this.$store.state.productPool.filterSelectd);
      this.updateData(data);
    });
    // 监听鼠标滚轮事件
    // window.addEventListener(
    //   'mousewheel',
    //   this.debounce(this.handleScroll, 500),
    //   true
    // ) ||
    //   window.addEventListener(
    //     'DOMMouseScroll',
    //     this.debounce(this.handleScroll, 500),
    //     false
    //   );
  },
  methods: {
    // 初始化所有用户列表
    async initUser() {
      let res = await queryUser();
      if (res.code === 1000) {
        this.$store.commit('productPool/SET_USER_LIST', deepClone(res.data));
        console.log(res.data);
      }
    },
    // 项目列表初始化
    async initData(month = '') {
      month = month ? month : this.$store.state.productPool.dateList[0].value;
      this.pageList = [];
      let res = await productSearch({ del: 1, month, status: 1 });
      if (res.code === 1000) {
        this.$store.commit('productPool/SET_GAME_LIST', res.data);
        this.gameList = res.data;
        let leg = res.data.length;
        if (window.innerWidth > 2000) {
          for (let i = 0; i < leg; i = i + 14) {
            this.pageList.push({
              isActived: false,
            });
          }
          this.showGameList = deepClone(this.gameList.slice(0, 14));
        } else {
          for (let i = 0; i < leg; i = i + 10) {
            this.pageList.push({
              isActived: false,
            });
          }
          this.showGameList = deepClone(this.gameList.slice(0, 10));
        }
        if (this.pageList.length) {
          this.pageList[0].isActived = true;
        }
      }
    },
    // 项目列表更新
    async updateData(data) {
      this.pageList = [];
      let param = {};
      if (data.product_type) {
        param.project_type = data.product_type;
      }
      if (data.tech_type) {
        param.technology_type = data.tech_type;
      }
      if (data.product_source) {
        param.source = data.product_source;
      }
      if (data.game_type) {
        param.theme = data.game_type;
      }
      if (data.first_platform) {
        param.starting = data.first_platform;
      }
      if (data.group) {
        param.pool_id = data.group;
      }
      if (data.date) {
        param.month = data.date;
        let monthList = deepClone(this.$store.state.productPool.dateList);
        let monthIndex = monthList.findIndex(
          (item) => item.value === data.date
        );
        if (monthIndex != -1) {
          bus.$emit('toggle_axis', monthIndex);
        } else {
          let monthlist = [];
          let nextMonth = new Date(data.date).getTime();
          for (let i = 0; i < 7; i++) {
            monthlist.push({
              isActived: false,
              value: dayjs(nextMonth).format('YYYY-MM'),
            });
            nextMonth = new Date(dayjs(nextMonth).format('YYYY-MM')).getTime();
            nextMonth = nextMonth - 86400000 * 2;
          }
          monthlist[0].isActived = true;
          this.$store.commit(
            'productPool/FRESH_DATE_LIST',
            deepClone(monthlist)
          );
          bus.$emit('set_month_list', deepClone(monthlist));
        }
      } else {
        let monthNow = deepClone(this.$store.state.productPool.dateList).filter(
          (item) => item.isActived === true
        );
        param.month = monthNow.length
          ? monthNow[0].value
          : dayjs().format('YYYY-MM');
      }
      let res = await productSearch({ del: 1, ...param, status: 1 });
      if (res.code === 1000) {
        this.$store.commit('productPool/SET_GAME_LIST', deepClone(res.data));
        this.gameList = deepClone(res.data);
        let leg = res.data.length;
        if (!leg) {
          this.showGameList = [];
          return false;
        }
        if (window.innerWidth > 2000) {
          for (let i = 0; i < leg; i = i + 14) {
            this.pageList.push({
              isActived: false,
            });
          }
          this.showGameList = deepClone(this.gameList.slice(0, 14));
        } else {
          for (let i = 0; i < leg; i = i + 10) {
            this.pageList.push({
              isActived: false,
            });
          }
          this.showGameList = deepClone(this.gameList.slice(0, 10));
        }
        this.pageList[0].isActived = true;
      }
    },
    // 节流函数
    debounce(func, wait) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
          }, wait);
        }
      };
    },
    // 切换当前月份的游戏页面
    toggleGamePage(index) {
      for (let i in this.pageList) {
        this.pageList[i].isActived = false;
      }
      this.pageList[index].isActived = true;
      this.showGameList = deepClone(
        this.gameList.slice(index * 10, index * 10 + 10)
      );
    },

    handleScroll(e) {
      if (e.deltaY >= 0) {
        console.log('向上滚动');
        bus.$emit('scroll_direction', 'up');
      } else if (e.deltaY < 0) {
        console.log('向下滚动');
        bus.$emit('scroll_direction', 'down');
      }
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

