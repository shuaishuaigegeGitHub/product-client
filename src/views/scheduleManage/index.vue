<template>
  <div class="schedule-manage">
    <div class="select-project">
      <p>项目列表：</p>
      <el-select v-model="selectedStatusId" placeholder="全部" popper-class="select-status1">
        <el-option v-for="item in projectStatus" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <calendar></calendar>
  </div>
</template>
<script>
import Calendar from './Calendar';
import { deepClone } from '../../utils/tools';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
export default {
  components: {
    Calendar,
  },
  data() {
    return {
      projectStatus: [
        {
          id: 1,
          name: '小小神箭手',
        },
        {
          id: 2,
          name: '我是枪神',
        },
        {
          id: 3,
          name: '跑跑卡丁车',
        },
      ],
      selectedStatusId: '',
    };
  },
  filters: {},
  created() {
    this.selectedStatusId = this.projectStatus[0].id;
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.schedule-manage {
  padding: 15px;
  .select-project {
    display: flex;
    align-items: center;
  }
}
</style>

