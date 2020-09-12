<template>
  <div class="system-menu-content" @click.stop="handleSystemMenu">
    <div class="bg bg-blur"></div>
    <div class="system-menu">
      <div
        v-for="(item, index) in systemMenu"
        :key="index"
        :index="item.path"
        class="system-menus"
        @click.stop="handleSelect(item.path)"
      >
        <el-image style="width: 100px; height: 100px" :src="item.icon.split(' ')[1]" fit="fit"></el-image>
        <span slot="title" style="color:#fff;margin-top:10px;font-size:16px">{{item.menu_name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import anime from 'animejs';

export default {
  name: 'ChangingOver',
  data() {
    return {
      collapse: false,
      // 系统菜单
      systemMenu: [],
      systemMenuVisible: false,
    };
  },
  methods: {
    handleSystemMenu(callback) {
      let that = this;
      if (that.systemMenuVisible) {
        this.changeFilter();
      } else {
        anime({
          targets: '.system-menu-content',
          height: 'calc(100vh - 50px)',
          easing: 'easeInOutCubic',
        });
      }
      if (that.collapse) {
        that.collapseChage();
      }
      that.systemMenuVisible = !that.systemMenuVisible;
    },
    handleSelect(path) {
      if (path) {
        window.location.href = path;
      }
    },
    changeFilter() {
      this.$emit('changeFilter');
    },
  },
  mounted() {
    this.$axios({
      url: '/permission/system',
      method: 'get',
    }).then((res) => {
      this.systemMenu = res.data;
      this.systemMenu = this.systemMenu.map((item) => {
        if (!item.icon.startsWith('el-icon')) {
          item.icon = 'iconfont ' + item.icon;
        }
        return item;
      });
    });
    this.handleSystemMenu();
  },
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss"  scoped>
.system-menu-content {
  position: fixed;
  z-index: 9999 !important;
  width: 100%;
  overflow: hidden;
  margin-top: 50px;
}
.system-menu {
  color: black;
  font-size: 40px;
  width: 100%;
  position: absolute;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  padding: 5% 1% 5% 18%;
  width: 90%;
  box-sizing: border-box;
}
.bg {
  background: url('../assets/img/beijing.gif');
  height: 100%;
  text-align: center;
  line-height: 600px;
}
.bg-blur {
  float: left;
  width: 102%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(40px);
  transform: scale(1.2);
}

.system-menus {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 8%;
  height: 10%;
  margin: 5%;
}
</style>
