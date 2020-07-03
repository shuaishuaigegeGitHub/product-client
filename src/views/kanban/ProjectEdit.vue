<template>
  <div class="dialog-body" v-if="visible_" @click="handleWhiteAreaClose">
    <div class="dialog-wrapper" :style="{ width }">
      <!-- 弹框头部 -->
      <div class="dialog-header">
        <div class="dialog-header-title"></div>
        <div class="dialog-header-right">
          <el-tooltip effect="dark" placement="top" content="文档管理">
            <fl-button-icon
              v-if="ifMember"
              icon="el-icon-folder-opened"
              style="margin-right: 10px;"
              @click.native="$router.push('/fileManage/'+project.id)"
            ></fl-button-icon>
          </el-tooltip>
          <el-tooltip effect="dark" placement="top" content="项目跟进">
            <fl-button-icon
              v-if="ifMember"
              icon="el-icon-date"
              style="margin-right: 10px;"
              @click.native="$router.push('/followUp/'+project.id)"
            ></fl-button-icon>
          </el-tooltip>
          <el-tooltip effect="dark" placement="top" content="任务列表">
            <fl-button-icon
              v-if="ifMember"
              icon="el-icon-office-building"
              style="margin-right: 10px;"
              @click.native="$router.push('/task/'+project.id)"
            ></fl-button-icon>
          </el-tooltip>
          <el-tooltip effect="dark" placement="top" content="转移项目到回收站">
            <fl-button-icon
              v-if="!readonly"
              icon="el-icon-delete"
              style="margin-right: 10px;"
              @click.native="handleDelete"
            ></fl-button-icon>
          </el-tooltip>
          <fl-button-icon icon="el-icon-close" @click.native="handleDialogClose"></fl-button-icon>
        </div>
      </div>
      <div class="fl-divider"></div>
      <!-- 弹框主体 -->
      <el-row class="dialog-content">
        <!-- 左面板 -->
        <el-col class="dialog-content-left" :span="14">
          <fl-input
            v-model="form.project_name"
            placeholder="请输入项目名称"
            @change="handleChangeProjectName"
            :readonly="readonly"
            :input-style="{ width: '100%', fontSize: '20px', color: '#000000' }"
          ></fl-input>
          <div class="fl-form-item">
            <div class="label">
              <i class="el-icon-edit"></i> 启动时间
            </div>
            <div class="value">
              <el-date-picker
                v-model="form.begin_time"
                type="date"
                placeholder="选择项目启动时间"
                value-format="yyyy-MM-DD"
                @change="handleChangeBeginTime"
                :readonly="readonly"
              ></el-date-picker>
            </div>
          </div>
          <!-- <div class="fl-form-item">
            <div class="label">
              <i class="el-icon-edit"></i> 体验版时间：
            </div>
            <div class="value">
              <el-date-picker
                v-model="form.experience_time"
                type="date"
                placeholder="选择项目体验版时间"
                value-format="yyyy-MM-DD"
                @change="handleChangeExperienceTime"
                :readonly="readonly"
              ></el-date-picker>
            </div>
          </div>
          <div class="fl-form-item">
            <div class="label">
              <i class="el-icon-edit"></i> 测试版时间
            </div>
            <div class="value">
              <el-date-picker
                v-model="form.test_time"
                type="date"
                placeholder="选择项目测试版时间"
                value-format="yyyy-MM-DD"
                @change="handleChangeTestTime"
                :readonly="readonly"
              ></el-date-picker>
            </div>
          </div>
          <div class="fl-form-item">
            <div class="label">
              <i class="el-icon-edit"></i> 上线时间
            </div>
            <div class="value">
              <el-date-picker
                v-model="form.online_time"
                type="date"
                placeholder="选择项目上线时间"
                value-format="yyyy-MM-DD"
                @change="handleChangeOnlineTime"
                :readonly="readonly"
              ></el-date-picker>
            </div>
          </div>-->
          <div class="fl-form-item">
            <div class="label">
              <i class="el-icon-user"></i> 负责人
            </div>
            <div class="value">
              <el-select
                v-model="principal.user_id"
                placeholder="请选择负责人"
                @change="handleChangePrincipal"
                :disabled="readonly"
              >
                <el-option
                  v-for="item in form.memberList"
                  :key="item.id"
                  :label="item.username"
                  :value="item.user_id"
                >
                  <div style="display: flex">
                    <el-avatar
                      size="small"
                      style="margin-top: 3px"
                      :src="item.avatar"
                    >{{ item.username.substr(0, 1) }}</el-avatar>
                    <div style="margin-left: 10px">{{ item.username }}</div>
                  </div>
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="fl-form-item">
            <div class="label">
              <i class="el-icon-folder"></i> 所属部门
            </div>
            <div class="value">
              <el-select v-model="form.group_id" @change="handleChangeGroup" :disabled="readonly">
                <el-option
                  v-for="item in groupOptions"
                  :index="item.id"
                  :key="item.id"
                  :label="item.group_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>

          <div class="fl-form-item">
            <div class="label">
              <i class="el-icon-folder"></i> 所属列表
            </div>
            <div class="value">
              <el-select v-model="form.list_id" @change="handleChangeList" :disabled="readonly">
                <el-option
                  v-for="item in listOptions"
                  :index="item.id"
                  :key="item.id"
                  :label="item.list_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>

          <div class="fl-form-item">
            <div class="label">
              <i class="el-icon-timer"></i> 优先级
            </div>
            <div class="value">
              <el-select
                v-model="form.priority"
                @change="handleChangePriority"
                :disabled="readonly"
              >
                <el-option
                  v-for="item in priorityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>

          <div class="fl-form-item">
            <div class="label">
              <i class="el-icon-collection-tag"></i> 标签
            </div>
            <div class="value">
              <el-select v-model="form.tag" multiple placeholder="请选择标签" @change="handleChangeTags">
                <el-option
                  v-for="item in tagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- <el-tag
                                class="button-new-tag"
                                v-for="tag in form.tag"
                                :key="tag"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input
                                v-if="tagInputVisible"
                                v-model="tagInput"
                                ref="saveTagInput"
                                size="mini"
                                @keyup.enter.native="handleInputConfirm"
                                @keyup.esc.native="handleInputEsc"
                                style="width: 100px"
                            ></el-input>
              <el-button v-else-if="!readonly" size="mini" @click="showInput">+ 新标签</el-button>-->
            </div>
          </div>
          <div class="fl-form-item">
            <div class="label">
              <i class="el-icon-postcard"></i> APPID
            </div>
            <div class="value">
              <el-input v-model="form.app_id" @change="handleChangeAppId" :readonly="readonly"></el-input>
            </div>
          </div>

          <div class="fl-form-item">
            <div class="label">
              <i class="el-icon-document"></i> 备注
            </div>
            <div class="value">
              <el-input
                type="textarea"
                v-model="form.remark"
                @change="handleChangeRemark"
                :readonly="readonly"
              ></el-input>
            </div>
          </div>
        </el-col>
        <!-- 右面板 -->
        <el-col class="dialog-content-right" :span="10">
          <p>参与者 · {{ form.memberList.length }}</p>
          <div class="partner">
            <div
              v-for="(item,index) in form.memberList"
              :key="item.id"
              class="partner-item"
              @click="deleteMember(item)"
              @mouseover="getInt(index,item)"
              @mouseleave="getOut(index)"
            >
              <el-tooltip effect="dark" :content="resolveUsername(item)" placement="top">
                <el-avatar size="medium" :src="resolveImagePath(item.avatar)">
                  <span v-if="item.isDelete==1" class="el-icon-delete"></span>
                  <span v-else>{{ item.username.substr(0, 1) }}</span>
                </el-avatar>
              </el-tooltip>
              <div class="partner-delete" v-show="item.visible">
                <i class="el-icon-remove" title="移除该参与者"></i>
              </div>
            </div>
            <div class="add-partner">
              <el-tooltip effect="dark" content="添加参与者" placement="top">
                <el-button
                  v-if="!readonly"
                  type="primary"
                  icon="el-icon-plus"
                  circle
                  @click="addPartnerVisible = true"
                ></el-button>
              </el-tooltip>
              <div class="float-card" v-if="addPartnerVisible">
                <el-select
                  v-model="addPartner"
                  filterable
                  multiple
                  style="width: 100%"
                  placeholder="请选择参与者"
                >
                  <el-option
                    v-for="item in noneUserList"
                    :key="item.user_id"
                    :label="item.username"
                    :value="item.user_id"
                  >
                    <div style="display: flex">
                      <el-avatar
                        size="small"
                        style="margin-top: 3px"
                        :src="item.avatar"
                      >{{ item.username.substr(0, 1) }}</el-avatar>
                      <div style="margin-left: 10px">{{ item.username }}</div>
                    </div>
                  </el-option>
                </el-select>
                <el-select
                  style="width: 100%; margin-top: 10px"
                  v-model="partnerRole"
                  filterable
                  placeholder="请选择角色"
                >
                  <el-option label="策划" value="1" />
                  <el-option label="美术" value="2" />
                  <el-option label="程序" value="3" />
                  <el-option label="运营" value="4" />
                  <el-option label="策划验收" value="5" />
                  <el-option label="美术验收" value="6" />
                  <el-option label="程序验收" value="7" />
                  <el-option label="运营验收" value="8" />
                </el-select>
                <el-row style="width: 100%; margin-top: 10px">
                  <el-col style="width: 50%">
                    <el-button
                      style="width: 95%; margin-top: 10px"
                      @click="addPartnerVisible = false"
                    >取 消</el-button>
                  </el-col>
                  <el-col style="width: 50%; text-align: right">
                    <el-button
                      type="primary"
                      style="width: 95%; margin-top: 10px"
                      @click="handleAddPartner"
                    >确 定</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <!-- 项目动态 -->
          <div class="dynamic">
            <p>项目动态</p>
            <div v-for="item in dynamicLog" :key="item.id" class="dynamic-item">
              <div class="detail">
                <i class="el-icon-edit"></i>
                <span style="color: #222222; font-weight: bold">{{ item.operator }}</span>
                {{ item.detail }}
                <span
                  style="color: #111111"
                >{{ resolveDynamic(item) }}</span>
              </div>
              <span class="time">{{ item.create_time }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import FlButtonIcon from '@/components/custom/FlButtonIcon';
import FlInput from '@/components/custom/FlInput';
import config from '@/config';
import {
  query,
  del,
  updateProjectName,
  updateGroup,
  updatePriority,
  updateList,
  updateRemark,
  updateTag,
  updateBeginTime,
  updatePrincipal,
  addMember,
  getLog,
  deleteProjectMember,
  updateAppId,
  experienceTime,
  testTime,
  onlineTime
} from '@/api/project';

export default {
  components: {
    FlButtonIcon,
    FlInput
  },
  props: {
    width: {
      type: String,
      default: '70%'
    },
    title: String,
    project: Object,
    userList: {
      type: Array,
      default: () => []
    },
    groupOptions: {
      type: Array,
      default: () => []
    },
    listOptions: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loginUser: {},
      visible_: false,
      form: {
        project_name: '',
        project_logo: null,
        begin_time: null,
        group_id: null,
        list_id: null,
        experience_time: null,
        test_time: null,
        online_time: null,
        remark: '',
        priority: 1,
        tag: []
      },
      principal: {},
      priorityOptions: [
        { label: '一般', value: 1 },
        { label: '紧急', value: 2 },
        { label: '非常紧急', value: 3 }
      ],
      tagOptions: [
        { label: '2D', value: '2D' },
        { label: '3D', value: '3D' }
      ],
      // tagInputVisible: false,
      // tagInput: '',
      addPartner: [],
      partnerRole: '',
      addPartnerVisible: false,
      // 未参与该项目的用户
      noneUserList: [],
      readonly: false,
      // 动态日志
      dynamicLog: [],
      // 是否是参与者
      ifMember: false
    };
  },
  methods: {
    // 参与者鼠标移入
    getInt(index, item) {
      let tt = Object.assign({}, this.form.memberList[index]);
      tt.isDelete = 1;
      this.$set(this.form.memberList, index, tt);
    },
    // 参与者鼠标移除
    getOut(index) {
      this.form.memberList[index].isDelete = 0;
    },
    // 删除参与者
    async deleteMember(row) {
      if (this.readonly) {
        return this.$message.warning('不是负责人');
      }
      if (row.user_id == this.principal.user_id) {
        return this.$message.warning('不能删除负责人');
      }
      let names = row.username.split('：');
      if (names.length > 1) {
        row.username = names[1].trim();
      }
      this.$confirm(
        '确定要删除参与者：' + row.username + ', 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async () => {
          let result = await deleteProjectMember(row);
          if (result.code != 1000) {
            return this.$message.warning(result.msg);
          }
          this.$message.success(result.msg);
          for (let i = 0; i < this.form.memberList.length; i++) {
            if (this.form.memberList[i].id == row.id) {
              this.form.memberList.splice(i, 1);
            }
          }
          this.addPartner = [];
          this.partnerRole = '';
          this.getNewLog();
        })
        .catch(() => {});
    },
    resolveDynamic(log) {
      let result = log.content;
      switch (log.column_name) {
        case 'list':
          for (let list of this.listOptions) {
            if (log.content == list.id) {
              result = list.list_name;
              break;
            }
          }
          break;
        case 'group':
          for (let group of this.groupOptions) {
            if (log.content == group.id) {
              result = group.group_name;
              break;
            }
          }
          break;
        case 'priority':
          for (let priority of this.priorityOptions) {
            if (log.content == priority.value) {
              result = priority.label;
              break;
            }
          }
          break;
        default:
          break;
      }
      return result;
    },
    // 项目移到回收站
    handleDelete() {
      this.$confirm(
        `确定把【${this.form.project_name}】转移到回收站？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          del(this.form.id).then(res => {
            this.$notify({
              title: '提示',
              message: `【${this.form.project_name}】已成功转移到回收站！`,
              type: 'success'
            });
            this.handleDialogClose();
          });
        })
        .catch(() => {});
    },
    // 添加参与者
    async handleAddPartner() {
      if (this.addPartner && this.addPartner.length && this.partnerRole) {
        let addPartner = this.noneUserList.filter(item =>
          this.addPartner.includes(item.user_id)
        );

        addPartner.forEach(item => {
          item.project_id = this.form.id;
          item.partner_role = this.partnerRole;
        });
        await addMember(addPartner);
        this.addPartnerVisible = false;
        addPartner.forEach(item => {
          item.isDelete = 0;
          item.username = this.resolveUsername({
            partner_role: this.partnerRole,
            role: 'PARTNER',
            username: item.username
          });
        });
        this.form.memberList = this.form.memberList.concat(addPartner);
        this.addPartner = [];
        this.partnerRole = '';
        this.getNewLog();
      }
    },
    resolveUsername(data) {
      let result = '';
      if (data.role === 'PRINCIPAL') {
        result += '负责人：';
      } else if (data.role === 'PARTNER') {
        switch (parseInt(data.partner_role)) {
          case 1:
            result += '策划：';
            break;
          case 2:
            result += '美术：';
            break;
          case 3:
            result += '程序：';
            break;
          case 4:
            result += '运营：';
            break;
          case 5:
            result += '策划验收：';
            break;
          case 6:
            result += '美术验收：';
            break;
          case 7:
            result += '程序验收：';
            break;
          case 8:
            result += '运营验收：';
            break;
          default:
            result += '参与者：';
            break;
        }
      }
      result += data.username;
      return result;
    },
    // async handleClose(tag) {
    //     await updateDelTag({ id: this.form.id, tag: tag });
    //     this.form.tag.splice(this.form.tag.indexOf(tag), 1);
    //     this.getNewLog();
    // },
    // showInput() {
    //     this.tagInputVisible = true;
    //     this.$nextTick(_ => {
    //         this.$refs.saveTagInput.$refs.input.focus();
    //     });
    // },
    // async handleInputConfirm() {
    //     let tagInput = this.tagInput;
    //     await updateAddTag({ id: this.form.id, tag: tagInput });
    //     if (tagInput) {
    //         this.form.tag.push(tagInput);
    //         this.getNewLog();
    //     }
    //     this.tagInputVisible = false;
    //     this.tagInput = '';
    // },
    // handleInputEsc() {
    //     this.tagInputVisible = false;
    //     this.tagInput = '';
    // },
    handleWhiteAreaClose(e) {
      if (e.target === this.$el) {
        this.handleDialogClose();
      }
    },
    handleDialogClose() {
      this.partnerRole = '';
      this.visible_ = false;
      this.$emit('update:visible', false);
      this.$emit('close');
    },
    resolveImagePath(url) {
      if (!url || url.indexOf('http') === 0) {
        return url;
      }
      return this.uploadConfig.imagePrefix + '/upload/logo/' + url;
    },
    async handleChangeRemark(val) {
      await updateRemark({ id: this.form.id, remark: val });
      this.getNewLog();
    },
    async handleChangeAppId(val) {
      await updateAppId({ id: this.form.id, app_id: val });
      this.getNewLog();
    },
    async handleChangeProjectName(val) {
      await updateProjectName({ id: this.form.id, project_name: val });
      this.getNewLog();
    },
    async handleChangeGroup(val) {
      await updateGroup({ id: this.form.id, group: val });
      this.getNewLog();
    },
    async handleChangeList(val) {
      await updateList({ id: this.form.id, list: val });
      this.getNewLog();
    },
    async handleChangePriority(val) {
      await updatePriority({ id: this.form.id, priority: val });
      this.getNewLog();
    },
    async handleChangeBeginTime(val) {
      console.log('handleChangeBeginTime,', val);
      await updateBeginTime({ id: this.form.id, begin_time: val });
      this.getNewLog();
    },
    // 修改体验版时间
    async handleChangeExperienceTime(val) {
      console.log('handleChangeExperienceTime', val);
      await experienceTime({ id: this.form.id, experience_time: val });
      this.getNewLog();
    },
    // 修改 测试版时间
    async handleChangeTestTime(val) {
      await testTime({ id: this.form.id, test_time: val });
      this.getNewLog();
    },
    // 修改 上线时间
    async handleChangeOnlineTime(val) {
      await onlineTime({ id: this.form.id, online_time: val });
      this.getNewLog();
    },
    async handleChangeTags(val) {
      await updateTag({ id: this.form.id, tag: val });
      this.getNewLog();
    },
    async handleChangePrincipal(val) {
      let principal = null;
      for (let member of this.form.memberList) {
        if (member.user_id === val) {
          principal = member;
          break;
        }
      }
      this.principal = principal;
      await updatePrincipal(principal);
      let res = await query(this.form.id);
      this.initProject(res.data);
    },
    // 初始化数据
    initProject(val) {
      if (val && val.memberList && val.memberList.length > 1) {
        val.memberList.forEach(item => {
          item.isDelete = 0;
        });
      }
      this.ifMember = false;
      this.principal = {};
      this.form = val || {};
      if (this.form.begin_time) {
        this.form.begin_time = new Date(this.form.begin_time * 1000);
      }
      if (this.form.experience_time) {
        this.form.experience_time = new Date(this.form.experience_time * 1000);
      }
      if (this.form.test_time) {
        this.form.test_time = new Date(this.form.test_time * 1000);
      }
      if (this.form.online_time) {
        this.form.online_time = new Date(this.form.online_time * 1000);
      }
      this.loginUser = this.$store.state.user.user;

      if (this.form.memberList) {
        this.form.memberList.forEach(item => {
          item.isDelete = 0;
          if (this.loginUser.uid == item.user_id) {
            this.ifMember = true;
            return;
          }
        });
        for (let i = 0; i < this.form.memberList.length; i++) {
          if (this.form.memberList[i].role === 'PRINCIPAL') {
            this.principal = Object.assign({}, this.form.memberList[i]);

            if (this.principal.user_id === this.loginUser.uid) {
              // 如果当前登录的是负责人
              this.readonly = false;
            } else {
              this.readonly = true;
            }
            break;
          }
        }
        let memberIds = this.form.memberList.map(item => {
          item.visible = false;
          return item.user_id;
        });
        this.noneUserList = this.userList.filter(
          item => !memberIds.includes(item.user_id)
        );
      } else {
        this.noneUserList = this.userList;
      }
      this.getLog();
    },
    async getLog() {
      let res = await getLog(this.form.id);
      this.dynamicLog = res.data;
    },
    // 获取最近的动态
    async getNewLog() {
      let last_log_id = null;
      if (this.dynamicLog && this.dynamicLog.length) {
        last_log_id = this.dynamicLog[0].id;
      }
      let res = await getLog(this.form.id, { last_log_id });
      this.dynamicLog = res.data.concat(this.dynamicLog);
    }
  },
  watch: {
    visible(val) {
      this.visible_ = val;
      this.addPartnerVisible = false;
      this.addPartner = [];
    },
    project(val) {
      this.initProject(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: #00000055;
  z-index: 100;
  overflow: auto;

  .dialog-wrapper {
    border-radius: 5px;
    margin: 100px auto;
    background-color: white;

    .dialog-header {
      padding: 15px;
      display: flex;

      .dialog-header-title {
        min-width: 100px;
      }

      .dialog-header-right {
        flex-grow: 1;
        text-align: right;
      }
    }

    .fl-divider {
      border-top: 1px solid #d3d3d3;
    }

    .dialog-content {
      .dialog-content-left {
        padding: 15px;
      }

      .dialog-content-right {
        border-left: 1px solid #d3d3d3;

        p {
          margin: 15px;
        }

        .partner {
          padding: 10px;
          display: flex;
          border-bottom: 1px solid #d3d3d3;

          .el-avatar {
            cursor: pointer;
          }

          .partner-item {
            position: relative;

            .partner-delete {
              position: absolute;
              top: -10px;
              right: -15px;

              i {
                color: #fd7171;
                cursor: pointer;
              }
            }
          }

          div {
            width: 50px;
            text-align: center;
          }

          .add-partner {
            position: relative;

            .float-card {
              position: absolute;
              margin-top: 10px;
              margin-left: -85px;
              background-color: white;
              border-radius: 4px;
              box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
              padding: 15px;
              width: 200px;
            }
          }
        }

        .dynamic {
          height: calc(65vh);
          overflow: auto;
          .dynamic-item {
            display: flex;
            color: #666666;
            font-size: 14px;
            padding: 5px 15px;

            .detail {
              flex-grow: 1;
              line-height: 2rem;
              i {
                margin-right: 10px;
              }
            }
            .time {
              width: 170px;
              text-align: right;
            }
          }
        }
      }
    }

    .dialog-footer {
      padding: 15px;
    }
  }
}
.button-new-tag {
  margin-right: 10px;
}

.fl-form-item {
  display: flex;
  line-height: 3rem;

  .label {
    width: 150px;
    margin-left: 20px;
    font-size: 14px;
    color: #555555;
  }

  .value {
    flex-grow: 1;
  }
}
</style>
