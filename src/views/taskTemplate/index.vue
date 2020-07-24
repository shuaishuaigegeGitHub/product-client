<template>
  <!-- 每日任务查看模板  -->
  <div class="cl-body">
    <!-- 日历 -->
    <span>
      <calendar
        :spotData="spotData"
        @timedataFormat="timedataFormat"
        @handleClickDay="handleClickDay"
      />
    </span>
    <span style="float:left;margin-left:200px" class="timelineDate">
      <!-- 时间轴 -->
      <el-timeline style="margin-left:0px">
        <el-timeline-item
          v-for="(item, index) in taskData"
          :key="index"
          :timestamp="formatDate(item.create_time)"
        >{{dataToString(item)}}</el-timeline-item>
      </el-timeline>
    </span>
  </div>
</template>
<script>
import calendar from '../components/calendar/calendar';
export default {
  components: { calendar },
  data() {
    return {
      spotData: {},
      taskData: []
    };
  },
  mounted() {},
  methods: {
    dataToString(item) {
      let result = ` 任务类型:${item.type_name},任务模块:${
        item.module_name
      }, 负责人:${item.task_username}, 验收状态:${
        item.check == 1 ? '未验收' : item.check == 2 ? '验收失败' : '验收成功'
      }, 验收备注:${item.check_remark || ''}  `;
      return result;
    },
    // 日期点击事件
    async handleClickDay(time) {
      console.log(time);
      let result = await this.$axios.post('/taskTemplate/taskData', {
        time: time.getTime()
      });
      if (result.code != 1000) {
        return this.$message.error(result.msg);
      }
      console.log('click', result);
      this.taskData = result.data;
    },
    //   日历初始化和月分改变时，获取年月，然后加载任务数据，判断那天有任务数据，控制天数下方点的显示
    async timedataFormat(data) {
      let result = await this.$axios.post('/taskTemplate/spotData', {
        month: data.month,
        year: data.year
      });
      if (result.code != 1000) {
        return this.$message.error(result.msg);
      }
      this.spotData = {};
      result.data.forEach(element => {
        let time = new Date(Number(element.create_time) * 1000);
        let k = time.getDate();
        this.spotData[k] = 1;
      });
      await this.handleClickDay(new Date(data.year, data.month, data.date));
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
    }
  }
};
</script>
<style scoped>
.cl-body {
  display: flex;
  justify-content: flex-start;
}
.timelineDate {
  margin-top: 70px;
}
</style>