<template>
  <div class="project-approval">
    <!-- <div class="select-status">
      <p>立项状态：</p>
      <el-select
        v-model="selectedStatusId"
        placeholder="全部"
        clearable
        popper-class="select-status1"
      >
        <el-option v-for="item in projectStatus" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>-->
    <div class="project-list">
      <el-table
        :data="showTableData"
        style="width: 100%"
        :height="HEIGHT"
        :row-class-name="'warning-row'"
        :header-cell-style="headerStyle"
        border
      >
        <el-table-column
          :key="1"
          prop="product_name"
          label="游戏名称"
          align="center"
        ></el-table-column>
        <el-table-column :key="2" prop="name" label="项目体量" align="center">
          <template slot-scope="scope">{{
            project_types.filter((item) => item.id === scope.row.project_type)
              | projectTypeFilter
          }}</template>
        </el-table-column>
        <el-table-column
          :key="4"
          prop="priority"
          label="产品优先级"
          align="center"
        >
          <template slot-scope="scope">
            <div class="demo">
              <!-- <span v-if="scope.row.priority === 1">重大</span>
              <span v-else-if="scope.row.priority === 2">核心</span>
              <span v-else-if="scope.row.priority === 3">一般</span>-->
              <img
                class="word-img"
                src="../../assets/img/S.png"
                style="width: 20px; height: 20px"
                v-if="scope.row.priority === 1"
              />
              <img
                src="../../assets/img/A.png"
                style="width: 20px; height: 20px"
                v-if="scope.row.priority === 2"
              />
              <img
                src="../../assets/img/B.png"
                style="width: 20px; height: 20px"
                v-if="scope.row.priority === 3"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :key="3"
          prop="create_time"
          label="立项时间"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.create_time }}</template>
        </el-table-column>
        <el-table-column :key="5" prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              v-if="
                scope.row.status === 1 &&
                (scope.row.plan_manage_id === userId ||
                  scope.row.manage_id === userId)
              "
              >文案上报中</el-tag
            >
            <el-tag
              v-else-if="
                scope.row.status === 2 &&
                (scope.row.manage_id === userId ||
                  scope.row.plan_manage_id === userId)
              "
              >文案待审中</el-tag
            >
            <el-tag
              v-else-if="
                scope.row.status === 3 && scope.row.manage_id !== userId
              "
              >任务排期</el-tag
            >
            <el-tag
              v-else-if="
                (scope.row.status === 3 || scope.row.status === 4) &&
                scope.row.manage_id === userId
              "
              >排期待审中</el-tag
            >
            <el-tag v-else-if="scope.row.status === 5" type="success"
              >已完成</el-tag
            >
            <el-tag type="danger" v-else-if="scope.row.status === 0"
              >已废除</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          :key="6"
          prop="zip"
          label="操作"
          align="center"
          min-width="100px"
        >
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="handleReport(scope.$index, scope.row)"
              v-if="
                scope.row.status === 1 && scope.row.plan_manage_id === userId
              "
              >上报</el-button
            >
            <el-button
              type="success"
              size="mini"
              @click="handleUpload(scope.$index, scope.row)"
              v-if="scope.row.manage_id === userId && scope.row.status === 2"
              >文案审核</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              v-if="scope.row.manage_id === userId"
              @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="setPersonConfig(scope.$index, scope.row)"
              v-if="scope.row.status === 2 && scope.row.manage_id === userId"
              >人员配置</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="editTask(scope.$index, scope.row)"
              v-if="scope.row.status === 3 && scope.row.manage_id !== userId"
              >任务排期</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="checkTask(scope.$index, scope.row)"
              v-if="scope.row.status === 3 && scope.row.manage_id === userId"
              >排期审核</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="toggleMilestone(scope.$index, scope.row)"
              v-if="scope.row.status > 2 && scope.row.manage_id === userId"
              >里程碑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="setPage"
          :current-page.sync="page"
          :page-size.sync="size"
          :page-sizes="[20, 30, 50]"
          layout="sizes,prev, pager, next"
          :total="totalCount"
          popper-class="pagination1"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="文案审核"
      :visible.sync="showReportStatus"
      width="30%"
      :before-close="handleCloseShowReport"
    >
      <el-form ref="reportStatus" label-width="120px">
        <el-form-item label="审核状态：">
          <el-radio-group v-model="reportStatus">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="0">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reportStatus = false">取 消</el-button>
        <el-button type="primary" @click="submitReportStatus">确 定</el-button>
      </span>
    </el-dialog>
    <person-config></person-config>
    <task-edit></task-edit>
    <task-approve></task-approve>
    <edit-project></edit-project>
    <milestone></milestone>
  </div>
</template>
<script>
import { deepClone } from '../../utils/tools';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
import PersonConfig from './PersonConfig';
import TaskEdit from './TaskEdit';
import TaskApprove from './TaskApprove';
import Milestone from './Milestone';
import { searchProduct, productStatus } from '../../api/projectApproval';
import EditProject from './EditProject';
import { queryUser } from '../../api/user';
export default {
  components: {
    PersonConfig,
    TaskEdit,
    TaskApprove,
    EditProject,
    Milestone,
  },
  data() {
    return {
      // 项目的几种状态下拉框
      projectStatus: [
        {
          id: 1,
          name: '进行中',
        },
        {
          id: 2,
          name: '已完成',
        },
        {
          id: 3,
          name: '废除',
        },
      ],
      selectedStatusId: '',
      //   表格数据
      tableData: [],
      showTableData: [],
      HEIGHT: window.innerHeight - 230,
      page: 1,
      size: 20,
      totalCount: 0,
      userId: 0,
      project_types: [
        {
          id: 1,
          name: '超轻度',
        },
        {
          id: 2,
          name: '轻度游戏',
        },
        {
          id: 3,
          name: '中度游戏',
        },
        {
          id: 4,
          name: '重度游戏',
        },
      ],
      sources: [
        {
          id: 1,
          name: '直接立项',
        },
        {
          id: 2,
          name: '微创新',
        },
        {
          id: 3,
          name: '选品会',
        },
        {
          id: 4,
          name: '自主设计',
        },
      ],
      reportStatus: 1,
      showReportStatus: false,
      selectedProductId: 0,
      selectedProductStatus: 0,
      users: [],
    };
  },
  filters: {
    projectTypeFilter(val) {
      if (!val.length) {
        return '';
      }
      return val[0].name;
    },
  },
  created() {
    this.init();
  },
  mounted() {
    bus.$on('init-person-list', () => {
      this.init();
    });
  },
  methods: {
    // 数据初始化
    async init() {
      let res = await searchProduct();
      if (res.code === 1000) {
        this.tableData = deepClone(res.data);
        this.showTableData = this.tableData.slice(
          (this.page - 1) * Number(this.size),
          this.page * Number(this.size)
        );
      }
      this.userId = this.$store.state.user.user.uid;
      let result = await queryUser();
      if (result.code != 1000) return this.$message.error(result.msg);
      this.users = deepClone(result.data);
    },
    //   自定义表格头部背景色
    headerStyle() {
      return 'background-color: #99CC99 !important;';
    },

    // 切换当前页数
    setPage(val) {
      this.page = val;
      this.showDataList = deepClone(this.dataList).splice(
        (this.page - 1) * this.size,
        this.size
      );
    },
    // 切换页面显示数据量
    handleSizeChange(val) {
      this.pageSize = val;
      this.page = 1;
      this.showDataList = deepClone(this.dataList).splice(
        (this.page - 1) * this.size,
        this.size
      );
    },
    // 人员配置弹出框
    setPersonConfig(index, data) {
      bus.$emit('toggle-person-config-show', [true, data]);
    },
    editTask(index, data) {
      // 个人编辑页面
      bus.$emit('edit-task', data);
    },
    // 单个项目编辑
    handleEdit(index, data) {
      bus.$emit('show_edit_project', data);
    },
    // 项目废除
    handleDelete(index, data) {},
    async handleReport(index, data) {
      this.$confirm('该操作将进入文案审核阶段，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let res = await productStatus({
            id: data.id,
            status: ++data.status,
          });
          if (res.code === 1000) {
            this.$message({
              message: res.msg,
              type: 'success',
            });
            window.location.reload();
          }
        })
        .catch(() => {});
    },
    checkTask(index, data) {
      //   负责人总览页面
      bus.$emit('all-task-approve', data);
    },
    // 文案上报审核
    async handleUpload(index, data) {
      console.log(data);
      if (!data.codePerson.length) {
        this.$message({
          message: '请进行程序人员配置',
          type: 'warning',
        });
        return;
      }
      if (!data.artPerson.length) {
        this.$message({
          message: '请进行美术人员配置',
          type: 'warning',
        });
        return;
      }
      if (!data.planPerson.length) {
        this.$message({
          message: '请进行策划人员配置',
          type: 'warning',
        });
        return;
      }
      if (!data.operatePerson.length) {
        this.$message({
          message: '请进行运营人员配置',
          type: 'warning',
        });
        return;
      }
      this.selectedProductId = data.id;
      this.showReportStatus = true;
      this.selectedProductStatus = data.status;
    },
    handleCloseShowReport() {
      this.showReportStatus = false;
    },
    // 更改上报状态
    async submitReportStatus() {
      if (this.reportStatus) {
        let res = await productStatus({
          id: this.selectedProductId,
          status: ++this.selectedProductStatus,
        });
        if (res.code === 1000) {
          this.$message({
            message: res.msg,
            type: 'success',
          });
          window.location.reload();
        }
      } else {
        let res = await productStatus({
          id: this.selectedProductId,
          status: --this.selectedProductStatus,
        });
        if (res.code === 1000) {
          this.$message({
            message: res.msg,
            type: 'success',
          });
          window.location.reload();
        }
      }
    },
    toggleMilestone(index, data) {
      //  里程碑页面
      bus.$emit('milestone', [this.users, data]);
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
  .word-img {
    transform: rotate(10deg);
  }
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
/* .select-status1 .el-select-dropdown__list, */
.project-approval
  .pagination
  .el-pagination
  .el-select
  .el-input
  .el-input__inner,
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

