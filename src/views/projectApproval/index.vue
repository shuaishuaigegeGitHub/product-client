<template>
  <div class="project-approval">
    <div class="select-status">
      <p>立项状态：</p>
      <el-select
        v-model="selectedStatusId"
        placeholder="全部"
        clearable
        popper-class="select-status1"
      >
        <el-option v-for="item in projectStatus" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="project-list">
      <el-table
        :data="tableData"
        style="width: 100%"
        :height="HEIGHT"
        :row-class-name="'warning-row'"
        :header-cell-style="headerStyle"
        border
      >
        <el-table-column :key="1" prop="date" label="游戏名称" align="center"></el-table-column>
        <el-table-column :key="2" prop="name" label="产品类型" align="center"></el-table-column>
        <el-table-column :key="3" prop="province" label="产品优先级" align="center"></el-table-column>
        <el-table-column :key="4" prop="project_lev" label="产品优先级" align="center">
          <template slot-scope="scope">
            <div class="demo">
              <img
                src="../../assets/img/star.png"
                style="width:20px;height:20px;"
                v-if="scope.row.project_lev === 1 || scope.row.project_lev === 2 ||scope.row.project_lev === 3"
              />
              <img
                src="../../assets/img/star.png"
                style="width:30px;height:30px;"
                v-if="scope.row.project_lev === 2 ||scope.row.project_lev === 3"
              />
              <img
                src="../../assets/img/star.png"
                style="width:20px;height:20px;"
                v-if="scope.row.project_lev === 3"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column :key="5" prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1">审核中</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 2">已通过</el-tag>
            <el-tag type="danger" v-else>未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column :key="6" prop="zip" label="操作" align="center" min-width="100px">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="handleUpload(scope.$index, scope.row)"
              v-if="scope.row.process === 1"
            >上报</el-button>
            <el-button
              type="success"
              size="mini"
              @click="handleUpload(scope.$index, scope.row)"
              v-if="scope.row.process !== 1"
            >审核</el-button>
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">废除</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="setPersonConfig(scope.$index, scope.row)"
              v-if="scope.row.process === 2"
            >人员配置</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="editTask(scope.$index, scope.row)"
              v-if="scope.row.process === 3"
            >排期</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="setPage"
          :current-page.sync="currentPage"
          :page-size.sync="pageSize"
          :page-sizes="[20,50,100]"
          :pager-count="5"
          layout="sizes, prev, pager, next"
          :total="dataCount"
          popper-class="pagination1"
        ></el-pagination>
      </div>
    </div>
    <person-config></person-config>
    <task-edit></task-edit>
    <task-approve></task-approve>
  </div>
</template>
<script>
import { deepClone } from '../../utils/tools';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
import PersonConfig from './PersonConfig';
import TaskEdit from './TaskEdit';
import TaskApprove from './TaskApprove';
export default {
  components: { PersonConfig, TaskEdit, TaskApprove },
  data() {
    return {
      //   headerStyle: 'background-color: #99CC99 !important;',
      // 项目的几种状态下拉框
      projectStatus: [
        {
          id: 1,
          name: '未提交',
        },
        {
          id: 2,
          name: '待审核',
        },
        {
          id: 3,
          name: '已通过',
        },
      ],
      selectedStatusId: '',
      //   表格数据
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          project_lev: 1,
          zip: 200333,
          status: 1,
          process: 1,
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          project_lev: 2,
          zip: 200333,
          status: 2,
          process: 2,
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          project_lev: 3,
          zip: 200333,
          status: 1,
          process: 2,
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          project_lev: 2,
          zip: 200333,
          status: 2,
          process: 3,
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          project_lev: 1,
          zip: 200333,
          status: 1,
          process: 1,
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          project_lev: 3,
          zip: 200333,
          status: 2,
          process: 3,
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          project_lev: 2,
          zip: 200333,
          status: 3,
          process: 2,
        },
      ],
      HEIGHT: window.innerHeight - 230,
      //   当前页
      currentPage: 1,
      //   每页数据量
      pageSize: 20,
      //   总数据量
      dataCount: 100,
    };
  },
  created() {},
  mounted() {},
  methods: {
    //   自定义表格头部背景色
    headerStyle() {
      return 'background-color: #99CC99 !important;';
    },
    //   切换页面数据量
    handleSizeChange() {},
    // 换页
    setPage() {},
    // 人员配置弹出框
    setPersonConfig(index, data) {
      bus.$emit('toggle-person-config-show', true);
    },
    editTask(index, data) {
      // 个人编辑页面
      //   bus.$emit('edit-task', true);
      //   负责人总览页面
      bus.$emit('all-task-approve', true);
    },
  },
};
</script>
<style lang="scss" scoped>
.project-approval {
  padding: 15px;
  width: 100%;
  height: 100%;
  background-color: beige;
  .select-status {
    display: flex;
    align-items: center;
  }
  .project-list {
    padding-top: 15px;
  }
  .pagination {
    padding-right: 25px;
  }
}
</style>
<style>
.select-status .el-input--medium .el-input__inner,
.select-status1 .el-select-dropdown__list,
.pagination .el-pagination .el-select .el-input .el-input__inner,
.pagination1 .el-select-dropdown__list,
.project-list .el-table {
  background-color: rgba(245, 245, 220, 1) !important;
}
.el-popper[x-placement^='top'] .popper__arrow::after {
  border-top-color: rgba(245, 245, 220, 1) !important;
}
.select-status1 .el-select-dropdown__item.hover,
.select-status1 .el-select-dropdown__item:hover,
.pagination1 .el-select-dropdown__item.hover,
.pagination1 .el-select-dropdown__item:hover {
  background-color: rgba(220, 219, 220, 0.4);
}
.project-approval .el-table__body-wrapper,
.project-approval .el-table .warning-row {
  background: rgba(243, 243, 217, 0.8);
}
.project-approval .el-table__body tr:hover > td,
.el-table__body tr.hover-row > td {
  background-color: rgba(220, 219, 220, 0.4) !important;
}
.pagination .el-pagination .btn-prev,
.pagination .el-pagination .btn-next,
.pagination .el-pager li {
  background-color: transparent !important;
}
</style>

