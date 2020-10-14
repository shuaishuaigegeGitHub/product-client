<template>
  <div class="calendar-content">
    <div class="calendar-header">
      <i class="icon iconfont icon-Left" @click="preMonth"></i>
      <h3>{{ date | changeDate }}</h3>
      <i class="icon iconfont icon-right1" @click="nextMonth"></i>
    </div>
    <div class="content">
      <div class="week">
        <div>周日</div>
        <div>周一</div>
        <div>周二</div>
        <div>周三</div>
        <div>周四</div>
        <div>周五</div>
        <div>周六</div>
      </div>
      <div class="day" v-for="(item, index) in dateList" :key="index">
        <div
          :style="{ height: INIT_HEIGHT + 'px', width: INIT_WIDTH + 'px' }"
          class="day-item"
          v-for="itm in item"
          :key="itm.date"
          :class="[date == itm.date && nowDate == itm.date ? 'single-day' : '']"
        >
          <h4 style="font-size: 20px; display: flex; align-items: center">
            <span
              :class="[
                date == itm.date && nowDate == itm.date ? 'now-day' : '',
                date.slice(5, 7) == itm.date.slice(5, 7) ? '' : 'no-now-month',
              ]"
              >{{ itm.date.slice(8) }}</span
            >
            <div>
              <p
                style="font-size: 13px; margin-left: 5px; color: #0080fa"
                v-if="nowDate == itm.date"
              >
                {{ itm.date | changeLunar }}
              </p>
              <p
                v-else
                style="
                  font-size: 13px;
                  margin-left: 5px;
                  color: rgba(125, 125, 125, 0.4);
                "
              >
                {{ itm.date | changeLunar }}
              </p>
            </div>
          </h4>
          <div class="task">
            <p
              v-for="option in itm.list"
              :key="option.startStamp"
              class="item-task"
            >
              <el-popover placement="right" width="450" trigger="click">
                <h3 style="margin-bottom: 15px; color: #00af51">
                  任务排期展示
                </h3>
                <div style="margin-left: 10px; margin-top: 10px">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(activity, index) in option.list"
                      :key="index"
                      :timestamp="activity.time"
                    >
                      <p
                        style="
                          display: flex;
                          justify-content: space-between;
                          padding-right: 10px;
                        "
                      >
                        <span style="margin-right: 20px">{{
                          activity.task_detail
                        }}</span>
                        <template>
                          <el-tag
                            type="info"
                            v-if="activity.state === 1 && activity.check === 1"
                            >未开始</el-tag
                          >
                          <el-tag
                            type="success"
                            v-else-if="
                              activity.state === 1 && activity.check === 2
                            "
                            >待审核</el-tag
                          >
                          <el-tag
                            type="success"
                            v-else-if="activity.state === 2"
                            >已完成</el-tag
                          >
                          <el-tag type="danger" v-else-if="activity.state === 3"
                            >延期未完成</el-tag
                          >
                          <el-tag
                            type="warning"
                            v-else-if="activity.state === 4"
                            >延期已完成</el-tag
                          >
                        </template>
                        <!-- <i
                          class="el-icon-close"
                          style="border-radius:50%;background-color:#FB542C;padding:3px;color:white;width:15px;height:15px;margin-left:10px;"
                          v-if="activity.state === 3"
                        ></i>
                        <i
                          class="el-icon-check"
                          style="border-radius:50%;background-color:#5CBA40;padding:3px;color:white;width:15px;height:15px;margin-left:10px;"
                          v-else-if="activity.state === 2"
                        ></i>
                        <i
                          class="el-icon-minus"
                          style="border-radius:50%;background-color:#CFCFCF;padding:3px;color:white;width:15px;height:15px;margin-left:10px;"
                          v-else-if="activity.state ===1"
                        ></i>-->
                      </p>
                    </el-timeline-item>
                  </el-timeline>
                </div>
                <p
                  style="text-align:right;color:#2B8DF5;line-height;17px;cursor:pointer;"
                  @click="drawer = true"
                >
                  详情
                  <i
                    class="icon iconfont icon-right1"
                    style="font-size: 17px"
                  ></i>
                </p>
                <span slot="reference" @click="toggleDetail(option, itm)">
                  <i
                    class="icon iconfont icon-dot"
                    style="color: #00af51; font-size: 17px"
                  ></i>
                  {{ option.name | crossWord }}
                </span>
              </el-popover>
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-drawer
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
      size="500px"
    >
      <div class="drawer">
        <h2 style="margin-bottom: 15px; margin-left: 15px">
          任务排期展示
          <span style="color: #00af51; font-size: 16px"
            >【{{ detailData.name }}】</span
          >
        </h2>
        <div class="block">
          <h4 style="margin-bottom: 10px; margin-left: 10px">全部任务</h4>
          <el-timeline>
            <el-timeline-item :timestamp="detailDate.date" placement="top">
              <el-card>
                <div
                  v-for="(activity, index) in detailData.list"
                  :key="index"
                  :timestamp="activity.time"
                >
                  <el-divider content-position="left">{{
                    activity.time
                  }}</el-divider>
                  <p style="display: flex; align-items: center">
                    <i
                      class="icon iconfont icon-dot"
                      v-if="activity.state === 1"
                      style="color: #e0e3ea; font-size: 20px"
                    ></i>
                    <i
                      class="icon iconfont icon-dot"
                      v-else-if="activity.state === 2"
                      style="color: #00af51; font-size: 20px"
                    ></i>
                    <i
                      class="icon iconfont icon-dot"
                      v-else-if="activity.state === 3"
                      style="color: #dd3438; font-size: 20px"
                    ></i>
                    <i
                      class="icon iconfont icon-dot"
                      v-else-if="activity.state === 4"
                      style="color: #e2973e; font-size: 20px"
                    ></i>
                    {{ activity.task_detail }}
                  </p>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <h4 style="margin-bottom: 10px; margin-left: 10px">待批任务</h4>
          <el-timeline>
            <el-timeline-item :timestamp="detailDate.date" placement="top">
              <el-card>
                <div
                  v-for="(activity, index) in detailData.list"
                  :key="index"
                  :timestamp="activity.time"
                >
                  <div v-if="activity.check === 2">
                    <el-divider content-position="left">{{
                      activity.time
                    }}</el-divider>
                    <p style="display: flex; align-items: center">
                      <i
                        class="icon iconfont icon-dot"
                        v-if="activity.state === 1"
                        style="color: #e0e3ea; font-size: 20px"
                      ></i>
                      <i
                        class="icon iconfont icon-dot"
                        v-else-if="activity.state === 2"
                        style="color: #00af51; font-size: 20px"
                      ></i>
                      <i
                        class="icon iconfont icon-dot"
                        v-else-if="activity.state === 3"
                        style="color: #dd3438; font-size: 20px"
                      ></i>
                      <i
                        class="icon iconfont icon-dot"
                        v-else-if="activity.state === 4"
                        style="color: #e2973e; font-size: 20px"
                      ></i>
                      {{ activity.task_detail }}
                    </p>
                    <el-row style="text-align: right">
                      <el-button
                        type="success"
                        plain
                        size="mini"
                        @click="togglePass(activity)"
                        >批准</el-button
                      >
                      <el-button type="danger" plain size="mini"
                        >驳回</el-button
                      >
                    </el-row>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import calen from 'solarday2lunarday';
import { deepClone } from '../../utils/tools';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
import {
  manageSearchProduct,
  manageSearchTask,
  checkTask,
} from '../../api/schedule';
import { searchProduct } from '../../api/projectApproval';
export default {
  components: {},
  data() {
    return {
      date: dayjs().format('YYYY-MM-DD'),
      nowDate: dayjs().format('YYYY-MM-DD'),
      dateList: [[], [], [], [], []],
      INIT_LENGTH: 0,
      drawer: false,
      detailData: [],
      detailDate: '',
    };
  },
  filters: {
    crossWord(val) {
      val = val ? val : '';
      if (val.length > 14) {
        return val.slice(0, 14) + '...';
      }
      return val;
    },
    changeDate(val) {
      return val.slice(0, 4) + '年' + val.slice(5, 7) + '月';
    },
    changeLunar(val) {
      let date = calen.solar2lunar(val).Term || calen.solar2lunar(val).IDayCn;
      return date === '初一' ? calen.solar2lunar(val).IMonthCn : date;
    },
  },
  created() {},
  mounted() {
    this.INIT_HEIGHT = window.innerHeight * 0.14;
    this.INIT_WIDTH = window.innerWidth * 0.07;
    this.initDate();
    bus.$on('select-project-calendar', async (id) => {
      this.initDate(this.date, id);
    });
  },
  methods: {
    async initDate(val, id = 0) {
      this.dateList = [[], [], [], [], []];
      let firstDate = '';
      let lastDate = '';
      if (val) {
        firstDate = dayjs(dayjs(val).format('YYYY-MM')).unix();
      } else {
        firstDate = dayjs(dayjs().format('YYYY-MM')).unix();
      }
      if (
        dayjs.unix(firstDate + 86400 * 30).format('MM') ===
        dayjs.unix(firstDate).format('MM')
      ) {
        lastDate = firstDate + 86400 * 30;
      } else if (
        dayjs.unix(firstDate + 86400 * 29).format('MM') ===
        dayjs.unix(firstDate).format('MM')
      ) {
        lastDate = firstDate + 86400 * 29;
      } else if (
        dayjs.unix(firstDate + 86400 * 28).format('MM') ===
        dayjs.unix(firstDate).format('MM')
      ) {
        lastDate = firstDate + 86400 * 28;
      } else if (
        dayjs.unix(firstDate + 86400 * 27).format('MM') ===
        dayjs.unix(firstDate).format('MM')
      ) {
        lastDate = firstDate + 86400 * 27;
      }
      if (dayjs.unix(firstDate).day() === 1) {
        firstDate -= 86400;
      } else if (dayjs.unix(firstDate).day() === 2) {
        firstDate -= 86400 * 2;
      } else if (dayjs.unix(firstDate).day() === 3) {
        firstDate -= 86400 * 3;
      } else if (dayjs.unix(firstDate).day() === 4) {
        firstDate -= 86400 * 4;
      } else if (dayjs.unix(firstDate).day() === 5) {
        firstDate -= 86400 * 5;
      } else if (dayjs.unix(firstDate).day() === 6) {
        firstDate -= 86400 * 6;
      }
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 7; j++) {
          this.dateList[i].push({
            date: dayjs.unix(firstDate).format('YYYY-MM-DD'),
            list: [],
          });
          firstDate += 86400;
        }
      }
      if (
        this.dateList[4][6].date < dayjs.unix(lastDate).format('YYYY-MM-DD')
      ) {
        this.dateList.push([]);
        for (let j = 0; j < 7; j++) {
          this.dateList[5].push({
            date: dayjs.unix(firstDate).format('YYYY-MM-DD'),
            list: [],
          });
          firstDate += 86400;
        }
      }
      let res = await manageSearchProduct({
        begin_time: dayjs(this.dateList[0][0].date).unix(),
        end_time: dayjs(this.dateList[this.dateList.length - 1][6].date).unix(),
      });
      let resultData = {};
      if (res.code === 1000) {
        bus.$emit('init-project-status', [res.data, id]);
        if (!res.data.length) {
          return false;
        }
        let taskData = {};
        if (id) {
          taskData = {
            project_id: id,
            begin_time: dayjs(this.dateList[0][0].date).unix(),
            end_time: dayjs(
              this.dateList[this.dateList.length - 1][6].date
            ).unix(),
          };
        } else {
          taskData = {
            begin_time: dayjs(this.dateList[0][0].date).unix(),
            end_time: dayjs(
              this.dateList[this.dateList.length - 1][6].date
            ).unix(),
          };
        }
        let result = await manageSearchTask(taskData);
        if (result.code === 1000) {
          resultData = result.data;
        }
      }
      // console.log(resultData);
      for (let m in this.dateList) {
        for (let n in this.dateList[m]) {
          let data = resultData[this.dateList[m][n].date];
          if (data) {
            for (let p in data) {
              data[p].list = data[p].list.map((item) => ({
                ...item,
                time: `${dayjs
                  .unix(item.begin_time)
                  .format('HH:mm')}~${dayjs
                  .unix(item.end_time)
                  .format('HH:mm')}`,
                startStamp: Number(item.begin_time),
                endStamp: Number(item.end_time),
                state:
                  dayjs.unix(item.begin_time).format('YYYY-MM-DD') <
                    dayjs().format('YYYY-MM-DD') && item.state == 1
                    ? 3
                    : item.state,
              }));
            }
            this.dateList[m][n].list = data;
          } else {
            this.dateList[m][n].list = [];
          }
        }
      }
      console.log('!!!', this.dateList);
      // }
    },
    // 切换上一月份日期
    preMonth() {
      this.date = dayjs
        .unix(dayjs(this.date.slice(0, 7)).unix() - 86400 * 2)
        .format('YYYY-MM-DD');
      if (dayjs(this.date).format('YYYY-MM') === dayjs().format('YYYY-MM')) {
        this.date = dayjs().format('YYYY-MM-DD');
      }
      this.initDate(this.date);
    },
    // 切换下一月份日期
    nextMonth() {
      this.date = dayjs
        .unix(dayjs(this.date.slice(0, 7)).unix() + 86400 * 32)
        .format('YYYY-MM-DD');
      if (dayjs(this.date).format('YYYY-MM') === dayjs().format('YYYY-MM')) {
        this.date = dayjs().format('YYYY-MM-DD');
      }
      this.initDate(this.date);
    },
    toggleDetail(data, date) {
      console.log(data, date);
      this.detailDate = date;
      this.detailData = data;
    },
    handleClose() {
      this.drawer = false;
    },
    async togglePass(data) {
      console.log('!!!', data);
      let passData = {};
      if (data.state === 3) {
        passData = {
          id: data.id,
          check: 3,
          state: 4,
        };
      } else {
        passData = {
          id: data.id,
          check: 3,
          state: 2,
        };
      }
      let res = await checkTask(passData);
      if (res.code === 1000) {
        this.$message({
          message: '提交成功！！！',
          type: 'success',
        });
        this.drawer = false;
        this.initDate();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.calendar-content {
  padding-top: 10px;
  height: 100%;
  .calendar-header {
    display: flex;
    justify-content: center;
    h3 {
      margin: 0 40px;
    }
    i {
      width: 25px;
      height: 25px;
      text-align: center;
      border: 2px solid rgba(125, 125, 125, 0.3);
      border-radius: 50%;
      font-size: 16px;
      line-height: 25px;
    }
    i:hover {
      cursor: pointer;
      background-color: rgba(125, 125, 125, 0.2);
    }
  }
  .content {
    margin-top: 10px;
    height: 100%;
    .week {
      display: flex;
      border: 1px solid #dfe4e6;
      border-top: 0px;
      border-bottom: 0px;
      margin: 0 10px;
      div {
        flex: 1;
        border: 1px solid #dfe4e6;
        text-align: center;
        padding: 5px 0;
      }
    }
    .day {
      display: flex;
      border: 1px solid #dfe4e6;
      border-top: 0px;
      margin: 0 10px;
      .day-item {
        flex: 1;
        border: 1px solid #dfe4e6;
        border-top: 0px;
        border-bottom: 0px;
        text-align: left;
        padding: 5px 0;
        width: 145px;
        height: 145px;
        h4 {
          margin-left: 10px;
        }
      }
      .single-day {
        background-color: #e5f1fe;
      }
      .day-item:hover {
        border: 1px solid #65b2fc;
      }
      .task {
        height: 80%;
        overflow: scroll;
        .item-task {
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 13px;
        }
        .item-task:hover {
          background-color: rgba(125, 125, 125, 0.2);
        }
      }
    }
    .drawer {
      .block {
      }
    }
  }
}
.now-day {
  width: 25px;
  height: 25px;
  text-align: center;
  padding: 1px 3px;
  border-radius: 50%;
  background-color: #0080fa;
  color: white;
}
.no-now-month {
  color: #cdd0d2;
}
</style>
<style>
.calendar-content .el-drawer__header {
  margin: 0;
}
.el-drawer {
  height: 100%;
  overflow: scroll;
}
</style>

