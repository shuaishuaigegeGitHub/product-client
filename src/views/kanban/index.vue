
  <template>
  <div v-loading="loading">
    <div class="bodyTitle">
      <el-form label-width="80px">
        <!-- <el-popover placement="bottom" width="200" trigger="click" ref="listPopover">
          <div>
            <el-row style="margin-top:10px;margin-bottom:5px">
              <el-col :span="18" style="font-weight:900;">部门</el-col>
              <el-col :span="6">
                <el-button
                  class="noBroderButton"
                  style="margin-top:-10px"
                  icon="el-icon-plus"
                  @click="groupAddClick"
                ></el-button>
              </el-col>
            </el-row>
            <div v-for="(value,i) in groupOptions" :key="i" class="task-item">
              <el-row>
                <el-col :span="18">
                  <div @click="searchListClick(value)">{{value.group_name}}</div>
                </el-col>
                <el-col :span="6">
                  <el-popover placement="right" trigger="click">
                    <div align="left">
                      <div>
                        <el-button
                          class="listButton"
                          icon="el-icon-edit"
                          @click="groupClick({item:value,i:1})"
                        >编辑部门</el-button>
                      </div>
                      <div>
                        <el-button
                          class="listButton"
                          icon="el-icon-delete"
                          @click="groupClick({item:value,i:2})"
                        >删除部门</el-button>
                      </div>
                    </div>
                    <div slot="reference" class="listEditSpot" align="right">
                      <i class="el-icon-more"></i>
                    </div>
                  </el-popover>
                </el-col>
              </el-row>
            </div>
          </div>
          <el-button slot="reference" class="noBroderButton">
            {{searchForm.group_name}}
            <span class="el-icon-arrow-down" />
          </el-button>
        </el-popover>-->
        <el-popover placement="bottom" width="100" trigger="click" ref="tagPopover">
          <div v-for="item in tagOptions" :key="item.value">
            <el-button
              style="width: 100%; border: none; text-align: left"
              @click="searchTag(item)"
            >{{ item.label }}</el-button>
          </div>
          <el-button slot="reference" class="noBroderButton">
            {{ searchForm.tag.label }}
            <span class="el-icon-arrow-down" />
          </el-button>
        </el-popover>
        <el-button
          class="noBroderButton"
          @click="RecoveryVisable=true"
          v-if="$store.state.permission.perms.has('project:recyclebin')"
        >
          回收站
          <i class="el-icon-delete el-icon--right"></i>
        </el-button>
      </el-form>
    </div>
    <div style="width:100%;overflow:auto">
      <div class="bodyDiv" :style="'width:'+((tableData.length+1)*400)+'px;'">
        <!-- 搜索条件 -->

        <!-- 搜索条件结束 -->
        <!-- 项目列开始 -->
        <draggable
          class="list-group"
          :list="tableData"
          @change="logList"
          :disabled="!$store.state.permission.perms.has('project:drag') || enabled"
          @start="listDrag = true"
          @end="listDrag = false"
          v-bind="listDragOptions"
        >
          <transition-group type="transition" :name="!listDrag ? 'flip-list' : null">
            <div class="typeClass" v-for="v in tableData" :key="v.id">
              <div style="line-height: 28px; width: 300px">
                <span class="listTitle">{{v.list_name}}</span>
                <el-popover
                  v-if="$store.state.permission.perms.has('project:projectLIst')"
                  placement="bottom"
                  width="150"
                  trigger="click"
                  style="float: right;"
                >
                  <div>
                    <el-row>
                      <el-button
                        class="listButton"
                        style
                        icon="el-icon-edit"
                        @click="listClick({item:v,i:1})"
                      >编辑任务列表</el-button>
                    </el-row>
                    <el-row>
                      <el-button
                        class="listButton"
                        icon="el-icon-delete"
                        @click="listClick({item:v,i:2})"
                      >删除任务列表</el-button>
                    </el-row>
                  </div>
                  <i slot="reference" class="listSpot el-icon-more"></i>
                </el-popover>
              </div>
              <draggable
                class="porject-group"
                :list="v.projectList"
                group="projectGroup"
                @change="log"
                :disabled="!$store.state.permission.perms.has('project:drag') || enabled"
                @start="porjectDrag = true"
                @end="porjectDrag = false"
                v-bind="projectDragOptions"
              >
                <transition-group type="transition" :name="!porjectDrag ? 'flip-list' : null">
                  <div
                    class="productClass"
                    v-for="value in v.projectList"
                    :key="value.id"
                    @click="edit(value)"
                  >
                    <div class="productbody">
                      <el-row>
                        <el-col :span="8">
                          <img
                            height="65px"
                            width="65px"
                            style="border-radius:50%;margin-top:5px"
                            :src="resolveImagePath(value.project_logo)"
                          />
                        </el-col>
                        <el-col :span="16">
                          <h3>{{value.project_name}}</h3>
                          <div class="projectfont">负责人:{{value.username}}</div>
                          <div class="projectfont">开始时间:{{value.begin_time}}</div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div
                    key="plus"
                    @mouseenter="enabledClick(true)"
                    @mouseleave="enabledClick(false)"
                    v-if="$store.state.permission.perms.has('project:create')"
                  >
                    <el-button
                      style="-webkit-app-region:no-drag"
                      class="productbutton"
                      icon="el-icon-plus"
                      @click="handleAddProject(v.id)"
                    ></el-button>
                  </div>
                  <div key="zore" style="height: 127px"></div>
                </transition-group>
              </draggable>
            </div>
          </transition-group>
        </draggable>
        <div class="typeClass">
          <el-button
            v-if="$store.state.permission.perms.has('project:projectLIst')"
            icon="el-icon-plus"
            @click="listAddClick"
            style="border:none;color:#8c8c8c;"
          >新建任务列表</el-button>
        </div>
        <!-- 项目列结束 -->
        <!-- 部门dialog开始 -->
        <el-dialog :title="group.title" center :visible.sync="group.dialogVisible" width="30%">
          <el-form ref="groupForm" label-width="80">
            <el-form-item label="部门名称">
              <el-input v-model="group.form.group_name" clearable maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="部门描述">
              <el-input v-model="group.form.remark" type="textarea" maxlength="500" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="groupSave">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 部门dialog结束 -->
        <!-- 任务列表dialog开始 -->
        <el-dialog :title="list.title" center :visible.sync="list.dialogVisible" width="30%">
          <el-form ref="groupForm" label-width="80">
            <el-form-item label="任务名称">
              <el-input v-model="list.form.list_name" clearable maxlength="20"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="listSave">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 任务列表dialog结束 -->
      </div>
    </div>
    <project-add
      :visible.sync="addProject.visible"
      :groupId="addProject.groupId"
      :listId="addProject.listId"
      :groupOptions="groupOptions"
      :listOptions="tableData"
      @submitSuccess="handleAddProjectSuccess"
      width="700px"
    ></project-add>
    <project-edit
      :visible.sync="editProject.visible"
      :project="editProject.data"
      :groupOptions="groupOptions"
      :listOptions="tableData"
      :userList="userList"
      @submitSuccess="handleEditProjectSuccess"
      @close="handleProjectEditClose"
    ></project-edit>
    <Recovery :dialogVisible="RecoveryVisable" @close="recoveryClose"></Recovery>
  </div>
</template>

<script>
import ProjectAdd from './ProjectAdd';
import ProjectEdit from './ProjectEdit';
import Recovery from './recovery';
import config from '@/config';
import draggable from 'vuedraggable';
import {
  groupSave,
  groupUpdate,
  groupdel,
  groupSearch,
  listSave,
  listUpdate,
  listdel,
  listSearch,
  updatePos,
  updateListPos,
  updatePosList
} from '../../api/kanban';
import { query as queryProject } from '@/api/project';
import { queryUser } from '@/api/user';

export default {
  name: '',
  components: { ProjectAdd, ProjectEdit, draggable, Recovery },
  mounted() {
    this.groupSearch();
    queryUser().then(res => {
      this.userList = res.data;
    });
  },
  computed: {
    projectDragOptions() {
      return {
        animation: 200,
        group: 'projectGroup',
        disabled: false,
        ghostClass: 'ghost'
      };
    },
    listDragOptions() {
      return {
        animation: 200,
        group: 'listGroup',
        disabled: false,
        ghostClass: 'ghost'
      };
    }
  },
  data() {
    return {
      tagOptions: [
        { label: '全部标签', value: '' },
        { label: '2D', value: '2D' },
        { label: '3D', value: '3D' }
      ],
      // 项目拖拽
      porjectDrag: false,
      // 列表拖拽
      listDrag: false,
      RecoveryVisable: false,
      userList: [],
      enabled: false,
      loading: false,
      addProject: {
        visible: false,
        groupId: null,
        listId: null
      },
      editProject: {
        visible: false,
        data: {}
      },
      // 任务列表
      list: {
        title: '添加任务',
        dialogVisible: false,
        form: {
          list_name: '',
          remark: ''
        }
      },
      // 分组数据
      group: {
        title: '添加分组',
        dialogVisible: false,
        form: {
          group_name: '',
          remark: ''
        }
      },
      // 查询条件
      searchForm: {
        group_id: null,
        group_name: '',
        tag: {
          label: '全部标签',
          value: ''
        }
      },
      // 项目组集合
      groupOptions: [],
      // 项目表
      tableData: []
    };
  },
  methods: {
    searchTag(tag) {
      this.searchForm.tag = tag;
      this.$refs['tagPopover'].doClose();
      this.listSearch();
    },
    recoveryClose() {
      this.RecoveryVisable = false;
      this.listSearch();
    },
    enabledClick(bo) {
      this.enabled = bo;
    },
    // 跟新项目列表顺序
    async updateListPos(row) {
      this.loading = true;
      let result = await updateListPos(row);
      this.loading = false;
      if (result.code != 1000) return this.$message.warning(result.msg);
      // this.$message.success(result.msg);
      this.listSearch();
    },
    // 任务列表拖拽
    logList(evt) {
      let { moved } = evt;
      if (moved) {
        let row = moved.element;
        let index = moved.newIndex;
        if (index == this.tableData.length - 1) {
          let item = this.tableData[index - 1];
          this.tableData[index].pos = item.pos + 1;
        } else {
          let item = this.tableData[index + 1];
          this.tableData[index].pos = item.pos;
        }
        this.updateListPos(this.tableData[index]);
      }
    },
    // 跟新项目顺序
    async updatePos(row) {
      this.loading = true;
      let result = await updatePos(row);
      this.loading = false;
      if (result.code != 1000) return this.$message.warning(result.msg);
      // this.$message.success(result.msg);
      this.listSearch();
    },
    async updatePosList(row) {
      this.loading = true;
      let result = await updatePosList(row);
      this.loading = false;
      if (result.code != 1000) return this.$message.warning(result.msg);
      // this.$message.success(result.msg);
      this.listSearch();
    },
    // 项目拖拽
    log(evt) {
      let { moved, added, removed } = evt;
      if (moved) {
        // 被拖拽的对象
        let row = moved.element;
        // 新数组下标
        let newIndex = moved.newIndex;
        // console.log(this.tableData);
        for (let i = 0; i < this.tableData.length; i++) {
          if (
            this.tableData[i].projectList &&
            this.tableData[i].projectList.length > 0 &&
            this.tableData[i].id == row.list_id
          ) {
            for (let j = 0; j < this.tableData[i].projectList.length; j++) {
              if (this.tableData[i].projectList[j].id == row.id) {
                let item;
                if (this.tableData[i].projectList.length == 1 && j == 0) {
                  return;
                } else if (j == this.tableData[i].projectList.length - 1) {
                  item = this.tableData[i].projectList[j - 1];
                  item.pos = item.pos || 0;
                  this.tableData[i].projectList[j].pos = item.pos + 1;
                } else {
                  item = this.tableData[i].projectList[j + 1];
                  item.pos = item.pos || 0;
                  this.tableData[i].projectList[j].pos = item.pos;
                }
                this.updatePos(this.tableData[i].projectList[j]);
                return;
              }
            }
          }
        }
      }
      if (added) {
        // 被拖拽的对象
        let row = added.element;
        // 新数组下标
        let newIndex = added.newIndex;
        for (let i = 0; i < this.tableData.length; i++) {
          if (
            this.tableData[i].projectList &&
            this.tableData[i].projectList.length > 0
          ) {
            for (let j = 0; j < this.tableData[i].projectList.length; j++) {
              if (this.tableData[i].projectList[j].id == row.id) {
                let item;
                if (this.tableData[i].projectList.length == 1) {
                  this.tableData[i].projectList[j].list_id = this.tableData[
                    i
                  ].id;
                  this.tableData[i].projectList[j].pos = 0;
                } else if (j == this.tableData[i].projectList.length - 1) {
                  item = this.tableData[i].projectList[j - 1];
                  item.pos = item.pos || 0;
                  this.tableData[i].projectList[j].list_id = item.list_id;
                  this.tableData[i].projectList[j].pos = item.pos + 1;
                } else {
                  item = this.tableData[i].projectList[j + 1];
                  item.pos = item.pos || 0;
                  this.tableData[i].projectList[j].list_id = item.list_id;
                  this.tableData[i].projectList[j].pos = item.pos;
                }
                this.updatePosList(this.tableData[i].projectList[j]);
                return;
              }
            }
          }
        }
        this.listSearch();
      }
    },
    // -----------------任务列表开始--------------------------
    // 选择分组
    searchListClick(row) {
      this.searchForm.group_id = row.id;
      this.searchForm.group_name = row.group_name;
      this.$refs['listPopover'].doClose();
      this.listSearch();
    },
    // 查询任务列表
    async listSearch() {
      this.loading = true;
      let result = await listSearch(this.searchForm.group_id, {
        tag: this.searchForm.tag.value
      });
      this.loading = false;
      if (result.code != 1000) return this.$message.warning(result.msg);
      result.data.forEach(item => {
        if (!item.projectList) {
          item.projectList = [];
        }
      });
      this.tableData = result.data;
    },
    // 任务列表保存
    async listSave() {
      if (!this.searchForm.group_id) {
        return this.$message.warning('请选择项目分组');
      }
      if (!this.list.form.list_name) {
        return this.$message.warning('请填写名称');
      }
      if (this.list.form.id) {
        this.listUpdate();
        return;
      }
      this.list.form.group_id = this.searchForm.group_id;
      let result = await listSave(this.list.form);
      if (result.code != 1000) return this.$message.warning(result.msg);
      this.$message.success(result.msg);
      this.list.dialogVisible = false;
      this.listSearch();
    },
    // 更新任务列表
    async listUpdate() {
      let result = await listUpdate(this.list.form);
      if (result.code != 1000) return this.$message.warning(result.msg);
      this.$message.success(result.msg);
      this.list.dialogVisible = false;
      this.listSearch();
    },
    // 打开任务列表添加弹窗
    listAddClick() {
      this.list.title = '添加任务任务列表';
      this.list.form.id = '';
      this.list.form.list_name = '';
      this.list.form.remark = '';
      this.list.dialogVisible = true;
    },
    // 分类编辑点击
    listClick(row) {
      let item = row.item;
      let i = row.i;
      if (i == 1) {
        // 编辑
        this.list.form = item;
        this.list.title = '修改任务列表';
        this.list.dialogVisible = true;
      } else if (i == 2) {
        // 删除
        this.$confirm('确认要删除任务列表吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            let result = await listdel(item.id);
            if (result.code != 1000) return this.$message.warning(result.msg);
            this.$message.success(result.msg);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.listSearch();
          })
          .catch(() => {});
      }
    },
    // -----------------任务列表结束--------------------------
    // -----------------分组开始--------------------------
    // 查询分组
    async groupSearch() {
      let result = await groupSearch(this.group.form);
      if (result.code != 1000) return this.$message.warning(result.msg);
      let a = true;
      result.data.forEach(item => {
        if (item.id == this.searchForm.group_id) {
          this.searchForm.group_name = item.group_name;
          a = false;
        }
      });
      if (a) {
        this.searchForm.group_id = '';
      }
      this.groupOptions = result.data;
      if (!this.searchForm.group_id && this.groupOptions.length > 0) {
        this.searchForm.group_id = this.groupOptions[0].id;
        this.searchForm.group_name = this.groupOptions[0].group_name;
        this.listSearch();
      }
    },
    // 分组保存
    async groupSave() {
      if (!this.group.form.group_name) {
        return this.$message.warning('请填写名称');
      }
      if (!this.group.form.remark) {
        return this.$message.warning('请填写说明');
      }
      if (this.group.form.id) {
        this.groupUpdate();
        return;
      }
      let result = await groupSave(this.group.form);
      if (result.code != 1000) return this.$message.warning(result.msg);
      this.$message.success(result.msg);
      this.groupSearch();
      this.group.dialogVisible = false;
    },
    // 更新分组
    async groupUpdate() {
      let result = await groupUpdate(this.group.form);
      if (result.code != 1000) return this.$message.warning(result.msg);
      this.$message.success(result.msg);
      this.groupSearch();
      this.group.dialogVisible = false;
    },
    // 打开分组添加弹窗
    groupAddClick() {
      this.group.title = '添加部门';
      this.group.form.group_name = '';
      this.group.form.remark = '';
      this.group.dialogVisible = true;
    },
    // 分类编辑点击
    groupClick(row) {
      let item = row.item;
      let i = row.i;
      if (i == 1) {
        // 编辑
        this.group.form = item;
        this.group.title = '修改部门';
        this.group.dialogVisible = true;
      } else if (i == 2) {
        // 删除
        this.$confirm(
          '删除部门会把该部门下的所有项目移动到回收站，确认要删除该部门吗？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(async () => {
            let result = await groupdel(item.id);
            if (result.code != 1000) return this.$message.warning(result.msg);
            this.$message.success(result.msg);
            this.groupSearch();
          })
          .catch(() => {});
      }
    },
    // -----------------分组结束--------------------------
    //查询项目
    search() {},
    // 修改项目
    async edit(row) {
      let res = await queryProject(row.id);
      this.editProject.data = res.data;
      this.editProject.visible = true;
    },
    handleAddProject(listId) {
      this.addProject.groupId = this.searchForm.group_id;
      this.addProject.listId = listId;
      this.addProject.visible = true;
    },
    handleAddProjectSuccess() {
      this.listSearch();
    },
    resolveImagePath(url) {
      if (!url || url.indexOf('http') === 0) {
        return url;
      }
      return config.baseUrl.replace('/api', '') + '/upload/logo/' + url;
    },
    handleEditProjectSuccess() {
      this.listSearch();
    },
    handleProjectEditClose() {
      this.listSearch();
    }
  }
};
</script>

<style lang="scss" scoped>
// 最外层div
.bodyDiv {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, PingFang SC, Noto Sans, Noto Sans CJK SC, Microsoft YaHei,
    \\5fae\8f6f\96c5\9ed1, sans-serif;
  margin: 20px;
  overflow: auto;
}
.bodyTitle {
  margin-top: 20px;
  margin-left: 20px;
}
// 分类的class
.typeClass {
  float: left;
  // display: inline-block;
  margin-right: 10px;
  margin-top: 5px;
  height: calc(100vh - 195px);
  padding: 15px 15px 0;
  border-radius: 5px;
  // background-color: chocolate;
}
// 项目外框背景的class
.productClass {
  box-shadow: 2px 2px 5px #bbb;
  margin-top: 27px;
  width: 300px;
  height: 100px;
  border-radius: 5px;
  cursor: pointer;
}
// 项目外框背景的class
.productClass:hover {
  box-shadow: 5px 5px 5px #aaa;
}
// 项目按钮
.productbutton {
  box-shadow: 2px 2px 5px #bbb;
  margin-top: 20px;
  width: 300px;
}
//项目体
.productbody {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, PingFang SC, Noto Sans, Noto Sans CJK SC, Microsoft YaHei,
    \\5fae\8f6f\96c5\9ed1, sans-serif;
  font-size: 14px;
  margin: 20px;
  padding-top: 10px;
  color: #262626;
}
// 项目文字
.projectfont {
  margin-top: 5px;
}
// 无边框按扭
.noBroderButton {
  border: none;
  color: #8c8c8c;
}
.listButton {
  border: none;
  width: 100%;
  color: #595959c7;
}
// 任务项目列表头
.listTitle {
  color: #262626;
  font-weight: 900;
}
.listSpot {
  cursor: pointer;
  color: #8c8c8c;
  margin-right: 10px;
}
.listEditSpot {
  color: #8c8c8c;
  font-size: 20px;
  font-weight: 900;
}
.insertColor {
  background-color: #a2ccf757;
}

.task-item {
  cursor: pointer;
  padding-right: 10px;

  .el-col {
    line-height: 36px;
  }
}
.task-item:hover {
  background-color: #a2ccf757;
}
</style>

<style lang="scss">
.list-group {
  .flip-list-move {
    transition: transform 0.5s;
  }
  .ghost {
    opacity: 0.5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .productClass {
    cursor: move;
  }
  .porject-group {
    .ghost {
      background-color: #c8ebfb;
    }
  }
}
</style>