<template>
  <div class="task-time">
    <el-dialog title="任务列表" :visible.sync="isShow" width="50%" :before-close="handleClose">
      <el-button type="primary" class="add-task" @click="addTask">添加任务</el-button>
      <el-timeline>
        <el-timeline-item
          :timestamp="item.date"
          placement="top"
          v-for="(item,index) in periodList"
          :key="index"
        >
          <el-card>
            <div class="card-item" v-for="(itm,ind) in item.list" :key="ind">
              <h4 style="flex-shrink:0;flex:2">{{itm.time}}：</h4>
              <p style="flex:14;">{{itm.task}}</p>
              <p style="flex-shrink:0;padding-left:5px;flex:1;">
                <i class="el-icon-edit" style="margin-right:7px;" @click="editItemTask(index,ind)"></i>
                <i
                  class="el-icon-circle-close"
                  style="font-size:15px;"
                  @click="delItemTask(index,ind)"
                ></i>
              </p>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
    <el-dialog
      :title="TITLE"
      :visible.sync="taskShow"
      width="30%"
      :before-close="handleTaskClose"
      top="27vh"
    >
      <el-form ref="form" :model="taskForm" label-width="80px">
        <el-form-item label="任务时间">
          <el-date-picker
            v-model="taskForm.transferData"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="任务内容">
          <el-input type="textarea" :rows="5" v-model="taskForm.taskContent"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right;margin-top:15px;">
          <el-button type="primary" @click="onSubmit">创建</el-button>
          <el-button @click="handleTaskClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { deepClone } from '../../utils/tools';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
import { format, number } from 'echarts/lib/export';
import { findTask, addTask, updateTask, delTask } from '../../api/task';
export default {
  data() {
    return {
      isShow: false,
      periodList: [
        // {
        //   date: '2020.09.01',
        //   list: [
        //     {
        //       time: '09:00~10:00',
        //       task:
        //         '雨，出其不意的到来。让所有的行人措手不及。雨滴噼里啪啦的打在窗户的玻璃上，然后又迅速的散开。犹如一个生命，在来不及惋惜的时候就离开。那些还呆在房子外面的人，全都撑起了伞。红的，蓝的，浅紫色的，还有透明的。一个个的在雨里来回的走动。水汽迅速的升腾起来，远景开始变得模糊起来。桌子上的咖啡却给人一种安详感。',
        //       startStamp: 1598922000,
        //       endStamp: 1598925600,
        //     },
        //     {
        //       time: '10:00~11:00',
        //       task:
        //         '淡泊人生的境界：宠辱不惊，闲看庭前花开花落；去留无意，漫随天外云卷云舒。',
        //       startStamp: 1598925600,
        //       endStamp: 1598929200,
        //     },
        //     {
        //       time: '11:00~12:00',
        //       task:
        //         '人生就是一场无知的奔忙，为名来，为利往，总会留下颠沛流离的伤，希望用今天的阳光，去灼烧那腐烂的梦想。淡泊人生，放下烦恼，还自己一个清白来清白去，自由自在无挂碍。',
        //       startStamp: 1598929200,
        //       endStamp: 1598932800,
        //     },
        //   ],
        // },
        // {
        //   date: '2020.09.02',
        //   list: [
        //     {
        //       time: '14:00~15:30',
        //       task:
        //         '在起起伏伏的生活点滴里静思，在人生风风浪浪前行中感悟。用心感受生活，热爱生活，让阳光心情随行，让简单生活常伴，淡泊人生，享受宁静，感受生命的真实与厚重。',
        //       startStamp: 1599026400,
        //       endStamp: 1599031800,
        //     },
        //     {
        //       time: '16:00~17:00',
        //       task:
        //         '白雪阳春知音人，半世浮沉芳菲尽。淡泊人生雅然对，一瓢浊酒慰风尘。',
        //       startStamp: 1599033600,
        //       endStamp: 1599037200,
        //     },
        //     {
        //       time: '20:00~21:00',
        //       task:
        //         '山光悦鸟性，潭影空人心，诗意水墨，淡泊人生，洒脱飘逸，追随悠悠古琴声的纷繁中找寻心灵的净土。追随古琴声，飘渺闲云中。',
        //       startStamp: 1599048000,
        //       endStamp: 1599051600,
        //     },
        //   ],
        // },
        // {
        //   date: '2020.09.03',
        //   list: [
        //     {
        //       time: '10:00~12:30',
        //       task:
        //         '黄叶飘零化作尘，本来非妄亦非真。有情故宅含秋色，无名君子湛然身。岁月轮回，本来非色非空；故宅秋韵，本来亦真亦幻；淡泊人生，本来无喜无忧。',
        //       startStamp: 1599098400,
        //       endStamp: 1599107400,
        //     },
        //     {
        //       time: '14:00~17:00',
        //       task:
        //         '窗下沉思细品茶，檐前夺目一枝花。几经风雨心不悔，淡泊人生境最佳。',
        //       startStamp: 1599112800,
        //       endStamp: 1599123600,
        //     },
        //     {
        //       time: '20:00~21:00',
        //       task:
        //         '人生，的确是一本翻不完的书，而且这本书，时刻都在更新。用真情书写，那就是一本有情有义的故事书。我们，既要有尊严的生活，也要幸福快乐地生活。珍惜当下，珍惜情意，让我们淡泊人生，宁静心怀。',
        //       startStamp: 1599134400,
        //       endStamp: 1599138000,
        //     },
        //   ],
        // },
      ],
      taskForm: {
        transferData: [],
        startTime: 0,
        endTime: 0,
        taskContent: '',
      },
      TITLE: '新增任务',
      taskShow: false,
      productData: [],
      userId: 0,
    };
  },
  created() {},
  mounted() {
    bus.$on('edit-task', async (data) => {
      this.isShow = true;
      this.productData = data;
      this.userId = this.$store.state.user.user.uid;
      this.initData();
    });
  },
  methods: {
    async initData() {
      this.periodList = [];
      let res = await findTask({
        project_id: this.productData.id,
        task_user_id: this.userId,
      });
      if (res.code === 1000) {
        let data = deepClone(res.data).sort(
          (a, b) => Number(a.begin_time) - Number(b.begin_time)
        );
        let newSet = new Set(
          deepClone(data).map((item) =>
            dayjs(Number(item.begin_time) * 1000).format('YYYY.MM.DD')
          )
        );
        let dateArr = [...newSet];
        for (let i in dateArr) {
          this.periodList.push({
            date: dateArr[i],
            list: [],
          });
          let tasks = data.filter(
            (item) =>
              dayjs(Number(item.begin_time) * 1000).format('YYYY.MM.DD') ===
              dateArr[i]
          );
          for (let j in tasks) {
            this.periodList[i].list.push({
              id: tasks[j].id,
              time: `${dayjs(Number(tasks[j].begin_time) * 1000).format(
                'HH:mm'
              )}~${dayjs(tasks[j].end_time * 1000).format('HH:mm')}`,
              task: tasks[j].task_detail,
              startStamp: dayjs(Number(tasks[j].begin_time) * 1000).unix(),
              endStamp: dayjs(Number(tasks[j].end_time) * 1000).unix(),
            });
          }
        }
      }
    },
    //   关闭任务排期弹出框
    handleClose() {
      this.isShow = false;
    },
    // 新增任务
    addTask() {
      this.taskForm = {
        id: 0,
        transferData: [],
        startTime: 0,
        endTime: 0,
        taskContent: '',
      };
      this.TITLE = '新增任务';
      this.taskShow = true;
    },
    // 编辑子任务
    editItemTask(firstIndex, secondIndex) {
      this.taskForm = {
        id: this.periodList[firstIndex].list[secondIndex].id,
        transferData: [
          Number(this.periodList[firstIndex].list[secondIndex].startStamp) *
            1000,
          Number(this.periodList[firstIndex].list[secondIndex].endStamp) * 1000,
        ],
        startTime: 0,
        endTime: 0,
        taskContent: this.periodList[firstIndex].list[secondIndex].task,
      };
      this.TITLE = '编辑任务';
      this.taskShow = true;
    },
    // 删除子任务
    delItemTask(firstIndex, secondIndex) {
      this.$confirm('是否删除该条任务', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // this.periodList[firstIndex].list.splice(secondIndex, 1);
          // if (!this.periodList[firstIndex].list.length) {
          //   this.periodList.splice(firstIndex, 1);
          // }
          // 任务删除
          let res = await delTask({
            id: this.periodList[firstIndex].list[secondIndex].id,
          });
          if (res.code === 1000) {
            this.$message({
              message: res.msg,
              type: 'success',
            });
            this.initData();
          }
        })
        .catch(() => {});
    },
    // 展示子任务编辑框
    handleTaskClose() {
      this.taskShow = false;
    },
    // 创建子任务
    async onSubmit() {
      // 判定是否存在起止时间
      if (this.taskForm.transferData.length < 2) {
        this.$message.warning('请保证任务起止时间的完整性！！！');
        return;
      }
      //   判断是否创建的任务在一天之内
      if (
        dayjs(this.taskForm.transferData[1]).format('YYYY-MM-DD') !==
        dayjs(this.taskForm.transferData[0]).format('YYYY-MM-DD')
      ) {
        this.$message.warning('请保证任务的创建在一天之内！！！');
        return;
      }
      //   判断任务内容是否填写
      if (!this.taskForm.taskContent) {
        this.$message.warning('您的任务内容还未填写，请仔细填写！！！');
        return;
      }
      //   查询任务列表是否存在当天的任务面板
      let itemIndex = this.periodList.findIndex(
        (item) =>
          item.date ===
          dayjs(this.taskForm.transferData[1]).format('YYYY.MM.DD')
      );
      if (itemIndex >= 0) {
        //   判断是否存在交叉的时间段
        let outItem = this.periodList[itemIndex].list.filter(
          (item) =>
            (dayjs(this.taskForm.transferData[0]).unix() / 60 >=
              Number(item.startStamp) / 60 &&
              dayjs(this.taskForm.transferData[0]).unix() / 60 <
                Number(item.endStamp) / 60) ||
            (dayjs(this.taskForm.transferData[0]).unix() / 60 <=
              Number(item.startStamp) / 60 &&
              dayjs(this.taskForm.transferData[1]).unix() / 60 >
                Number(item.startStamp) / 60) ||
            (dayjs(this.taskForm.transferData[0]).unix() ==
              Number(item.startStamp) &&
              dayjs(this.taskForm.transferData[1]).unix() ==
                Number(item.endStamp))
        );
        if (outItem.length) {
          if (
            outItem.filter(
              (item) =>
                dayjs(this.taskForm.transferData[0]).unix() / 60 ==
                  Number(item.startStamp) / 60 &&
                dayjs(this.taskForm.transferData[1]).unix() / 60 ==
                  Number(item.endStamp) / 60
            ).length &&
            this.TITLE === '编辑任务'
          ) {
            // 任务更新
            console.log(this.taskForm.taskContent);
            let res = await updateTask({
              id: this.taskForm.id,
              task_detail: this.taskForm.taskContent,
              begin_time: dayjs(this.taskForm.transferData[0]).unix(),
              end_time: dayjs(this.taskForm.transferData[1]).unix(),
            });
            if (res.code === 1000) {
              this.$message({
                message: res.msg,
                type: 'success',
              });
            }
            this.taskShow = false;
            this.initData();
            return;
          } else {
            this.$message.warning(
              '您的任务时间与当前其他时间段时间冲突了，请核对！！！'
            );
            return;
          }
        }
        // 插入数据
        // this.periodList[itemIndex].list.push({
        //   time: `${dayjs(this.taskForm.transferData[0]).format(
        //     'HH:mm'
        //   )}~${dayjs(this.taskForm.transferData[1]).format('HH:mm')}`,
        //   task: this.taskForm.taskContent,
        //   startStamp: dayjs(this.taskForm.transferData[0]).unix(),
        //   endStamp: dayjs(this.taskForm.transferData[1]).unix(),
        // });
        // this.periodList[itemIndex].list.sort((a, b) => a.endStamp - b.endStamp);
      } else {
        //   如果任务列表不存在当天的任务面板，直接新增日任务面板，并做数据插入
        // this.periodList.push({
        //   date: dayjs(this.taskForm.transferData[0]).format('YYYY.MM.DD'),
        //   list: [
        //     {
        //       time: `${dayjs(this.taskForm.transferData[0]).format(
        //         'HH:mm'
        //       )}~${dayjs(this.taskForm.transferData[1]).format('HH:mm')}`,
        //       task: this.taskForm.taskContent,
        //       startStamp: dayjs(this.taskForm.transferData[0]).unix(),
        //       endStamp: dayjs(this.taskForm.transferData[1]).unix(),
        //     },
        //   ],
        // });
        // this.periodList.sort(
        //   (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
        // );
      }
      // 任务上传
      let res = await addTask({
        project_id: this.productData.id,
        task_user_id: this.userId,
        task_detail: this.taskForm.taskContent,
        begin_time: dayjs(this.taskForm.transferData[0]).unix(),
        end_time: dayjs(this.taskForm.transferData[1]).unix(),
      });
      if (res.code === 1000) {
        this.$message({
          message: res.msg,
          type: 'success',
        });
      }
      this.taskShow = false;
      this.initData();
    },
  },
};
</script>
<style lang="scss" scoped>
.task-time {
  .add-task {
    margin-left: 89%;
    margin-bottom: 10px;
  }
  .card-item {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    padding-bottom: 6px;
    border-bottom: 1px solid #f1f1f1;
    .el-icon-edit,
    .el-icon-circle-close {
      color: rgba(139, 134, 130, 0.9);
    }
    .el-icon-edit:hover {
      cursor: pointer;
      color: #3895fb;
    }
    .el-icon-circle-close:hover {
      cursor: pointer;
      color: #d7151a;
    }
  }
}
</style>

