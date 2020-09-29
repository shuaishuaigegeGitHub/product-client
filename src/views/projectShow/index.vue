<template>
  <div class="project-show">
    <div class="select-project">
      <p>项目列表：</p>
      <el-select v-model="selectedId" clearable placeholder="全部" popper-class="select-status1">
        <el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="project-list">
      <el-card class="box-card">
        <img
          src="http://www.fenglinghudong.com/img/ball.05fb0ac0.png"
          alt
          style="width:100px;heighr:100px;border-radius:20px;"
        />
        <div class="content">
            
        </div>
        <div class="radar">
          <div id="radar-map" style="width: 300px;height:230px;"></div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { deepClone } from '../../utils/tools';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      selectedId: '',
      projectList: [
        {
          id: 1,
          name: '球球突击',
        },
        {
          id: 2,
          name: '荒野大作战',
        },
      ],
      content: [
        {
          id: 1,
          name: '沙漠球球',
        },
      ],
    };
  },
  filters: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let radarMap = this.$echarts.init(document.getElementById('radar-map'));
      let option = {
        tooltip: {
          trigger: 'axis',
        },
        radar: [
          {
            indicator: [
              { text: '操作手感', max: 10 },
              { text: '游戏关卡', max: 10 },
              { text: '美术动作', max: 10 },
              { text: '美术特效', max: 10 },
              { text: '音乐音效', max: 10 },
            ],
            radius: 80,
            center: ['50%', '50%'],
          },
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item',
            },
            areaStyle: {},
            data: [
              {
                value: [5, 6, 9, 5, 3],
                name: '某软件',
              },
            ],
          },
        ],
        color: ['#3895FB'],
      };
      radarMap.setOption(option);
    },
  },
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
  }
  .radar {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
