<template>
  <!-- 任务列表详情 -->
  <div>
    <!-- 添加修改dialog -->
    <el-dialog
      center
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      @open="openDialog"
    >
      <el-form>
        <el-form-item label="文件">
          <el-upload
            class="file-uploader"
            :action="uploadFileUrl"
            :headers="token"
            :on-success="onSuccess"
            :on-remove="onRemove"
            :file-list="fileList"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">文件不超过20m</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark" maxlength="500"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="buttomRow">
        <el-button size="mini" type="primary" @click="save">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import { saveFile } from '../../api/file';
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
    projectId: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 详情参数
      form: {
        project_id: this.projectId,
        remark: '',
        fileList: []
      },
      fileList: [],
      uploadFileUrl: config.baseUrl + '/upload/file',
      token: { token: getToken() },
      fileUid: null
    };
  },
  methods: {
    // ---------------------文件上传开始
    // 文件上传之前
    beforeUpload(file) {
      //   文件最大限制20m
      let maxSize = 1024 * 1024 * 20;
      if (file.size > maxSize) {
        this.$message.warning('文件过大');
        return false;
      }
      this.fileUid = file.uid;
    },
    // 上传文件成功
    onSuccess(file, fileList) {
      if (file.code == 1000) {
        file.data.id = this.fileUid;
        this.form.fileList.push(file.data);
      }
      this.fileUid = null;
    },
    //文件删除时
    onRemove(file, fileList) {
      this.form.fileList.forEach((item, i) => {
        if (item.id == file.uid) {
          this.form.fileList.splice(i, 1);
          return;
        }
      });
    },

    // -------------------文件上传结束
    //   弹窗打开
    openDialog() {
      console.log('this.form.project_id', this.form.project_id);
    },

    // 保存
    async save() {
      if (this.form.fileList < 1) {
        return this.$message.warning('最少需要一个文件');
      }
      let result = await saveFile(this.form);
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.handleClose();
    },
    //弹窗关闭
    handleClose() {
      this.form = {
        remark: '',
        fileList: []
      };

      (this.fileList = []), this.$emit('handleClose');
    }
  },
  mounted() {}
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