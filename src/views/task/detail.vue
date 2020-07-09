<template>
  <!-- 任务列表详情 -->
  <div>
    <!-- 添加修改dialog -->
    <el-dialog
      center
      :title="title"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      @open="openDialog"
    >
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="project_name">
              <el-input v-model="form.project_name" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建人" prop="task_username">
              <el-input v-model="form.task_username" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人" prop="manage_id">
              <el-select
                v-model="form.manage_id"
                placeholder="请选择"
                :disabled="!(user.uid==form.task_user_id&&form.check<3||title=='增加')"
              >
                <el-option
                  v-for="item in projectMember"
                  :key="item.user_id"
                  :label="item.username"
                  :value="item.user_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="验收人" prop="acceptor_id">
              <el-select
                v-model="form.acceptor_id"
                placeholder="请选择"
                :disabled="!(user.uid==form.task_user_id&&form.check<3||title=='增加')"
              >
                <el-option
                  v-for="item in projectMember"
                  :key="item.user_id"
                  :label="item.username"
                  :value="item.user_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务类型" prop="task_type">
              <el-select
                v-model="form.task_type"
                placeholder="请选择"
                @change="typeChange"
                :disabled="!(user.uid==form.task_user_id&&form.check<3||title=='增加')"
              >
                <el-option
                  v-for="item in taskTypeOpen"
                  :key="item.id"
                  :label="item.type_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务模块" prop="module_id">
              <el-select
                v-model="form.module_id"
                placeholder="请选择"
                :disabled="!(user.uid==form.task_user_id&&form.check<3||title=='增加')"
              >
                <el-option
                  v-for="item in taskModuleOpen"
                  :key="item.id"
                  :label="item.module_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="完成状态" prop="state">
              <el-select
                v-model="form.state"
                placeholder="请选择"
                :disabled="!(user.uid==form.task_user_id&&form.check<3||title=='增加')"
              >
                <el-option
                  v-for="item in taskStateOpen"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预估开始时间" prop="predict_start_time">
              <el-date-picker
                v-model="form.predict_start_time"
                :disabled="!(user.uid==form.task_user_id&&form.check<3||title=='增加')"
                type="datetime"
                placeholder="选择日期时间"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="预估结束时间" prop="predict_end_time">
              <el-date-picker
                v-model="form.predict_end_time"
                :disabled="!(user.uid==form.task_user_id&&form.check<3||title=='增加')"
                type="datetime"
                placeholder="选择日期时间"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际开始时间" prop>
              <el-date-picker
                v-model="form.reality_start_time"
                :disabled="!(user.uid==form.task_user_id&&form.check<3||title=='增加')"
                type="datetime"
                placeholder="选择日期时间"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际结束时间" prop>
              <el-date-picker
                v-model="form.reality_end_time"
                :disabled="!(user.uid==form.task_user_id&&form.check<3||title=='增加')"
                type="datetime"
                placeholder="选择日期时间"
                value-format="timestamp"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="任务描述" prop="task_detail">
              <el-input
                v-model="form.task_detail"
                maxlength="800"
                :disabled="!(user.uid==form.task_user_id&&form.check<3||title=='增加')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="buttomRow">
        <el-button
          v-if="user.uid==form.task_user_id&&form.check<3||title=='增加'"
          size="mini"
          type="primary"
          @click="save"
        >确定</el-button>
        <el-button v-if="ifCheck()" size="mini" type="primary" @click="checkdialogVisible=true">验收</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-row>
      <!-- 验证弹窗 -->
      <el-dialog center append-to-body :visible.sync="checkdialogVisible" width="30%">
        <div>
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="验收备注">
              <el-input v-model="form.check_remark" />
            </el-form-item>
          </el-form>
          <!-- 按钮 -->
          <el-row class="buttomRow">
            <el-button size="mini" type="primary" @click="checkClick(3)">通过</el-button>
            <el-button size="mini" type="primary" @click="checkClick(2)">不通过</el-button>
          </el-row>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import {
  taskTypes,
  taskModule,
  saveTask,
  taskFile,
  updateTask,
  checkTask
} from '../../api/task';
import { searchProjectMember } from '../../api/project';
import config from '@/config';
import { getToken } from '@/utils/auth';
export default {
  name: 'detail',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '添加'
    },
    row: {
      type: Object,
      default: null
    },
    user: {
      type: Object,
      default: null
    },
    // 项目参与者
    projectMember: {
      default: null
    }
  },
  data() {
    return {
      checkdialogVisible: false,
      formRules: {
        manage_id: [
          { required: true, message: '请选择负责人', trigger: 'blur' }
        ],
        acceptor_id: [
          { required: true, message: '请选择验收人', trigger: 'blur' }
        ],
        task_type: [
          { required: true, message: '请选择任务类型', trigger: 'blur' }
        ],
        module_id: [
          { required: true, message: '请选择任务模块', trigger: 'blur' }
        ],
        task_detail: [
          { required: true, message: '请填写任务描述', trigger: 'blur' }
        ],
        task_name: [
          { required: true, message: '请填写任务名称', trigger: 'blur' }
        ],
        state: [{ required: true, message: '请选择完成状态', trigger: 'blur' }],
        predict_start_time: [
          { required: true, message: '请填写预估开始时间', trigger: 'blur' }
        ],
        predict_end_time: [
          { required: true, message: '请填写预估结束时间', trigger: 'blur' }
        ]
      },
      // 详情参数
      form: {
        project_name: '',
        task_username: '',
        task_type: '',
        module_id: '',
        task_detail: '',
        task_name: '',
        commit: 1,
        check_remark: '',
        fileList: [],
        // 验收人
        acceptor_id: '',
        acceptor_username: '',
        // 负责人
        manage_id: '',
        manage_name: '',
        // 预估开始时间
        predict_start_time: '',
        // 预估结束时间
        predict_end_time: '',
        // 实际开始时间
        reality_start_time: '',
        // 实际结束时间
        reality_end_time: ''
      },
      fileList: [],
      taskTypeOpen: [],
      taskModuleOpen: [],
      taskStateOpen: [
        { id: 1, name: '未开始' },
        { id: 2, name: '进行中' },
        { id: 3, name: '已完成' },
        { id: 4, name: '已延期' },
        { id: 5, name: '已废弃' }
      ],
      uploadFileUrl: config.baseUrl + '/upload/file',
      token: { token: getToken() },
      fileUid: null
    };
  },
  methods: {
    // 是否可以验收
    ifCheck() {
      if (this.title != '编辑') {
        return false;
      }
      if (this.form.check > 2) {
        return false;
      }
      if (this.form.acceptor_id == this.user.uid) {
        return true;
      }
      // let role = -1;
      // switch (this.form.task_type) {
      //   case 1:
      //     role = 5;
      //     break;
      //   case 2:
      //     role = 6;
      //     break;
      //   case 3:
      //     role = 7;
      //     break;
      //   case 4:
      //     role = 8;
      //     break;
      //   default:
      //     break;
      // }
      // if (role == -1) {
      //   return false;
      // }
      // for (let i = 0; i < this.projectMember.length; i++) {
      //   if (
      //     this.projectMember[i].partner_role == role &&
      //     this.projectMember[i].user_id == this.user.uid
      //   ) {
      //     return true;
      //   }
      // }

      return false;
    },
    // 点击验收确认通过不通过
    checkClick(check) {
      if (!this.form.check_remark)
        return this.$message.warning('请填写验收备注');
      this.form.check = check;
      this.checkTask();

      // this.$prompt('请输入验收备注', '是否验收通过', {
      //   distinguishCancelAndClose: true,
      //   confirmButtonText: '验收通过',
      //   cancelButtonText: '验收失败',
      //   type: 'warning'
      // })
      //   .then(value => {
      //     console.log('aaa', value);
      //     if (!value) {
      //       return this.$message.warning('请输入验收备注');
      //     }
      //     this.form.check = 3;
      //     this.checkTask();
      //   })
      //   .catch(action => {
      //     console.log('cccc', action);
      //     if (action == 'cancel') {
      //       this.form.check = 2;
      //       this.checkTask();
      //     }
      //   });
    },
    // 验收
    async checkTask() {
      let result = await checkTask({
        id: this.form.id,
        check: this.form.check,
        check_remark: this.form.check_remark
      });
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.checkdialogVisible = false;
      this.handleClose();
    },
    //  任务类型改变
    typeChange() {
      this.taskModuleOpen = [];
      this.form.module_id = '';
      this.taskModule();
    },
    //   任务类型
    async taskTypes() {
      let result = await taskTypes();
      if (result.code != 1000) return this.$message.error(result.msg);
      this.taskTypeOpen = result.data;
    },
    //   任务类型
    async taskModule() {
      let result = await taskModule({ task_type: this.form.task_type });
      if (result.code != 1000) return this.$message.error(result.msg);
      this.taskModuleOpen = result.data;
    },
    //   弹窗打开
    openDialog() {
      Object.assign(this.form, this.row);
      if (this.form.id) {
        this.taskModule();
      }
    },
    //更新数据
    async update() {
      let result = await updateTask(this.form);
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.handleClose();
    },
    // 效验数据
    checkData() {
      return true;
    },
    // 保存
    async save() {
      console.log('dfdfd', this.form.predict_start_time);
      this.$refs['form'].validate(async valid => {
        let manage = this.projectMember.find(
          i => i.user_id == this.form.manage_id
        );
        let acceptor = this.projectMember.find(
          i => i.user_id == this.form.acceptor_id
        );
        if (manage) this.form.manage_name = manage.username;
        if (acceptor) this.form.acceptor_username = acceptor.username;
        if (valid) {
          if (this.title === '编辑') {
            //跟新数据
            this.update();
            return;
          }
          let result = await saveTask(this.form);
          if (result.code != 1000) return this.$message.error(result.msg);
          this.$message.success(result.msg);
          this.handleClose();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 新增按钮
    addClick() {
      this.dialogVisible = true;
      this.title = '增加';
    },
    //弹窗关闭
    handleClose() {
      this.form = {
        project_name: '',
        task_username: '',
        task_type: '',
        module_id: '',
        task_detail: '',
        task_name: '',
        commit: 1,
        check_remark: '',
        fileList: [],
        // 验收人
        acceptor_id: '',
        acceptor_username: '',
        // 负责人
        manage_id: '',
        manage_name: '',
        // 预估开始时间
        predict_start_time: '',
        // 预估结束时间
        predict_end_time: '',
        // 实际开始时间
        reality_start_time: '',
        // 实际结束时间
        reality_end_time: ''
      };
      this.fileList = [];
      this.taskModuleOpen = [];
      this.$emit('handleClose');
    },
    //时间戳转换方法
    formatDate(date) {
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
    },
    // 分页变化
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.search();
    },
    // 分页变化
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.search();
    }
  },
  mounted() {
    this.taskTypes();
  }
};
</script>
<style>
.file-uploader .el-upload--text {
  width: 80px;
  height: 40px;
}
.file-uploader .el-upload--text {
  border: none;
}
.buttomRow {
  text-align: center;
}
</style>