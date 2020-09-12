<template>
  <!-- 项目排期 -->
  <div class="scheduling-body">
    <el-row>
      <!-- 左边 -->
      <el-col :span="12" class="left">
        <div style="width:400px;height:100%;text-align: center;">
          <el-card :body-style="{ padding: '0px' }">
            <div>
              <img class="log" :src="form.project_logo" />
            </div>
            <div>
              <div class="formRow">项目名称： {{form.project_name}}</div>
              <div class="formRow">负责人： {{form.userName}}</div>
              <div class="formRow">参与者： {{namesToString()}}</div>
              <div class="formRow">所属列表： {{findList()}}</div>
              <div class="formRow">标签： {{form.tag}}</div>
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- 右边 -->
      <el-col :span="12">
        <calendar />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { query } from '../../api/project';
import { searchproject_list } from '../../api/kanban';
import calendar from '../components/calendar/calendar';
export default {
  name: 'scheduling',
  components: { calendar },
  props: {},
  data() {
    return {
      searchForm: {
        project_id: ''
      },
      form: {},
      projectList: []
    };
  },
  mounted() {
    this.searchForm.project_id = this.$route.params.projectId;
    this.search();
    this.listSearch();
  },
  methods: {
    // 返回参与者字符串
    namesToString() {
      if (this.form.memberList && this.form.memberList) {
        let names = this.form.memberList.map(i => i.username);
        return names.join(',');
      }
      return '';
    },
    // 通过任务列表id返回任务列表名称
    findList() {
      let a = this.projectList.find(i => i.id == this.form.list_id);
      if (a) {
        return a.list_name;
      }
      return '';
    },
    // 查询任务列表
    async listSearch() {
      let result = await searchproject_list();
      if (result.code != 1000) return this.$message.warning(result.msg);
      this.projectList = result.data;
    },
    //   查询项目数据
    async search() {
      let result = await query(this.searchForm.project_id);
      if (result.code != 1000) return this.$message.error(result.msg);

      result.data.memberList.forEach(item => {
        if (item.role == 'PRINCIPAL') {
          result.data.userName = item.username;
          return;
        }
      });
      this.form = result.data;
      console.log(this.form);
    }
  }
};
</script>
<style lang="scss">
.scheduling-body {
  margin: 20px;
  .left {
    display: flex;
    flex-direction: row-reverse;
    .log {
      width: 200px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .formRow {
      padding: 10px 0px;

      border-top: 1px solid;

      border-color: #ebeae9;
    }
  }
}
</style>
