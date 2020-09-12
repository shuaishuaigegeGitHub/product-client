<template>
  <div class="product-pool-index">
    <div class="operation-show">
      <i class="icon iconfont icon-tianjia"></i>
      <i class="icon iconfont icon-lajitong" @click="garbage.visiable=true"></i>
    </div>
    <time-axis></time-axis>
    <div class="show-game-list">
      <game-card :data="item" v-for="(item,index) in gameList" :key="index"></game-card>
    </div>
    <search-sidebar></search-sidebar>
    <Garbage :dialogVisible="garbage.visiable" @handleClose="garbage.visiable=false" />
  </div>
</template>
<script>
import GameCard from './GameCard';
import SearchSidebar from './SearchSidebar';
import TimeAxis from './TimeAxis';
import Garbage from './Garbage';
export default {
  components: { GameCard, SearchSidebar, TimeAxis, Garbage },
  data() {
    return {
      garbage: {
        visiable: false
      },
      gameList: [
        {
          name: '沙漠球球',
          date: '2020.09.05',
          detail:
            '《沙漠球球》是一款超休闲的游戏，在沙漠里寻找小球，快来滑动你的手指，引导小球装车。',
          logo: 'http://www.fenglinghudong.com/img/ball.05fb0ac0.png'
        },
        {
          name: '子弹行动',
          date: '2020.08.05',
          detail:
            '《子弹行动》是一款枪类射击游戏，玩家需要操作一名特工完成行动，通过有限的子弹，消灭场景下的所有敌人，快来一起体验吧。',
          logo: 'http://www.fenglinghudong.com/img/zidan.293b93f2.png'
        },
        {
          name: '超级坦克王',
          date: '2020.07.05',
          detail:
            '《超级坦克王》是一款对战类游戏，一人一发炮弹，各种炫酷的技能，远距离炮轰，靠的就是你的预判，你敢挑战吗？',
          logo: 'http://www.fenglinghudong.com/img/tank.94f27dee.png'
        },
        {
          name: '枪王射击',
          date: '2020.06.05',
          detail:
            '《枪王射击》是一款射击类游戏，重重关卡，层层危机，枪枪爆头，开启吃鸡模式，快来展现你的火力。',
          logo: 'http://www.fenglinghudong.com/img/gun.8a72156b.png'
        },
        {
          name: '子弹行动',
          date: '2020.08.05',
          detail:
            '《子弹行动》是一款枪类射击游戏，玩家需要操作一名特工完成行动，通过有限的子弹，消灭场景下的所有敌人，快来一起体验吧。',
          logo: 'http://www.fenglinghudong.com/img/zidan.293b93f2.png'
        },
        {
          name: '超级坦克王',
          date: '2020.07.05',
          detail:
            '《超级坦克王》是一款对战类游戏，一人一发炮弹，各种炫酷的技能，远距离炮轰，靠的就是你的预判，你敢挑战吗？',
          logo: 'http://www.fenglinghudong.com/img/tank.94f27dee.png'
        },
        {
          name: '枪王射击',
          date: '2020.06.05',
          detail:
            '《枪王射击》是一款射击类游戏，重重关卡，层层危机，枪枪爆头，开启吃鸡模式，快来展现你的火力。',
          logo: 'http://www.fenglinghudong.com/img/gun.8a72156b.png'
        },
        {
          name: '枪王射击',
          date: '2020.06.05',
          detail:
            '《枪王射击》是一款射击类游戏，重重关卡，层层危机，枪枪爆头，开启吃鸡模式，快来展现你的火力。',
          logo: 'http://www.fenglinghudong.com/img/gun.8a72156b.png'
        },
        {
          name: '子弹行动',
          date: '2020.08.05',
          detail:
            '《子弹行动》是一款枪类射击游戏，玩家需要操作一名特工完成行动，通过有限的子弹，消灭场景下的所有敌人，快来一起体验吧。',
          logo: 'http://www.fenglinghudong.com/img/zidan.293b93f2.png'
        },
        {
          name: '超级坦克王',
          date: '2020.07.05',
          detail:
            '《超级坦克王》是一款对战类游戏，一人一发炮弹，各种炫酷的技能，远距离炮轰，靠的就是你的预判，你敢挑战吗？',
          logo: 'http://www.fenglinghudong.com/img/tank.94f27dee.png'
        }
        // {
        //   name: '枪王射击',
        //   date: '2020.06.05',
        //   detail:
        //     '《枪王射击》是一款射击类游戏，重重关卡，层层危机，枪枪爆头，开启吃鸡模式，快来展现你的火力。',
        //   logo: 'http://www.fenglinghudong.com/img/gun.8a72156b.png',
        // },
        // {
        //   name: '枪王射击',
        //   date: '2020.06.05',
        //   detail:
        //     '《枪王射击》是一款射击类游戏，重重关卡，层层危机，枪枪爆头，开启吃鸡模式，快来展现你的火力。',
        //   logo: 'http://www.fenglinghudong.com/img/gun.8a72156b.png',
        // },
      ],
      nowDistance: 0
    };
  },
  created() {},
  mounted() {
    window.addEventListener(
      'scroll',
      this.debounce(this.handleScroll, 300),
      true
    );
  },
  methods: {
    debounce(func, wait) {
      let timeout;
      return function() {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    },
    handleScroll: function(e) {
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
    }
  }
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

