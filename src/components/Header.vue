<template>
  <div class="header">
    <div class="logo">
      <div class="collapse-btn" @click="changeFilter">
        <i class="el-icon-menu fin-tour-step-4"></i>
      </div>
      <div class="logo-name">产品项目管理系统</div>
    </div>
    <div class="header-menu">
      <div class="menu-control" @click="collapseChage">
        <i class="el-icon-s-operation fin-tour-step-2"></i>
      </div>
      <div class="header-menu-content">
        <div class="header-menu-item" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank fin-tour-step-1"></i>
          </el-tooltip>
        </div>
        <div class="header-menu-item">
          <el-tooltip effect="dark" content="系统引导" placement="bottom">
            <i class="el-icon-help fin-tour-step-0" @click="beginTour"></i>
          </el-tooltip>
        </div>
        <div class="header-menu-item img">
          <img class="user-avator" src="../assets/img/logo.png" width="40" height="40" />
        </div>
        <el-dropdown class="header-menu-item user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link" style="color: #ffffff">
            {{ user.userName || '未知用户' }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <system-menu :visible.sync="systemMenuVisible"></system-menu>
    <changing-over v-if="isFilter" @changeFilter="changeFilter"></changing-over>
    <fin-tour ref="finTour"></fin-tour>
  </div>
</template>
<script>
import bus from '../utils/bus';
import config from '@/config';
import { removeToken } from '@/utils/auth';
import SystemMenu from './SystemMenu';
import FinTour from '@/components/custom/FinTour';
import { getUserinfo } from '@/api/permission';
import anime from 'animejs';
import changingOver from './ChangingOver';
export default {
  components: {
    SystemMenu,
    FinTour,
    changingOver
  },
  data() {
    return {
      collapse: false,
      fullscreen: false,
      user: {
        uid: null,
        username: '未知用户'
      },
      systemMenuVisible: false,
      isFilter: false
    };
  },
  methods: {
    changeFilter(callback) {
      if (this.isFilter) {
        let option = {
          targets: '.system-menu-content',
          height: 'calc(0vh)',
          easing: 'easeInOutQuad',
          duration: 800
        };
        if (typeof callback === 'function') {
          option.complete = callback;
        }
        anime(option);
        setTimeout(() => {
          this.isFilter = false;
        }, 800);
      } else {
        this.isFilter = true;
      }
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        removeToken();
        window.location.href = config.loginUrl;
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    handleMouseEnter() {
      this.systemMenuVisible = true;
    },
    handleSystemMenu() {
      this.systemMenuVisible = !this.systemMenuVisible;
    },
    beginTour() {
      // if (this.$route.path !== '/income/statement') {
      //   this.$router.push({ path: '/income/statement' });
      //   // NOTE: 避免跳转后出现找不到元素等问题
      //   setTimeout(() => {
      //     this.$refs.finTour.start();
      //   }, 1000);
      // } else {
      //   this.$refs.finTour.start();
      // }
      this.$refs.finTour.start();
    }
  },
  mounted() {
    if (document.body.clientWidth < 1200) {
      this.collapseChage();
    }
    if (!config.dev) {
      getUserinfo().then(res => {
        this.user = res.data;
        window.sessionStorage.setItem('user', JSON.stringify(this.user));
        this.$store.commit('user/SET_USER', this.user);
        if (res.data.first_login) {
          if (
            sessionStorage.getItem(config.firstLoginKey + this.user.uid) ===
            null
          ) {
            this.beginTour();
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  line-height: 50px;
  color: #ffffff;

  .logo {
    width: 180px;
    display: flex;

    .collapse-btn {
      padding: 0 20px;
      background-color: #3e4c71;
      cursor: pointer;
    }

    .logo-name {
      text-align: center;
      flex-grow: 1;
      font-size: 1.2rem;
    }
  }

  .header-menu {
    flex-grow: 1;
    display: flex;

    .menu-control {
      padding: 0 20px;
      vertical-align: middle;
      font-size: 1.1rem;
      cursor: pointer;
    }
    .menu-control:hover {
      background-color: chocolate;
    }

    .header-menu-content {
      flex-grow: 1;
      padding-right: 20px;
      display: flex;
      justify-content: flex-end;

      .header-menu-item {
        cursor: pointer;
        width: 40px;
        height: 50px;
        text-align: center;

        i {
          font-size: 18px;
        }

        .user-avator {
          margin-top: 5px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .header-menu-item:hover {
        background-color: #264d6d;
      }

      .img {
        width: 50px;
      }

      .user-name {
        width: 100px;
      }
    }
  }
}
</style>
