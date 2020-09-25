<template>
  <div class="milestone">
    <el-dialog title="里程碑设定" :visible.sync="isShow" width="55%" :before-close="handleClose">
      <el-timeline>
        <el-timeline-item
          :timestamp="item.title"
          v-for="(item,index) in milestone"
          :key="index"
          placement="top"
        >
          <el-card>
            <div style="display:flex;">
              <div>
                <span class="demonstration">人员配置：</span>
                <el-select v-model="item.person" clearable multiple placeholder="请选择">
                  <el-option-group>
                    <el-option
                      v-for="(itm,ind) in personList"
                      :key="ind"
                      :label="itm.username"
                      :value="itm.user_id"
                    ></el-option>
                  </el-option-group>
                </el-select>
              </div>
              <div style="margin-left:20px;">
                <span class="demonstration">配置时间：</span>
                <el-date-picker v-model="item.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submitMilestone">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { deepClone } from '../../utils/tools';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
import { saveMileage } from '../../api/projectApproval';
export default {
  data() {
    return {
      isShow: false,
      milestone: [
        {
          title: '文档完成日期',
          time: '',
          person: []
        },
        {
          title: '启动日期',
          time: '',
          person: []
        },
        {
          title: '美术介入',
          time: '',
          person: []
        },
        {
          title: '程序介入',
          time: '',
          person: []
        },
        {
          title: '美术完成',
          time: '',
          person: []
        },
        {
          title: '核心功能',
          time: '',
          person: []
        },
        {
          title: 'demo版本',
          time: '',
          person: []
        },
        {
          title: '体验版本',
          time: '',
          person: []
        },
        {
          title: '移交运营',
          time: '',
          person: []
        },
        {
          title: '响应天数',
          time: '',
          person: []
        }
      ],
      personList: [],
      value: '',
      productId: 1
    };
  },
  watch: {},
  created() {},
  mounted() {
    bus.$on('milestone', async data => {
      this.isShow = true;
      this.personList = deepClone(data);
    });
  },
  methods: {
    //   关闭任务总览弹出框
    handleClose() {
      this.isShow = false;
    },
    async submitMilestone() {
      // console.log(this.milestone);
      let userData = [];
      this.milestone.forEach((item, i) => {
        userData.push({
          users: item.person,
          time: item.time,
          type: i + 1
        });
      });
      let result = await saveMileage({
        product_id: this.productId,
        userData: userData
      });
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.handleClose();
    }
  }
};
</script>
<style lang="scss" scoped>
.milestone {
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

