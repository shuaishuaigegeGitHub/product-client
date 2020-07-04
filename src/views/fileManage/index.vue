<!-- 文件管理页面 -->
<template>
  <div class="bodySt">
    <!-- 列表搜索条件 -->
    <el-row>
      <el-form ref="searchForm" :model="searchForm" label-width="80px">
        <el-col :span="6">
          <el-form-item label="创建人:">
            <el-input v-model="searchForm.create_name" maxlength="30" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备注:">
            <el-input v-model="searchForm.remark" maxlength="30" clearable />
          </el-form-item>
        </el-col>

        <span style="margin-left:20px">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </span>
      </el-form>
    </el-row>
    <el-row style="margin-bottom:20px">
      <el-button type="primary" icon="el-icon-search" @click="detail.dialogVisible=true">增加</el-button>
    </el-row>
    <!-- 表格 -->
    <el-row v-loading="loading">
      <el-table :data="tableDate" border>
        <el-table-column label="文件名称" prop="origin_name" width="350">
          <template slot-scope="scope">
            <span class="el-icon-tickets" />
            {{scope.row.origin_name}}
          </template>
        </el-table-column>
        <el-table-column label="大小" prop="size" width="100">
          <template slot-scope="scope">{{formatSzie(scope.row.size)}}</template>
        </el-table-column>
        <el-table-column label="创建人" prop="create_name" width="100"></el-table-column>
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">{{formatDate(scope.row.create_time)}}</template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="see(scope.row)">查看</el-button>
            <el-button size="mini" @click="deleteFile(scope.row)">删除</el-button>
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
    <detail :dialogVisible="detail.dialogVisible" :projectId="projectId" @handleClose="handleClose"></detail>
  </div>
</template>
<script>
import { getUserinfo } from '@/api/permission';
import { fileList, deleteFile } from '../../api/file';
import { taskTypes } from '../../api/task';
import detail from './detail';
import dayjs from 'dayjs';
export default {
  name: 'fileIndex',
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
      // 弹窗参数
      detail: {
        dialogVisible: false
      },
      loading: false,
      title: '添加',
      row: {},
      tableDate: [],
      project: {},
      user: {},
      taskTypeOpen: []
    };
  },
  filters: {},
  methods: {
    // 详情弹窗关闭
    handleClose() {
      this.detail.dialogVisible = false;
      this.search();
    },
    // 查看
    see(row) {
      window.open(row.url);
    },
    // 删除
    async deleteFile(row) {
      let result = await deleteFile(row);
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.search();
    },
    //   任务类型
    async taskTypes() {
      let result = await taskTypes();
      if (result.code != 1000) return this.$message.error(result.msg);
      this.taskTypeOpen = result.data;
    },
    //搜索
    async search() {
      let result = await fileList(this.searchForm);
      if (result.code != 1000) {
        return this.$message.error(result.msg);
      }
      if (result.data.length == 0 && result.total > 0) {
        this.searchForm.page = 1;
        this.search();
        return;
      }
      this.tableDate = result.data;
      this.searchForm.total = result.total;
    },
    // 格式化大小
    formatSzie(num) {
      if (num > 1024 * 1024) {
        return parseInt(num / (1024 * 1024)) + 'MB';
      } else if (num > 1024) {
        return parseInt(num / 1024) + 'KB';
      }
      return num;
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
    // 获取用户信息
    async getUserinfo() {
      let res = await getUserinfo();
      this.user = res.data;
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

