<template>
  <!-- 日程管理 -->
  <div class="schedule-manage">
    <div style="display: flex; justify-content: space-between">
      <div class="select-project">
        <p>项目列表：</p>
        <el-select
          v-model="selectedStatusId"
          clearable
          placeholder="全部"
          popper-class="select-status1"
        >
          <el-option
            v-for="item in projectList"
            :key="item.id"
            :label="item.product_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <el-button
        v-if="!isManager"
        style="width: 50px; height: 50px; margin-right: 20px"
        type="primary"
        icon="el-icon-plus"
        circle
        size="medium"
        @click="toggleAddTask"
      ></el-button>
    </div>
    <calendar v-if="isManager"></calendar>
    <calendar-person v-else></calendar-person>
    <task-add></task-add>
  </div>
</template>
<script>
import Calendar from './Calendar';
import CalendarPerson from './CalendarPerson';
import TaskAdd from './TaskAdd';
import { deepClone } from '../../utils/tools';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
import {
  userFimdTask,
  manageSearchTask,
  searchManageUser
} from '../../api/schedule';
export default {
  components: {
    Calendar,
    CalendarPerson,
    TaskAdd
  },
  data() {
    return {
      projectList: [],
      selectedStatusId: '',
      isManager: false
    };
  },
  filters: {},
  created() {
    this.init();
  },
  watch: {
    selectedStatusId(val) {
      bus.$emit('select-project-calendar', val);
    }
  },
  mounted() {
    bus.$on('init-project-status', async params => {
      this.projectList = [];
      if (params[0].length) {
        this.projectList = params[0];
      }
      if (!params[1] && params[0].length) {
        this.selectedStatusId = this.projectList[0].id;
      }
      if (!this.projectList.length || !params[1]) {
        this.selectedStatusId = '';
      }
    });
  },
  methods: {
    async init() {
      let res = await searchManageUser();
      if (res.code === 1000) {
        let data = res.data;
        if (data.includes(this.$store.state.user.user.uid)) {
          this.isManager = true;
        }
      }
    },
    toggleAddTask() {
      bus.$emit('show-add-task');
    }
  }
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
<style>
.schedule-manage .el-icon-plus {
  font-size: 25px;
}
</style>

