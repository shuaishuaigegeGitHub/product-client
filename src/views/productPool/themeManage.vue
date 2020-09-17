<template>
  <!-- 游戏题材管理 -->
  <div style="padding:20px">
    <div>
      <el-form>
        <el-form-item></el-form-item>
      </el-form>
      <el-button type="primary" @click="addClick">添加</el-button>
    </div>
    <div style="margin-top:20px">
      <el-table border :data="tableData">
        <el-table-column align="center" width="150px" label="id" prop="id"></el-table-column>
        <el-table-column align="center" label="题材名称" prop="theme"></el-table-column>
        <el-table-column align="center" label="创建时间" prop="create_time"></el-table-column>
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="eidtClick(scope.row)">编辑</el-button>
            <el-button type="danger" @click="themeDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px;">
        <el-pagination
          style="float:right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[15, 30, 45, 60]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="题材名称">
          <el-input v-model="form.theme"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  themeSearch,
  themeUpdate,
  themeSave,
  themeDel
} from '../../api/productPool';
export default {
  data() {
    return {
      tableData: [],
      tableAll: [],
      title: '添加',
      dialogVisible: false,
      form: {},
      total: 0,
      page: 1,
      pageSize: 15
    };
  },
  mounted() {
    this.themeSearch();
  },
  methods: {
    eidtClick(row) {
      this.form = row;
      this.dialogVisible = true;
      this.title = '编辑';
    },
    async themeSave() {
      let result = await themeSave(this.form);
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.handleClose();
    },
    async themeUpdate() {
      let result = await themeUpdate(this.form);
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.handleClose();
    },
    async themeDel(row) {
      this.$confirm('此操作将永久删除该题材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let result = await themeDel(row);
          if (result.code != 1000) return this.$message.error(result.msg);
          this.$message.success(result.msg);
          this.handleClose();
        })
        .catch(() => {});
    },
    async themeSearch() {
      let result = await themeSearch();
      if (result.code != 1000) return this.$message.error(result.msg);
      this.tableAll = result.data;
      this.tableLimt();
    },
    saveClick() {
      if (this.title == '编辑') {
        this.themeUpdate();
      } else {
        this.themeSave();
      }
    },
    addClick() {
      this.dialogVisible = true;
      this.title = '添加';
    },
    handleClose() {
      this.form = {};
      this.dialogVisible = false;
      this.themeSearch();
    },
    handleSizeChange(val) {
      this.pageSize = val;

      this.tableLimt();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.tableLimt();
    },
    tableLimt() {
      this.tableData = [];
      this.total = this.tableAll.length;
      if (this.total == 0) {
        this.page = 1;
        return;
      }
      let ellipsis = (this.page - 1) * this.pageSize;
      if (ellipsis > this.total) {
        this.page = 1;
        ellipsis = 0;
      }
      for (let i = 0; i < this.pageSize; i++) {
        if (ellipsis + i < this.total) {
          this.tableData.push(this.tableAll[ellipsis + i]);
        } else {
          break;
        }
      }
    }
  }
};
</script>