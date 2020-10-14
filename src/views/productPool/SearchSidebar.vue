<template>
  <div id="J-global-toolbar">
    <div class="toolbar-wrap" ref="toolbarWrap">
      <div class="toolbar">
        <div class="toolbar-panels">
          <div
            style="visibility: hidden"
            data-name="follow"
            class="toolbar-panel tbar-panel-follow"
            ref="tbarPanelFollow"
          >
            <h3 class="sidebar-header">
              <p class="title">
                <i class="el-icon-share"></i>&nbsp;
                <em class="title">筛选栏</em>
              </p>
              <i
                class="el-icon-close"
                style="font-size: 30px"
                @click="toggleSidebar"
              ></i>
            </h3>
            <div class="sidebar-content" style="padding-top: 10px">
              <div
                class="content-item"
                v-for="(option, index) in filterList"
                :key="index"
              >
                <p style="width: 80px">{{ option.name }}：</p>
                <el-select
                  v-model="option.value"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in option['cond']"
                    :key="item.id"
                    :label="item.filterName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="content-item">
                <p style="width: 80px">日期选择：</p>
                <el-date-picker
                  v-model="selectdDate"
                  type="month"
                  placeholder="选择月"
                ></el-date-picker>
              </div>
            </div>
            <div class="sidebar-bottom" ref="sidebarBottom">
              <el-button type="primary" @click="submitFilter">确认</el-button>
              <el-button @click="toggleSidebar">取消</el-button>
            </div>
          </div>
        </div>
        <div class="toolbar-tabs">
          <div class="toolbar-tab tbar-tab-follow" @click="toggleSidebar">
            <div class="corner-mark">
              <p
                style="
                  position: absolute;
                  top: -15px;
                  left: 15px;
                  font-size: 17px;
                "
              >
                筛选
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { remRadian } from 'echarts/lib/util/number';
import { poolSearch } from '../../api/productPool';
import { deepClone } from '../../utils/tools';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      filterList: [],
      selectdDate: '',
      HEIGHT: window.innerHeight,
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    this.$refs.sidebarBottom.style['top'] = `${this.HEIGHT * 0.47}px`;
  },
  methods: {
    async initData() {
      let res = await poolSearch();
      if (res.code === 1000) {
        let data = deepClone(this.$store.state.productPool.filterList);
        data[5] = {
          name: '分组',
          cond: res.data.map((item) => ({
            id: item.id,
            filterName: item.name,
          })),
          value: null,
        };
        this.$store.commit('productPool/SET_FILTER_LIST', deepClone(data));
        this.filterList = deepClone(this.$store.state.productPool.filterList);
      }
    },
    // 动态关闭筛选栏
    toggleSidebar() {
      let that = this;
      let toolbarWrapCss = this.$refs.toolbarWrap.className;
      if (toolbarWrapCss.includes('toolbar-open')) {
        toolbarWrapCss = toolbarWrapCss.replace(
          'toolbar-open',
          'toolbar-close'
        );
        this.$refs.toolbarWrap.className = toolbarWrapCss;
        clearTimeout(that.timer);
        this.timer = setTimeout(() => {
          that.$refs.tbarPanelFollow.style['visibility'] = 'hidden';
          that.$refs.tbarPanelFollow.style['z-index'] = '-1';
        }, 450);
      } else {
        if (toolbarWrapCss.includes('toolbar-close')) {
          toolbarWrapCss = toolbarWrapCss.replace(
            'toolbar-close',
            'toolbar-open'
          );
        } else {
          toolbarWrapCss += ' toolbar-open';
        }
        this.$refs.toolbarWrap.className = toolbarWrapCss;
        clearTimeout(that.timer);
        this.timer = setTimeout(() => {
          that.$refs.tbarPanelFollow.style['visibility'] = 'visible';
          that.$refs.tbarPanelFollow.style['z-index'] = '1';
        }, 100);
      }
    },
    //更新筛选栏数据
    submitFilter() {
      let data = deepClone(this.$store.state.productPool.filterSelectd);
      data.product_type = this.filterList[0].value;
      data.tech_type = this.filterList[1].value;
      data.product_source = this.filterList[2].value;
      data.game_type = this.filterList[3].value;
      data.first_platform = this.filterList[4].value;
      data.group = this.filterList[5].value;
      data.date = this.selectdDate
        ? dayjs(this.selectdDate).format('YYYY-MM')
        : '';
      this.$store.commit('productPool/SET_FILTER_SELECTED', deepClone(data));
      bus.$emit('update_filter_data', deepClone(data));
      console.log('!!!!!');
      this.filterList.forEach((item) => console.log(item.value));
    },
  },
};
</script>
<style>
.J-global-toolbar div a {
  margin: 0px;
  padding: 0px;
  color: #666;
}
.toolbar-wrap {
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 1000;
  width: 35px;
  height: 100%;
}
.toolbar-wrap a {
  text-decoration: none;
}
.toolbar {
  position: absolute;
  right: 0px;
  top: 80px;
  width: 29px;
  height: 100%;
  border-right: 6px solid rgba(122, 110, 110, 0.3);
}
.toolbar-panels {
  position: absolute;
  left: 28px;
  top: 0px;
  width: 270px;
  animation: myfirst 5s;
  height: 100%;
  z-index: 2;
  background: #eceaea none repeat scroll 0% 0%;
}
.toolbar-panel {
  width: 270px;
  height: 100%;
  position: absolute;
  background: #eceaea none repeat scroll 0% 0%;
}
.tbar-panel-header {
  position: relative;
  width: 270px;
  height: 40px;
  line-height: 40px;
  background: #eceaea none repeat scroll 0% 0%;
  font-weight: normal;
  margin: 0px;
  padding: 0px;
}

.tbar-panel-header .title {
  display: inline-block;
  height: 40px;
  color: #5e5050;
  font: 16px/40px '微软雅黑';
}
.tbar-panel-header i {
  margin-right: 4px;
  margin-left: 10px;
  vertical-align: top;
}
.tbar-panel-header i,
.tbar-panel-header .close-panel {
  display: inline-block;
  font-style: normal;
  background-repeat: no-repeat;
}
.tbar-panel-header .title em {
  display: inline-block;
  vertical-align: top;
}
.tbar-panel-header .close-panel {
  width: 12px;
  height: 12px;
  background-position: 0px -250px;
  position: absolute;
  right: 8px;
  top: 16px;
  cursor: pointer;
  transition: transform 0.2s ease-out 0s;
}

img {
  border: 0px none;
  vertical-align: middle;
}

.tbar-panel-follow .tbar-panel-header i {
  width: 20px;
  height: 17px;
  margin-top: 11px;
  background-position: 0px -50px;
  padding: 10px;
  padding-top: 15px;
  box-sizing: border-box;
}
.toolbar-tabs {
  position: absolute;
  top: 50%;
  left: 0px;
  width: 35px;
  margin-top: -61px;
}
.toolbar-tab {
  position: relative;
  width: 25px;
  height: 120px;
  margin-bottom: 1px;
  cursor: pointer;
  background-color: rgba(122, 110, 110, 0.3);
  border-radius: 3px 0px 0px 3px;
  font: 12px/150% Arial, Verdana, '宋体';
  color: #666;
  display: inline-block;
  background-repeat: no-repeat;
  left: -2px;
}
.corner-mark {
  width: 0px;
  height: 0px;
  position: absolute;
  border: 8px solid transparent;
  border-right: 8px solid rgba(122, 110, 110, 0.3);
  left: -16px;
  top: 50px;
  color: red;
}
.tbar-tab-follow {
  background-position: -50px -50px;
}
.tab-ico {
  width: 34px;
  height: 35px;
  margin-left: 1px;
  position: relative;
  z-index: 2;
  background-color: #7a6e6e;
}

.hide {
  display: none;
}
.tbar-tab-footer-hover {
  left: -48px;
  background-color: #c81623;
}
.tbar-tab-selected {
  background-color: #c81623;
}
.tbar-tab-click-selected {
  background-color: #c81623;
}
.survey-tab-ico {
  display: none;
}
.toolbar-open {
  right: 270px;
  animation: sideBarOpen 0.8s;
  animation-timing-function: ease;
}

.toolbar-close {
  right: 0px;
  animation: sideBarClose 0.8s;
  animation-timing-function: ease;
}

@keyframes sideBarOpen {
  from {
    right: 0;
  }
  to {
    right: 270px;
  }
}

@keyframes sideBarClose {
  from {
    right: 270px;
  }
  to {
    right: 0px;
  }
}

.J-close:hover {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
}
.tbar-panel-history .jth-item .add-cart-button:hover {
  background: rgb(200, 22, 35) none repeat scroll 0% 0%;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  padding-left: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(203, 200, 181, 0.4);
}
.el-icon-close {
  cursor: pointer;
  color: #5e5050;
}
.el-icon-close:hover {
  color: rgba(0, 0, 0, 0.3);
}
.content-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 5px;
  margin-left: 20px;
}
.content-item .el-input {
  width: 135px;
}
.content-item .el-date-editor.el-input {
  width: 135px;
}
.sidebar-bottom {
  padding: 0 25px;
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 500px;
}
</style>

