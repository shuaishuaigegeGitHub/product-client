<template>
  <div class="task-approve">
    <el-dialog
      title="任务总览"
      :visible.sync="isShow"
      width="55%"
      :before-close="handleClose"
    >
      <div class="header-info">
        <div class="select-person">
          <p>人员列表：</p>
          <el-select v-model="value" placeholder="请选择">
            <el-option-group
              v-for="group in personList"
              :key="group.groupName"
              :label="group.groupName"
            >
              <el-option
                v-for="item in group.options"
                :key="item.user_id"
                :label="item.user_name"
                :value="item.user_id"
              ></el-option>
            </el-option-group>
          </el-select>
        </div>
        <div class="status-show">
          <el-tag type="warning" class="tag"
            >待审：{{ baseData.allCount }}</el-tag
          >
          <el-tag type="success" class="tag"
            >已审：{{ baseData.approveCount }}</el-tag
          >
          <el-tag class="tag" style="margin-right: 40px"
            >总计：{{ baseData.noApproveCount }}</el-tag
          >
          <el-button type="primary" @click="allApprove">一键审批</el-button>
        </div>
      </div>
      <el-timeline>
        <el-timeline-item
          :timestamp="item.date"
          placement="top"
          v-for="(item, index) in periodList"
          :key="index"
        >
          <el-card>
            <div class="card-item" v-for="(itm, ind) in item.list" :key="ind">
              <h4 style="flex-shrink: 0; flex: 2">{{ itm.time }}：</h4>
              <p style="flex: 14">{{ itm.task }}</p>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>
<script>
import { deepClone } from '../../utils/tools';
import { bulkVerify } from '../../api/projectApproval';
import { findTask } from '../../api/task';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
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
      personList: [
        {
          id: 1,
          groupName: '主程',
          options: [
            {
              id: 1,
              name: '曾煜',
              status: false,
            },
          ],
        },
        {
          id: 2,
          groupName: '程序',
          options: [
            {
              id: 1,
              name: '曾煜',
              status: false,
            },
            {
              id: 2,
              name: '林龙方',
              status: false,
            },
            {
              id: 3,
              name: '严若鹏',
              status: false,
            },
            {
              id: 4,
              name: '甘代诗',
              status: false,
            },
          ],
        },
        {
          id: 3,
          groupName: '美术',
          options: [
            {
              id: 5,
              name: '刘巧清',
              status: false,
            },
            {
              id: 6,
              name: '李丽珠',
              status: false,
            },
            {
              id: 7,
              name: '邓静雯',
              status: false,
            },
            {
              id: 8,
              name: '马晨',
              status: false,
            },
          ],
        },
        {
          id: 4,
          groupName: '策划',
          options: [
            {
              id: 9,
              name: '洪剑达',
              status: false,
            },
            {
              id: 10,
              name: '黄路祺',
              status: false,
            },
            {
              id: 11,
              name: '林嘉敏',
              status: false,
            },
            {
              id: 12,
              name: '林灵',
              status: false,
            },
          ],
        },
        {
          id: 5,
          groupName: '运营',
          options: [
            {
              id: 13,
              name: '郑为满',
              status: false,
            },
            {
              id: 14,
              name: '范楚婷',
              status: false,
            },
            {
              id: 15,
              name: '陈文楷',
              status: false,
            },
            {
              id: 16,
              name: '郑宇航',
              status: false,
            },
            {
              id: 17,
              name: '杨少杰',
              status: false,
            },
          ],
        },
      ],
      value: '',
      baseData: {
        allCount: 0,
        approveCount: 0,
        noApproveCount: 0,
      },
      productId: 0,
    };
  },
  watch: {
    async value(val) {
      this.periodList = [];
      console.log(val, this.productId);
      let res = await findTask({
        project_id: this.productId,
        task_user_id: val,
      });
      if (res.code === 1000) {
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
      }
    },
  },
  created() {},
  mounted() {
    bus.$on('all-task-approve', (data) => {
      this.isShow = true;
      this.personList[0].options = [
        {
          user_id: data.main_course,
          user_name: data.main_course_name,
          status: false,
        },
      ];
      this.personList[1].options = data.codePerson;
      this.personList[2].options = data.artPerson;
      this.personList[3].options = data.planPerson;
      this.personList[4].options = data.operatePerson;
      this.productId = data.id;
    });
  },
  methods: {
    //   关闭任务总览弹出框
    handleClose() {
      this.isShow = false;
    },
    // 一键审核
    allApprove() {
      console.log(this.productId);
      this.$confirm('此操作将正式启动该项目，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let res = await bulkVerify({ ids: this.productId });
          if (res.code === 1000) {
            this.$message({
              type: 'success',
              message: res.msg,
            });
            this.isShow = false;
            bus.$emit('init-person-list');
          }
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.task-approve {
  .header-info {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .select-person {
      display: flex;
      align-items: center;
    }
    .status-show {
      margin-right: 10px;
      .tag {
        margin: 0 10px;
      }
    }
  }
  .card-item {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    padding-bottom: 6px;
    border-bottom: 1px solid #f1f1f1;
  }
}
</style>

