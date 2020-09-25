<template>
  <el-dialog
    title="回收站"
    :visible.sync="isShowTrash"
    width="60%"
    :before-close="handleClose"
    @open="open"
  >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="product_name" label="产品名称" width="180"></el-table-column>
      <el-table-column prop="provide_name" label="提供者名称" width="180"></el-table-column>
      <el-table-column prop="address" label="项目类型">
        <template slot-scope="scope">
          <span v-if="scope.row.project_type==1">超轻度</span>
          <span v-else-if="scope.row.project_type==2">轻度游戏</span>
          <span v-else-if="scope.row.project_type==3">中度游戏</span>
          <span v-else-if="scope.row.project_type==4">重度游戏</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="立项来源">
        <template slot-scope="scope">
          <span v-if="scope.row.source==1">直接立项</span>
          <span v-else-if="scope.row.source==2">微创新</span>
          <span v-else-if="scope.row.source==3">选品会</span>
          <span v-else-if="scope.row.source==4">自主设计</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="首发平台">
        <template slot-scope="scope">
          <span v-if="scope.row.starting==1">微信</span>
          <span v-else-if="scope.row.starting==2">字节</span>
          <span v-else-if="scope.row.starting==3">OPPO</span>
          <span v-else-if="scope.row.starting==4">APP渠道</span>
          <span v-else-if="scope.row.starting==5">vivo</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="productReduction(scope.row)">还原</el-button>
          <el-button size="mini" @click="productDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10,20,30,50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isShowTrash = false">返 回</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  productSearch,
  productReduction,
  productDelete,
} from '../../api/productPool';
import bus from '../../utils/bus';
import { deepClone } from '../../utils/tools';
export default {
  data() {
    return {
      tableData: [],
      pageSize: 10,
      page: 1,
      total: 0,
      resultData: [],
      isShowTrash: false,
    };
  },
  computed: {},
  created() {
    this.tableData = deepClone(this.$store.state.productPool.trashGameList);
  },
  mounted() {
    bus.$on('open_trash', (status) => {
      this.isShowTrash = true;
    });
  },
  methods: {
    //   删除产品
    async productDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let result = await productDelete({ id: row.id });
          if (result.code != 1000) return this.$message.error(result.msg);
          this.$message.success(result.msg);
          this.productSearch();
        })
        .catch(() => {});
    },
    //   还原产品
    async productReduction(row) {
      let result = await productReduction({ id: row.id });
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      bus.$emit('init_data');
      this.productSearch();
      this.isShowTrash = false;
    },
    async productSearch() {
      let result = await productSearch({ del: 2, status: 1 });
      if (result.code != 1000) return this.$message.error(result.msg);
      this.resultData = result.data;
      this.dataLimit();
    },
    dataLimit() {
      this.total = this.resultData.length;
      let start = (this.page - 1) * this.pageSize;
      this.tableData = [];
      for (let i = 0; i < this.pageSize; i++) {
        if (start < this.resultData.length) {
          this.tableData.push(this.resultData[start]);
          start++;
        }
      }
    },
    //   弹窗打开
    open() {
      this.productSearch();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.dataLimit();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.dataLimit();
    },
    handleClose() {
      this.isShowTrash = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>