<template>
  <div class="rotate-select-box">
    <div class="htmleaf-container">
      <div id="ss_menu" ref="ss_menu">
        <div ref="div1" style="visibility:hidden;">
          <i ref="i1" class="el-icon-delete" @click="toggleShowTrash"></i>
        </div>
        <div>
          <i ref="i2" class="el-icon-plus" @click="toggleShowAdd"></i>
        </div>
        <div class="menu" ref="menu">
          <div class="share" id="ss_toggle" ref="ss_toggle">
            <i class="el-icon-place" style="font-size:23px;" @click="toggleShow"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '../../utils/bus';
export default {
  data() {
    return {
      rot: 0,
    };
  },
  created() {},
  mounted() {
    let that = this;
    document
      .getElementById('ss_menu')
      .addEventListener(
        'transitionend webkitTransitionEnd oTransitionEnd',
        function () {
          if ((that.rot / 180) % 2 == 0) {
            that.$refs.i1.className += 'ss_animate';
            that.$refs.i2.className += 'ss_animate';
          } else {
            that.$refs.i1.className.replace('ss_animate', '');
            that.$refs.i2.className.replace('ss_animate', '');
          }
        }
      );
  },
  methods: {
    // 旋转选择框
    toggleShow() {
      this.$refs.ss_menu.style['transform'] = 'rotate(' + this.rot + 'deg)';
      this.$refs.ss_menu.style['webkitTransform'] =
        'rotate(' + this.rot + 'deg)';
      this.rot = this.rot - 180;
      if ((this.rot / 180) % 2 == 0) {
        this.$refs.div1.style.visibility = this.$refs.div1.style.visibility.replace(
          'visible',
          'hidden'
        );
        this.$refs.menu.className += ' ss_active';
        this.$refs.ss_toggle.className += ' close';
      } else {
        this.$refs.div1.style.visibility = this.$refs.div1.style.visibility.replace(
          'hidden',
          'visible'
        );
        this.$refs.menu.className = this.$refs.menu.className.replace(
          'ss_active',
          ''
        );
        this.$refs.ss_toggle.className = this.$refs.ss_toggle.className.replace(
          'close',
          ''
        );
      }
    },
    //打开垃圾篓
    toggleShowTrash() {
      bus.$emit('open_trash', true);
    },
    //打开添加项目弹框
    toggleShowAdd() {
      bus.$emit('show_add', true);
    },
  },
};
</script>
<style>
/* .rotate-select-box {
} */
@keyframes badbounce {
  0%,
  100% {
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    -o-transform: translateY(0px);
    transform: translateY(0px);
  }
  10% {
    -webkit-transform: translateY(6px);
    -moz-transform: translateY(6px);
    -ms-transform: translateY(6px);
    -o-transform: translateY(6px);
    transform: translateY(6px);
  }
  30% {
    -webkit-transform: translateY(-4px);
    -moz-transform: translateY(-4px);
    -ms-transform: translateY(-4px);
    -o-transform: translateY(-4px);
    transform: translateY(-4px);
  }
  70% {
    -webkit-transform: translateY(3px);
    -moz-transform: translateY(3px);
    -ms-transform: translateY(3px);
    -o-transform: translateY(3px);
    transform: translateY(3px);
  }
  90% {
    -webkit-transform: translateY(-2px);
    -moz-transform: translateY(-2px);
    -ms-transform: translateY(-2px);
    -o-transform: translateY(-2px);
    transform: translateY(-2px);
  }
}
.ss_animate {
  animation: badbounce 1s linear;
}

#ss_menu {
  bottom: 30px;
  width: 40px;
  height: 40px;
  color: #fff;
  position: fixed;
  top: 87px;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  transition: all 1s ease;
  right: 15px;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  z-index: 99;
}
#ss_menu > .menu {
  display: block;
  position: absolute;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.23), 0 3px 10px rgba(0, 0, 0, 0.16);
  color: #fff;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  transition: all 1s ease;
  cursor: pointer;
}
#ss_menu > .menu .share {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  transition: all 1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

#ss_menu > .menu.ss_active {
  background: #00796b;
  -webkit-transform: scale(0.7);
  -moz-transform: scale(0.7);
  -ms-transform: scale(0.7);
  -o-transform: scale(0.7);
  transform: scale(0.7);
}
#ss_menu > div {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  width: 60px;
  height: 60px;
  font-size: 30px;
  text-align: center;
  background: #00796b;
  border-radius: 50%;
  display: table;
}
#ss_menu > div i {
  display: table-cell;
  vertical-align: middle;
}
#ss_menu > div:hover {
  background: #009688;
}
#ss_menu div:nth-child(1) {
  top: 57px;
  left: -35px;
}
#ss_menu div:nth-child(2) {
  top: -10px;
  left: -86px;
}
</style>

