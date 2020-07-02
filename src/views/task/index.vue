<!-- 任务列表页面 -->
<template>
  <div class="bodySt">
    <!-- 列表搜索条件 -->
    <el-row>
      <el-form ref="searchForm" :model="searchForm" label-width="80px">
        <el-col :span="6">
          <el-form-item label="任务名称:">
            <el-input v-model="searchForm.task_name" maxlength="30" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="任务类型:">
            <el-select v-model="searchForm.task_type" placeholder="请选择" clearable>
              <el-option
                v-for="item in taskTypeOpen"
                :key="item.id"
                :label="item.type_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!-- 列表按钮 -->
    <el-row style="margin-bottom:10px">
      <el-button type="primary" @click="addClick">新增</el-button>
    </el-row>
    <!-- 表格 -->
    <el-row v-loading="loading">
      <el-table :data="tableDate" border>
        <el-table-column label="任务名称" prop="task_name"></el-table-column>
        <el-table-column label="任务类型" prop="type_name"></el-table-column>
        <el-table-column label="任务模块" prop="module_name"></el-table-column>
        <el-table-column label="创建时间" prop>
          <template slot-scope="scope">{{formatDate(scope.row.create_time)}}</template>
        </el-table-column>
        <el-table-column label="负责人" prop="task_username"></el-table-column>
        <el-table-column label="验收状态">
          <template slot-scope="scope">{{scope.row.check==1?"未验收":scope.row.check==2?"验收失败":"验收成功"}}</template>
        </el-table-column>
        <el-table-column label="验收备注" prop="check_remark"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row,scope.$index)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer-page">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="searchForm.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="searchForm.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="searchForm.total"
        ></el-pagination>
      </div>
    </el-row>
    <detail
      :dialogVisible="dialogVisible"
      :title="title"
      @handleClose="handleClose"
      :row="row"
      :user="user"
      :projectMember="projectMember"
    ></detail>
    <!-- 库存dialog -->
  </div>
</template>
<script>
// import { save, search, del, verify, update } from "../../api/";
import { query as projectQuery, searchProjectMember } from '../../api/project';
import { getUserinfo } from '@/api/permission';
import { searchTask, deleteTask, taskTypes } from '../../api/task';
import detail from './detail';
import dayjs from 'dayjs';
export default {
  name: 'taskIndex',
  components: { detail },
  data() {
    return {
      projectId: null,
      // 查找条件
      searchForm: {
        task_name: '',
        task_type: '',
        page: 1,
        pageSize: 10,
        total: 0
      },
      loading: false,
      dialogVisible: false,
      title: '添加',
      row: {},
      tableDate: [],
      project: {},
      user: {},
      taskTypeOpen: [],
      projectMember: []
    };
  },
  filters: {},
  methods: {
    async searchProjectMember() {
      let result = await searchProjectMember({ project_id: this.projectId });
      if (result.code != 1000) {
        return this.$message.warning(result.msg);
      }
      this.projectMember = result.data;
    },
    //   查询项目信息
    async projectQuery() {
      let result = await projectQuery(this.projectId);
      if (result.code != 1000) {
        return this.$message.warning(result.msg);
      }
      this.project = result.data;
    },
    //删除
    del(row, index) {
      if (this.user.uid != row.task_user_id) {
        return this.$message.warning('不是该任务负责人');
      }
      if (row.commit > 1) {
        return this.$message.warning('已验收');
      }
      this.$confirm('确认要删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let result = await deleteTask(row);
          if (result.code != 1000) {
            return this.$message.warning(result.msg);
          }
          this.$message.success(result.msg);
          this.search();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    //弹窗关闭
    handleClose() {
      this.row = {};
      this.dialogVisible = false;
      this.search();
    },
    //编辑弹窗
    edit(row, index) {
      row.create_time_format = this.formatDate(row.create_time);
      row.project_name = this.project.project_name;
      this.row = row;
      this.title = '编辑';
      this.dialogVisible = true;
    },
    // 新增按钮
    addClick() {
      let row = {
        project_id: this.project.id,
        project_name: this.project.project_name,
        task_username: this.user.userName
      };
      this.row = row;
      this.dialogVisible = true;
      this.title = '增加';
    },
    //   任务类型
    async taskTypes() {
      let result = await taskTypes();
      if (result.code != 1000) return this.$message.error(result.msg);
      this.taskTypeOpen = result.data;
    },
    //搜索
    async search() {
      let result = await searchTask(this.searchForm);
      if (result.code != 1000) {
        return this.$message.error(result.msg);
      }
      if (result.data.length == 0 && result.total > 0) {
        this.searchForm.page = 1;
        this.search();
        return;
      }
      console.log(result.data);
      this.tableDate = result.data;
      this.searchForm.total = result.total;
    },
    //时间戳转换方法
    formatDate(date) {
      date = date * 1000;
      if (date) {
        date = Number(date);
        date = new Date(date);
        let YY = date.getFullYear() + '-';
        let MM =
          (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-';
        let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let hh =
          (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
          ':';
        let mm =
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()) + ':';
        let ss =
          date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return YY + MM + DD + ' ' + hh + mm + ss;
      }
      return '';
    },
    // 分页变化
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.search();
    },
    // 分页变化
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.search();
    },
    async getUserinfo() {
      let res = await getUserinfo();
      this.user = res.data;
      console.log('this.user', this.user);
    }
  },
  mounted() {
    this.search();
    this.taskTypes();
  },

  created() {
    this.getUserinfo();
    this.projectId = this.$route.params.projectId;
    this.searchForm.project_id = this.projectId;
    this.projectQuery();
    this.searchProjectMember();
  }
};
</script>
<style >
.el-table--mini,
.el-table--small,
.el-table__expand-icon {
  font-size: 14px;
}
.el-table__expand-icon {
  font-size: 14px;
}
.bodySt {
  padding: 20px;
}
.buttomRow {
  text-align: center;
}
.footer-page {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>

