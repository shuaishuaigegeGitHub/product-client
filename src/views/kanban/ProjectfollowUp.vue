<template>
  <!-- 项目跟进 -->
  <div class="bodySt">
    <el-timeline :infinite-scroll-disabled="disabled" v-infinite-scroll="load">
      <el-timeline-item
        v-for="(item,index) in tableData"
        :key="index"
        :timestamp="item.time"
        placement="top"
      >
        <el-card>
          <el-table :data="item.data">
            <el-table-column header-align="center" label="策划">
              <el-table-column header-align="center" label="任务分配">
                <el-table-column label="任务负责人" show-overflow-tooltip prop="1_task_username"></el-table-column>
                <el-table-column label="任务模块" show-overflow-tooltip prop="1_module_name"></el-table-column>
                <el-table-column label="详细任务" show-overflow-tooltip prop="1_task_name"></el-table-column>
                <el-table-column label="完成状态" show-overflow-tooltip>
                  <template slot-scope="scope">{{StateFormat(scope.row["1_state"])}}</template>
                </el-table-column>
              </el-table-column>
              <el-table-column header-align="center" label="任务验收">
                <el-table-column label="验收人" show-overflow-tooltip prop="1_acceptor_username"></el-table-column>
                <el-table-column label="验收状态" show-overflow-tooltip>
                  <template slot-scope="scope">{{checkStateFormat(scope.row["1_check"])}}</template>
                </el-table-column>
                <el-table-column label="验收备注" show-overflow-tooltip prop="1_check_remark"></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column header-align="center" label="美术">
              <el-table-column header-align="center" label="任务分配">
                <el-table-column label="任务负责人" show-overflow-tooltip prop="2_task_username"></el-table-column>
                <el-table-column label="任务模块" show-overflow-tooltip prop="2_module_name"></el-table-column>
                <el-table-column label="详细任务" show-overflow-tooltip prop="2_task_name"></el-table-column>
                <el-table-column label="完成状态" show-overflow-tooltip>
                  <template slot-scope="scope">{{StateFormat(scope.row["2_state"])}}</template>
                </el-table-column>
              </el-table-column>
              <el-table-column header-align="center" label="任务验收">
                <el-table-column label="验收人" show-overflow-tooltip prop="2_acceptor_username"></el-table-column>
                <el-table-column label="验收状态" show-overflow-tooltip>
                  <template slot-scope="scope">{{checkStateFormat(scope.row["2_check"])}}</template>
                </el-table-column>
                <el-table-column label="验收备注" show-overflow-tooltip prop="2_check_remark"></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column header-align="center" label="程序">
              <el-table-column header-align="center" label="任务分配">
                <el-table-column label="任务负责人" show-overflow-tooltip prop="3_task_username"></el-table-column>
                <el-table-column label="任务模块" show-overflow-tooltip prop="3_module_name"></el-table-column>
                <el-table-column label="详细任务" show-overflow-tooltip prop="3_task_name"></el-table-column>
                <el-table-column label="完成状态" show-overflow-tooltip>
                  <template slot-scope="scope">{{StateFormat(scope.row["3_state"])}}</template>
                </el-table-column>
              </el-table-column>
              <el-table-column header-align="center" label="任务验收">
                <el-table-column label="验收人" show-overflow-tooltip prop="3_acceptor_username"></el-table-column>
                <el-table-column label="验收状态" show-overflow-tooltip>
                  <template slot-scope="scope">{{checkStateFormat(scope.row["3_check"])}}</template>
                </el-table-column>
                <el-table-column label="验收备注" show-overflow-tooltip prop="3_check_remark"></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column header-align="center" label="运营">
              <el-table-column header-align="center" label="任务分配">
                <el-table-column label="任务负责人" show-overflow-tooltip prop="4_task_username"></el-table-column>
                <el-table-column label="任务模块" show-overflow-tooltip prop="4_module_name"></el-table-column>
                <el-table-column label="详细任务" show-overflow-tooltip prop="4_task_name"></el-table-column>
                <el-table-column label="完成状态" show-overflow-tooltip>
                  <template slot-scope="scope">{{StateFormat(scope.row["4_state"])}}</template>
                </el-table-column>
              </el-table-column>
              <el-table-column header-align="center" label="任务验收">
                <el-table-column label="验收人" show-overflow-tooltip prop="4_acceptor_username"></el-table-column>
                <el-table-column label="验收状态" show-overflow-tooltip>
                  <template slot-scope="scope">{{checkStateFormat(scope.row["4_check"])}}</template>
                </el-table-column>
                <el-table-column label="验收备注" show-overflow-tooltip prop="4_check_remark"></el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-card>
      </el-timeline-item>
      <div class="notHave" v-if="disabled">没有更多了</div>
    </el-timeline>
  </div>
</template>
<script>
import { followUp } from '../../api/project';
export default {
  name: 'followUp',
  mounted() {
    this.searchForm.project_id = this.$route.params.projectId;
    this.search();
  },
  data() {
    return {
      tableData: [],

      disabled: false,
      searchForm: {
        project_id: '',
        page: 1
      }
    };
  },
  methods: {
    //   查询数据
    async search() {
      this.disabled = true;
      let result = await followUp(this.searchForm);
      this.disabled = false;
      console.log('result,followUp', result);
      if (result.code == 2000) {
        this.disabled = true;
        return;
      }
      if (result.code != 1000) return this.$message.error(result.msg);
      this.tableData.push(...result.data);
    },
    checkStateFormat(check) {
      let str = '';
      switch (check) {
        case 1:
          str = '未验收';
          break;
        case 2:
          str = '验收失败';
          break;
        case 3:
          str = '验收通过';
          break;
        default:
          break;
      }
      return str;
    },
    // 状态转文字
    StateFormat(state) {
      let str = '';
      switch (state) {
        case 1:
          str = '未开始';
          break;
        case 2:
          str = '进行中';
          break;
        case 3:
          str = '已完成';
          break;
        case 4:
          str = '已延期';
          break;
        case 5:
          str = '顺延中';
          break;
        default:
          break;
      }
      return str;
    },
    //  无限滚动触发调用函数
    load() {
      this.searchForm.page++;
      this.disabled = true;
      this.search();
      console.log('this.page', this.searchForm.page);
    }
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
.notHave {
  width: 100%;
  font-size: 20px;
  text-align: center;
}
</style>
