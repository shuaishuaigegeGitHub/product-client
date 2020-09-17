<template>
  <!-- 分组管理 -->
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
        <el-table-column align="center" label="名称" prop="name"></el-table-column>
        <el-table-column align="center" label="创建时间" prop="create_time"></el-table-column>
        <el-table-column align="center" label="备注" prop="remark"></el-table-column>
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="eidtClick(scope.row)">编辑</el-button>
            <el-button type="danger" @click="pooldel(scope.row)">删除</el-button>
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
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
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
  poolSearch,
  poolUpdate,
  poolSave,
  pooldel
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
    this.poolSearch();
  },
  methods: {
    eidtClick(row) {
      this.form = row;
      this.dialogVisible = true;
      this.title = '编辑';
    },
    async poolSave() {
      let result = await poolSave(this.form);
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.handleClose();
    },
    async poolUpdate() {
      let result = await poolUpdate(this.form);
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.handleClose();
    },
    async pooldel(row) {
      this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let result = await pooldel(row);
          if (result.code != 1000) return this.$message.error(result.msg);
          this.$message.success(result.msg);
          this.handleClose();
        })
        .catch(() => {});
    },
    async poolSearch() {
      let result = await poolSearch();
      if (result.code != 1000) return this.$message.error(result.msg);
      this.tableAll = result.data;
      this.tableLimt();
    },
    saveClick() {
      if (this.title == '编辑') {
        this.poolUpdate();
      } else {
        this.poolSave();
      }
    },
    addClick() {
      this.dialogVisible = true;
      this.title = '添加';
    },
    handleClose() {
      this.form = {};
      this.dialogVisible = false;
      this.poolSearch();
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