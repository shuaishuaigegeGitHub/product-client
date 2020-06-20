<template>
  <el-dialog title="回收站" center :visible.sync="dialogVisible" width="50%">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="project_name" label="项目名称" width="180"></el-table-column>
      <el-table-column prop="begin_time" label="项目开始时间" width="180"></el-table-column>
      <el-table-column prop="update_time" label="最后更新时间"></el-table-column>
      <el-table-column label="操作">
        <el-button>恢复内容</el-button>
        <el-button>彻底删除</el-button>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import { searchRecover } from '../../api/project';
export default {
  name: 'recovery',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    async searchRecover() {
      let result = await searchRecover();
      if (result.code != 1000) {
        return this.$message.error(result.msg);
      }
      this.tableData = result.data;
    }
  }
};
</script>