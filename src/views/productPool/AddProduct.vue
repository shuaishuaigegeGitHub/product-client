<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
    @open="open"
  >
    <el-form ref="form" :model="form" label-width="140px">
      <el-form-item label="logo" class="logo">
        <el-upload
          class="avatar-uploader"
          :action="uploadFileUrl"
          :show-file-list="false"
          :headers="token"
          :on-success="logoSuccess"
          :before-upload="beforeLogorUpload"
        >
          <img style="width:360px" v-if="form.logo.path" :src="form.logo.path" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品名称">
        <el-input v-model="form.product_name"></el-input>
      </el-form-item>
      <el-form-item label="产品池">
        <el-select v-model="form.pool_id" placeholder="请选择产品池">
          <el-option v-for="(item,i) of pools" :key="i" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优先级">
        <el-select v-model="form.priority" placeholder="请选择优先级">
          <el-option v-for="(item,i) of prioritys" :key="i" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提供者">
        <el-select v-model="form.provide_id" placeholder="请选择提供者">
          <el-option
            v-for="(item,i) of users"
            :key="i"
            :label="item.username"
            :value="item.user_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select v-model="form.project_type" placeholder="请选择项目类型">
          <el-option v-for="(item,i) of project_types" :key="i" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="技术选型">
        <el-select v-model="form.technology_type" placeholder="请选择技术选型">
          <el-option
            v-for="(item,i) of technology_types"
            :key="i"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权重分布">
        <el-input v-model="form.weight"></el-input>
      </el-form-item>
      <el-form-item label="立项来源">
        <el-select v-model="form.source" placeholder="请选择立项来源">
          <el-option v-for="(item,i) of sources" :key="i" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="游戏题材">
        <el-select v-model="form.theme" placeholder="请选择游戏题材">
          <el-option v-for="(item,i) of themes" :key="i" :label="item.theme" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="首发平台">
        <el-select v-model="form.starting" placeholder="请选择首发平台">
          <el-option v-for="(item,i) of startings" :key="i" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="录入者">
        <el-input v-model="form.person"></el-input>
      </el-form-item>
      <el-form-item label="立项理由">
        <el-input v-model="form.reason"></el-input>
      </el-form-item>
      <el-form-item label="创新点简介">
        <el-input v-model="form.innovate_synopsis"></el-input>
      </el-form-item>
      <el-form-item label="创新目地">
        <el-input v-model="form.innovate_target"></el-input>
      </el-form-item>
      <el-form-item label="原著名称">
        <el-input v-model="form.original_name"></el-input>
      </el-form-item>
      <el-form-item label="厂家名称">
        <el-input v-model="form.manufacturer_name"></el-input>
      </el-form-item>
      <el-form-item label="游戏主页连接">
        <el-input v-model="form.game_connection"></el-input>
      </el-form-item>
      <el-form-item label="产品成就描述">
        <el-input v-model="form.achievement_description"></el-input>
      </el-form-item>
      <el-form-item label="游戏描述">
        <el-input v-model="form.game_description"></el-input>
      </el-form-item>
      <el-form-item label="用户群体">
        <el-input v-model="form.user_group"></el-input>
      </el-form-item>
      <el-form-item label="玩法题材">
        <el-input v-model="form.play_theme"></el-input>
      </el-form-item>
      <el-form-item label="游戏难度">
        <el-input v-model="form.game_difficulty"></el-input>
      </el-form-item>
      <el-form-item label="游戏类型">
        <el-input v-model="form.game_type"></el-input>
      </el-form-item>
      <el-form-item label="趣味性">
        <el-input v-model="form.interest"></el-input>
      </el-form-item>
      <el-form-item label="付费点设计">
        <el-input v-model="form.point_design"></el-input>
      </el-form-item>
      <el-form-item label="原款产品发行时间">
        <el-input v-model="form.original_time"></el-input>
      </el-form-item>
      <el-form-item label="原款游戏备注">
        <el-input v-model="form.original_remark"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option v-for="(item,i) of statuss" :key="i" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二维码">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option v-for="(item,i) of statuss" :key="i" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" type="primary">保存</el-button>
      <el-button @click="handleClose">返 回</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  poolSearch,
  themeSearch,
  productSave,
  productUpdate
} from '../../api/productPool';
import { queryUser } from '../../api/user';
import { getToken } from '@/utils/auth';
import config from '@/config';
import { fileList } from '../../api/file';
export default {
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
      default: () => {}
    }
  },
  data() {
    return {
      uploadFileUrl: config.baseUrl + '/upload/file',
      token: { token: getToken() },
      form: {
        logo: {},
        fileList: []
      },
      pools: [],
      prioritys: [
        {
          id: 1,
          name: '重大'
        },
        {
          id: 2,
          name: '核心'
        },
        {
          id: 3,
          name: '一般'
        }
      ],
      project_types: [
        {
          id: 1,
          name: '超轻度'
        },
        {
          id: 2,
          name: '轻度游戏'
        },
        {
          id: 3,
          name: '中度游戏'
        },
        {
          id: 4,
          name: '重度游戏'
        }
      ],
      technology_types: [
        {
          id: 1,
          name: '3D竖屏'
        },
        {
          id: 2,
          name: '3D横屏'
        },
        {
          id: 3,
          name: '2D竖屏'
        },
        {
          id: 4,
          name: '2D横屏'
        }
      ],
      sources: [
        {
          id: 1,
          name: '直接立项'
        },
        {
          id: 2,
          name: '微创新'
        },
        {
          id: 3,
          name: '选品会'
        },
        {
          id: 4,
          name: '自主设计'
        }
      ],
      startings: [
        {
          id: 1,
          name: '微信'
        },
        {
          id: 2,
          name: '字节'
        },
        {
          id: 3,
          name: 'OPPO'
        },
        {
          id: 4,
          name: 'APP渠道'
        },
        {
          id: 5,
          name: 'vivo'
        }
      ],
      statuss: [
        {
          id: 1,
          name: '未立项'
        },
        {
          id: 2,
          name: '已启动'
        },
        {
          id: 3,
          name: '已完成'
        }
      ],
      users: [],
      themes: []
    };
  },
  mounted() {
    this.queryUser();
    this.themeSearch();
  },
  methods: {
    logoSuccess(result) {
      if (result.code != 1000) return this.$message.error(result.msg);
      let file = result.data;
      this.form.logo = {
        type: 1,
        name: file.origin_name,
        path: file.url,
        size: file.size
      };
      console.log(this.form.logo);
    },
    beforeLogorUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //  保存产品数据
    async productSave() {
      let result = await productSave();
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.form.id = result.id;
    },
    //  更新产品数据
    async productUpdate() {
      let result = await productUpdate();
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
    },
    saveClick() {
      if (this.form.provide_id) {
        let user = this.users.find(i => i.user_id == this.form.provide_id);
        if (user) {
          this.form.provide_name = user.username;
        }
      }
      if (this.form.id) {
        this.productUpdate();
      } else {
        this.productSave();
      }
    },
    async themeSearch() {
      let result = await themeSearch();
      if (result.code != 1000) return this.$message.error(result.msg);
      this.themes = result.data;
    },
    async queryUser() {
      let result = await queryUser();
      if (result.code != 1000) return this.$message.error(result.msg);
      this.users = result.data;
    },
    //   查询产品池
    async poolSearch() {
      let result = await poolSearch();
      if (result.code != 1000) return this.$message.error(result.msg);
      this.pools = result.data;
    },
    //   弹窗打开
    open() {
      this.poolSearch();
    },
    //   弹窗关闭
    handleClose() {
      this.form = { logo: {}, fileList: [] };
      this.$emit('handleClose');
    }
  }
};
</script>
<style lang="scss" scoped>
</style>