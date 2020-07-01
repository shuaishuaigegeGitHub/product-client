<template>
  <!-- 项目跟进 -->
  <div class="bodySt">
    <el-button @click="search">查询</el-button>
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
                <el-table-column label="负责人" show-overflow-tooltip></el-table-column>
                <el-table-column label="任务模块" show-overflow-tooltip></el-table-column>
                <el-table-column label="详细任务" show-overflow-tooltip></el-table-column>
                <el-table-column label="完成状态" show-overflow-tooltip></el-table-column>
              </el-table-column>
              <el-table-column header-align="center" label="任务验收">
                <el-table-column label="验收人" show-overflow-tooltip></el-table-column>
                <el-table-column label="验收状态" show-overflow-tooltip></el-table-column>
                <el-table-column label="验收备注" show-overflow-tooltip></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column header-align="center" label="美术">
              <el-table-column header-align="center" label="任务分配">
                <el-table-column label="负责人" show-overflow-tooltip></el-table-column>
                <el-table-column label="任务模块" show-overflow-tooltip></el-table-column>
                <el-table-column label="详细任务" show-overflow-tooltip></el-table-column>
                <el-table-column label="完成状态" show-overflow-tooltip></el-table-column>
              </el-table-column>
              <el-table-column header-align="center" label="任务验收">
                <el-table-column label="验收人" show-overflow-tooltip></el-table-column>
                <el-table-column label="验收状态" show-overflow-tooltip></el-table-column>
                <el-table-column label="验收备注" show-overflow-tooltip></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column header-align="center" label="程序">
              <el-table-column header-align="center" label="任务分配">
                <el-table-column label="负责人" show-overflow-tooltip></el-table-column>
                <el-table-column label="任务模块" show-overflow-tooltip></el-table-column>
                <el-table-column label="详细任务" show-overflow-tooltip></el-table-column>
                <el-table-column label="完成状态" show-overflow-tooltip></el-table-column>
              </el-table-column>
              <el-table-column header-align="center" label="任务验收">
                <el-table-column label="验收人" show-overflow-tooltip></el-table-column>
                <el-table-column label="验收状态" show-overflow-tooltip></el-table-column>
                <el-table-column label="验收备注" show-overflow-tooltip></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column header-align="center" label="运营">
              <el-table-column header-align="center" label="任务分配">
                <el-table-column label="负责人" show-overflow-tooltip></el-table-column>
                <el-table-column label="任务模块" show-overflow-tooltip></el-table-column>
                <el-table-column label="详细任务" show-overflow-tooltip></el-table-column>
                <el-table-column label="完成状态" show-overflow-tooltip></el-table-column>
              </el-table-column>
              <el-table-column header-align="center" label="任务验收">
                <el-table-column label="验收人" show-overflow-tooltip></el-table-column>
                <el-table-column label="验收状态" show-overflow-tooltip></el-table-column>
                <el-table-column label="验收备注" show-overflow-tooltip></el-table-column>
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
    this.search;
  },
  data() {
    return {
      tableData: [
        {
          time: '2020-06-01'
        }
      ],

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
      let result = await followUp(this.searchForm);
      this.disabled = false;
      console.log('result,followUp', result);
      if (result.code == 2000) return (this.disabled = true);
      if (result.code != 1000) return this.$message.error(result.msg);
      this.tableData.push(...result.data);
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
