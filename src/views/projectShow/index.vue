<template>
  <!-- 产品池2.0 -->
  <div class="project-show">
    <div class="select-project">
      <p>项目列表：</p>
      <el-select v-model="selectedId" clearable placeholder="全部" popper-class="select-status1">
        <el-option
          v-for="item in projectList"
          :key="item.id"
          :label="item.product_name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="project-list">
      <el-card class="box-card" v-for="(item, index) in contentList" :key="index">
        <div class="item-detail">
          <img :src="item.logo" alt style="width: 100px; height: 100px; border-radius: 20px" />
          <div style="margin-left: 20px; margin-top: 10px">
            <h2>{{ item.product_name }}</h2>
            <el-tooltip :content="item.game_description" placement="bottom-end" effect="light">
              <p
                style="font-size: 14px; cursor: pointer"
              >项目描述：{{ item.game_description | crossWord }}</p>
            </el-tooltip>
            <p
              style="
                font-size: 14px;
                color: rgba(125, 125, 125, 0.9);
                margin-top: 7px;
              "
            >
              <span>游戏题材：{{ item.play_theme }}</span>
              <span style="margin: 20px">|</span>
              <span>适应人群：{{ item.user_group }}</span>
            </p>
          </div>
        </div>
        <div class="content">
          <div class="left-content">
            <p>
              <span style="width: 98px; display: inline-block">产品分组：</span>
              {{
              groupList.filter((itm) => itm.id === item.pool_id) | groupFilter
              }}
            </p>
            <p>
              <span style="width: 98px; display: inline-block">项目体量：</span>
              {{ project_types[item.project_type - 1] }}
            </p>
            <p>
              <span style="width: 98px; display: inline-block">立项来源：</span>
              {{ sources[item.source - 1] }}
            </p>
            <p>
              <span style="width: 98px; display: inline-block">技术选型：</span>
              {{ technology_types[item.technology_type - 1] }}
            </p>
            <p>
              <span style="width: 98px; display: inline-block">首发平台：</span>
              {{ startings[item.starting - 1] }}
            </p>
            <p>
              <span style="width: 98px; display: inline-block">产品提供者：</span>
              {{ item.provide_name }}
            </p>
            <p>
              <span style="width: 98px; display: inline-block">游戏题材：</span>
              {{
              themeList.filter((itm) => itm.id === item.theme) | themeFilter
              }}
            </p>
          </div>
          <div class="middle-content">
            <p>游戏难度：</p>
            <p>游戏类型：</p>
            <p>游戏趣味性：</p>
            <p>付费点设计：</p>
            <p>立项理由：</p>
          </div>
          <div class="right-content">
            <p>原品名称：</p>
            <p>厂家名称：</p>
            <p>主页链接：</p>
            <p>产品成就：</p>
            <p>发行时间：</p>
            <p>游戏备注：</p>
          </div>
        </div>
        <div class="radar">
          <div :id="'radar-map' + item.id" style="width: 300px; height: 230px"></div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { deepClone } from '../../utils/tools';
import { searchProduct } from '../../api/projectApproval';
import { themeSearch, poolSearch } from '../../api/productPool';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      selectedId: '',
      projectList: [],
      contentList: [],
      //   产品权重
      prioritys: ['重大', '核心', '一般'],
      //   产品类型
      project_types: ['超轻度', '轻度游戏', '中度游戏', '重度游戏'],
      //   技术类型
      technology_types: ['3D竖屏', '3D横屏', '2D竖屏', '2D横屏'],
      //   来源类型
      sources: ['直接立项', '微创新', '选品会', '自主设计'],
      //   首发平台
      startings: ['微信', '字节', 'OPPO', 'APP渠道', 'vivo'],
      //游戏类别列表
      themeList: [],
      // 项目分组列表
      groupList: []
    };
  },
  filters: {
    crossWord(val) {
      val = val ? val : '';
      if (val.length > 100) {
        return val.slice(0, 100) + '...';
      }
      return val;
    },
    themeFilter(val) {
      if (!val.length) {
        return '';
      }
      return val[0].theme;
    },
    groupFilter(val) {
      if (!val.length) {
        return '';
      }
      return val[0].name;
    }
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let res = await searchProduct({
        status: 7
      });
      if (res.code === 1000) {
        console.log(res.data);
        this.contentList = deepClone(res.data);
        this.projectList = deepClone(res.data);
        for (let i in this.contentList) {
          this.contentList[i].logo = '';
          this.contentList[i].fileList = this.contentList[i].fileList
            ? this.contentList[i].fileList
            : [];
          this.contentList[i].fileList.forEach(item => {
            if (item.type === 1) {
              this.contentList[i].logo = item.path;
            }
          });
        }
        this.$nextTick(() => {
          for (let i in this.contentList) {
            this.contentList[i].weight = JSON.parse(this.contentList[i].weight);
            let radarMap = this.$echarts.init(
              document.getElementById(`radar-map${this.contentList[i].id}`)
            );
            let option = {
              tooltip: {
                trigger: 'axis'
              },
              radar: [
                {
                  indicator: [
                    { text: '操作手感', max: 10 },
                    { text: '游戏关卡', max: 10 },
                    { text: '美术动作', max: 10 },
                    { text: '美术特效', max: 10 },
                    { text: '音乐音效', max: 10 },

                    { text: '画面质量', max: 10 }
                  ],
                  radius: 80,
                  center: ['50%', '50%'],
                  name: {
                    textStyle: {
                      color: '#222'
                    }
                  }
                }
              ],
              series: [
                {
                  type: 'radar',
                  tooltip: {
                    trigger: 'item'
                  },
                  areaStyle: {},
                  data: [
                    {
                      value: [
                        this.contentList[i].weight.feedback,
                        this.contentList[i].weight.lev_design,
                        this.contentList[i].weight.art_action,
                        this.contentList[i].weight.art_effect,
                        this.contentList[i].weight.music,
                        7
                      ],
                      name: '游戏体验'
                    }
                  ]
                }
              ],
              color: ['#3895FB']
            };
            radarMap.setOption(option);
          }
        });
      }
      let result = await themeSearch();
      if (result.code === 1000) {
        this.themeList = deepClone(result.data);
      }
      result = await poolSearch();
      if (result.code === 1000) {
        this.groupList = result.data;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.project-show {
  padding: 15px;
  .select-project {
    display: flex;
    align-items: center;
  }
  .project-list {
    margin-top: 25px;
    .item-detail {
      display: flex;
    }
    .content {
      display: flex;
      margin-top: 20px;
      padding: 0 15px;
      padding-left: 5px;
      flex-direction: row;
      .left-content,
      .middle-content,
      .right-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        border: 1px solid #dedede;
        border-radius: 7px;
        padding: 10px;
        margin: 0 5px;
      }
    }
  }
  .radar {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<style>
.el-tooltip__popper {
  width: 80%;
  margin-left: 10%;
  border: 1px solid rgba(125, 125, 125, 0.3);
}
</style>
