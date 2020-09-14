<template>
  <el-dialog
    title="title"
    :visible.sync="isShowAdd"
    width="90%"
    :before-close="handleClose"
    @open="open"
    top="30px"
  >
    <el-form ref="form" :model="form" label-width="140px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="logo">
            <div class="updaeImg">
              <el-upload
                :action="uploadFileUrl"
                :show-file-list="false"
                :headers="token"
                :on-success="logoSuccess"
                :before-upload="beforeLogorUpload"
              >
                <img v-if="form.logo.path" :src="form.logo.path" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称">
            <el-input v-model="form.product_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品池">
            <el-select v-model="form.pool_id" placeholder="请选择产品池">
              <el-option v-for="(item,i) of pools" :key="i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="优先级">
            <el-select v-model="form.priority" placeholder="请选择优先级">
              <el-option v-for="(item,i) of prioritys" :key="i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目类型">
            <el-select v-model="form.project_type" placeholder="请选择项目类型">
              <el-option
                v-for="(item,i) of project_types"
                :key="i"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        </el-col>

        <el-col :span="8">
          <el-form-item label="立项来源">
            <el-select v-model="form.source" placeholder="请选择立项来源">
              <el-option v-for="(item,i) of sources" :key="i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="游戏题材">
            <el-select v-model="form.theme" placeholder="请选择游戏题材">
              <el-option v-for="(item,i) of themes" :key="i" :label="item.theme" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="首发平台">
            <el-select v-model="form.starting" placeholder="请选择首发平台">
              <el-option v-for="(item,i) of startings" :key="i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="权重分布">
            <el-input v-model="form.weight"></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="8">
          <el-form-item label="手感">
            <el-input-number v-model="weightObject.feedback" :min="1" :max="10" label="权重分布"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关卡">
            <el-input-number v-model="weightObject.lev_design" :min="1" :max="10" label="权重分布"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="美术动作">
            <el-input-number v-model="weightObject.art_action" :min="1" :max="10" label="权重分布"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="美术特效">
            <el-input-number v-model="weightObject.art_effect" :min="1" :max="10" label="权重分布"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="音效">
            <el-input-number v-model="weightObject.music" :min="1" :max="10" label="权重分布"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入者">
            <el-input v-model="form.person"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="游戏描述">
            <el-input v-model="form.game_description"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户群体">
            <el-input v-model="form.user_group"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="玩法题材">
            <el-input v-model="form.play_theme"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="游戏难度">
            <el-input v-model="form.game_difficulty"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="游戏类型">
            <el-input v-model="form.game_type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="趣味性">
            <el-input v-model="form.interest"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付费点设计">
            <el-input v-model="form.point_design"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option v-for="(item,i) of statuss" :key="i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.source==1||form.source==2">
          <el-form-item label="立项理由">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.source==2">
          <el-form-item label="创新点简介">
            <el-input v-model="form.innovate_synopsis"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.source==2">
          <el-form-item label="创新目地">
            <el-input v-model="form.innovate_target"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.source==1||form.source==2">
          <el-form-item label="原著名称">
            <el-input v-model="form.original_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.source==1||form.source==2">
          <el-form-item label="厂家名称">
            <el-input v-model="form.manufacturer_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.source==1||form.source==2">
          <el-form-item label="游戏主页连接">
            <el-input v-model="form.game_connection"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.source==1||form.source==2">
          <el-form-item label="产品成就描述">
            <el-input v-model="form.achievement_description"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.source==1||form.source==2">
          <el-form-item label="原款产品发行时间">
            <el-input v-model="form.original_time"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="form.source==1||form.source==2">
          <el-form-item label="原款游戏备注">
            <el-input v-model="form.original_remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-row>
            <el-col :span="24">
              <el-form-item label="会议记录">
                <div class="updateFile">
                  <el-upload
                    class="upload-demo"
                    :action="uploadFileUrl"
                    :headers="token"
                    :on-success="recordSuccess"
                    :on-remove="recordRemove"
                    :file-list="form.record"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="策划文案">
                <div class="updateFile">
                  <el-upload
                    class="upload-demo"
                    :action="uploadFileUrl"
                    :headers="token"
                    :on-success="fourSuccess"
                    :on-remove="fourRemove"
                    :file-list="form.four"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="游戏截图">
                <div class="updateFile">
                  <el-upload
                    class="upload-demo"
                    :action="uploadFileUrl"
                    :headers="token"
                    :on-success="fiveSuccess"
                    :on-remove="fiveRemove"
                    :file-list="form.five"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="游戏玩法视频">
                <div class="updateFile">
                  <el-upload
                    class="upload-demo"
                    :action="uploadFileUrl"
                    :headers="token"
                    :on-success="sixSuccess"
                    :on-remove="sixRemove"
                    :file-list="form.six"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" v-if="form.source==1||form.source==2">
          <el-form-item label="二维码">
            <div class="updaeImg">
              <el-upload
                class="avatar-uploader"
                :action="uploadFileUrl"
                :show-file-list="false"
                :headers="token"
                :on-success="twoSuccess"
                :before-upload="beforeLogorUpload"
              >
                <img v-if="form.two.path" :src="form.two.path" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="saveClick" type="primary">保存</el-button>
      <el-button @click="handleClose">返 回</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  poolSearch,
  themeSearch,
  productSave,
  productUpdate,
  productSearch
} from '../../api/productPool';
import { queryUser } from '../../api/user';
import { getToken } from '@/utils/auth';
import config from '@/config';
import { fileList } from '../../api/file';
import bus from '../../utils/bus';
export default {
  props: {
    // dialogVisible: {
    //   type: Boolean,
    //   default: false,
    // },
    // title: {
    //   type: String,
    //   default: '添加',
    // },
    // row: {
    //   type: Object,
    //   default: () => {},
    // },
  },
  data() {
    return {
      uploadFileUrl: config.baseUrl + '/upload/file',
      token: { token: getToken() },
      weightObject: {},
      form: {
        logo: { path: '' },
        fileList: [],
        // 二维码
        two: { path: '' },
        // 会议记录
        record: [],
        // 策划文案
        four: [],
        // 游戏截图
        five: [],
        // 游戏玩法视频,
        six: [],
        weight: '',
        weightObject: {}
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
  computed: {
    isShowAdd() {
      return this.$store.state.productPool.showdialogAdd;
    }
  },
  mounted() {
    this.queryUser();
    this.themeSearch();
    bus.$on('show_edit', id => {
      let data = this.$store.state.productPool.gameList.filter(
        item => item.id == id
      );
      data = data.length ? data[0] : {};
      this.row = data;
      this.formFromat();
    });
  },
  methods: {
    sixSuccess(result) {
      if (result.code != 1000) return this.$message.error(result.msg);
      let file = result.data;
      this.form.six.push({
        type: 6,
        name: file.origin_name,
        path: file.url,
        size: file.size
      });
    },
    sixRemove(file, fileList) {
      this.form.six.forEach((item, i) => {
        if (item.path == file.path) {
          this.form.six.splice(i, 1);
          return;
        }
      });
    },
    fiveSuccess(result) {
      if (result.code != 1000) return this.$message.error(result.msg);
      let file = result.data;
      this.form.five.push({
        type: 5,
        name: file.origin_name,
        path: file.url,
        size: file.size
      });
    },
    fiveRemove(file, fileList) {
      this.form.five.forEach((item, i) => {
        if (item.path == file.path) {
          this.form.five.splice(i, 1);
          return;
        }
      });
    },
    fourSuccess(result) {
      if (result.code != 1000) return this.$message.error(result.msg);
      let file = result.data;
      this.form.four.push({
        type: 4,
        name: file.origin_name,
        path: file.url,
        size: file.size
      });
    },
    fourRemove(file, fileList) {
      this.form.four.forEach((item, i) => {
        if (item.path == file.path) {
          this.form.four.splice(i, 1);
          return;
        }
      });
    },
    recordSuccess(result) {
      if (result.code != 1000) return this.$message.error(result.msg);
      let file = result.data;
      this.form.record.push({
        type: 3,
        name: file.origin_name,
        path: file.url,
        size: file.size
      });
    },
    recordRemove(file, fileList) {
      this.form.record.forEach((item, i) => {
        if (item.path == file.path) {
          this.form.record.splice(i, 1);
          return;
        }
      });
    },
    twoSuccess(result) {
      if (result.code != 1000) return this.$message.error(result.msg);
      let file = result.data;
      this.form.two = {
        type: 2,
        name: file.origin_name,
        path: file.url,
        size: file.size
      };
      this.$forceUpdate();
    },
    logoSuccess(result) {
      if (result.code != 1000) return this.$message.error(result.msg);
      let file = result.data;
      this.form.logo = {
        type: 1,
        name: file.origin_name,
        path: file.url,
        size: file.size
      };

      this.$forceUpdate();
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
      let result = await productSave(this.form);
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.form.id = result.id;
      this.handleClose();
    },
    //  更新产品数据
    async productUpdate() {
      let result = await productUpdate(this.form);
      if (result.code != 1000) return this.$message.error(result.msg);
      this.$message.success(result.msg);
      this.handleClose();
    },
    saveClick() {
      if (this.form.provide_id) {
        let user = this.users.find(i => i.user_id == this.form.provide_id);
        if (user) {
          this.form.provide_name = user.username;
        }
      }
      this.form.fileList = [];
      if (this.form.logo.path) {
        this.form.fileList.push(this.form.logo);
      }
      if (this.form.two.path) {
        this.form.fileList.push(this.form.two);
      }

      if (this.form.record.length) {
        this.form.fileList.push(...this.form.record);
      }
      if (this.form.four.length) {
        this.form.fileList.push(...this.form.four);
      }
      if (this.form.five.length) {
        this.form.fileList.push(...this.form.five);
      }
      if (this.form.six.length) {
        this.form.fileList.push(...this.form.six);
      }
      this.form.weight = JSON.stringify(this.weightObject);
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

      // if (this.title == '编辑' && this.row.id) {
      //   this.formFromat();
      // }
    },
    formFromat() {
      this.row.logo = {};
      // 二维码
      this.row.two = {};
      // 会议记录
      this.row.record = [];
      // 策划文案
      this.row.four = [];
      // 游戏截图
      this.row.five = [];
      // 游戏玩法视频,
      this.row.six = [];
      if (this.row.fileList && this.row.fileList.length) {
        this.row.fileList.forEach(item => {
          switch (item.type) {
            case 1:
              this.row.logo = item;
              break;
            case 2:
              this.row.two = item;
              break;
            case 3:
              this.row.record.push(item);
              break;
            case 4:
              this.row.four.push(item);
              break;
            case 5:
              this.row.five.push(item);
              break;
            case 6:
              this.row.six.push(item);
              break;
          }
        });
      }
      if (this.row.weight && this.row.weight.length) {
        this.weightObject = JSON.parse(this.row.weight);
      } else {
        this.weightObject = {};
      }

      //
      this.form = this.row;
    },
    //   弹窗关闭
    async handleClose() {
      this.form = {
        logo: { path: '' },
        fileList: [],
        // 二维码
        two: { path: '' },
        // 会议记录
        record: [],
        // 策划文案
        four: [],
        // 游戏截图
        five: [],
        // 游戏玩法视频,
        six: [],
        weight: ''
      };
      this.weightObject = {};
      // this.$emit('handleClose');
      this.$store.commit('productPool/ADD_STASTUS', false);
      let res = await productSearch({ del: 1 });
      if (res.code === 1000) {
        this.$store.commit('productPool/SET_GAME_LIST', res.data);
        this.gameList = res.data;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.updaeImg {
  /deep/ .el-upload--text {
    width: 178px;
    height: 178x;
    .avatar-uploader-icon {
      margin-top: 80px;
    }
  }
}
.updateFile {
  /deep/ .el-upload--text {
    width: 178px;
    height: 40px;
    border: none;
  }
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>