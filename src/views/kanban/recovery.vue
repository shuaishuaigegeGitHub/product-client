<template>
  <el-dialog
    title="回收站"
    center
    :visible.sync="dialogVisible"
    width="50%"
    destroy-on-close
    :before-close="close"
    @open="searchRecover"
  >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="project_name" label="项目名称" width="180"></el-table-column>
      <el-table-column prop="begin_time" label="项目开始时间" width="180"></el-table-column>
      <el-table-column prop="update_time" label="最后更新时间"></el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            class="listButton"
            @click="reutrnTo(scope.row)"
          >恢复内容</el-button>
          <el-button
            class="listButton"
            icon="el-icon-delete"
            size="mini"
            @click="thoroughdle(scope.row)"
          >彻底删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-popover placement="top" width="400" trigger="click">
      <el-form>
        <el-form-item label="分组"></el-form-item>
        <el-form-item label="列表"></el-form-item>
      </el-form>

      <el-button slot="reference" size="mini" icon="el-icon-edit" class="listButton">恢复内容</el-button>
    </el-popover>-->
    <el-dialog
      title="选择位置"
      center
      :visible.sync="productVisiable"
      width="20%"
      destroy-on-close
      append-to-body
    >
      <el-form>
        <el-form-item label="所属分组">
          <el-select v-model="form.group_id" @change="groupChange">
            <el-option
              v-for="item in groupOptions"
              :index="item.id"
              :key="item.id"
              :label="item.group_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属列表">
          <el-select v-model="form.list_id" @focus="listFocus">
            <el-option
              v-for="item in listOptions"
              :index="item.id"
              :key="item.id"
              :label="item.list_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" style="width:100%" @click="reutrnToProduct">确定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>
<script>
import {
  groupSearch,
  searchproject_list,
  returnToProduct
} from '../../api/kanban';
import { searchRecover, thoroughdle } from '../../api/project';
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
      productVisiable: false,
      tableData: [],
      form: {
        group_id: '',
        list_id: '',
        id: ''
      },
      groupOptions: [],
      listOptions: []
    };
  },
  methods: {
    //   彻底删除
    async thoroughdle(row) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          console.log('row', row);
          let result = await thoroughdle(row);
          if (result.code != 1000) return this.$message.warning(result.msg);
          this.$message.success(result.msg);
          this.searchRecover();
        })
        .catch(() => {});
    },
    //   恢复项目
    async reutrnToProduct() {
      if (!this.form.id) return this.$message.warning('项目错误');
      if (!this.form.group_id) return this.$message.warning('请选择分组');
      if (!this.form.list_id) return this.$message.warning('请选择列表');
      let result = await returnToProduct(this.form);
      if (result.code != 1000) return this.$message.warning(result.msg);
      this.$message.success(result.msg);
      this.productVisiable = false;
      this.searchRecover();
    },
    //   列表获取焦点
    listFocus() {
      if (!this.form.group_id) {
        this.$message.warning('请先选择分组');
        this.listOptions = [];
      }
    },
    //   分组改变时
    groupChange() {
      this.form.list_id = '';
      console.log('groupChange');
      this.searchproject_list();
    },
    //   点击恢复
    reutrnTo(row) {
      this.productVisiable = true;
      (this.form.id = ''),
        (this.form.group_id = ''),
        (this.form.list_id = ''),
        (this.form.id = row.id);
      this.groupSearch();
    },
    // 任务列表
    async searchproject_list() {
      if (!this.form.group_id) return this.$message.warning('请先选择分组');
      let result = await searchproject_list({ group_id: this.form.group_id });
      if (result.code != 1000) return this.$message.warning(result.msg);
      this.listOptions = result.data;
    },
    // 查询分组
    async groupSearch() {
      let result = await groupSearch();
      if (result.code != 1000) return this.$message.warning(result.msg);
      this.groupOptions = result.data;
    },
    close() {
      this.$emit('close');
    },
    // 查询回收站数据
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
<style >
.listButton {
  border: none;
  color: #595959c7;
}
</style>