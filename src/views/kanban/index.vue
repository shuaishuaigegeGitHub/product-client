
  <template>
  <div v-loading="loading">
    <div class="bodyDiv" :style="'width:'+(tableData.length<=2?1400:tableData.length*500)+'px;'">
      <!-- 搜索条件 -->
      <div>
        <el-form label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="项目分组">
                <el-select v-model="searchForm.group_id" placeholder="请选择" @change="listSearch">
                  <el-option
                    v-for="item in groupOptions"
                    :key="item.id"
                    :label="item.group_name"
                    :value="item.id"
                  >
                    {{item.group_name}}
                    <el-dropdown style="float: right;" @command="groupClick">
                      <span class="el-dropdown-link">
                        ...
                        <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="{item:item,i:1}">编辑</el-dropdown-item>
                        <el-dropdown-item :command="{item:item,i:2}">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-option>
                </el-select>
                <el-button style="margin-left:20px" icon="el-icon-plus" @click="groupAddClick"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 搜索条件结束 -->
      <!-- 项目列开始 -->
      <draggable class="list-group" :list="tableData" @change="logList" :disabled="enabled">
        <div class="typeClass" v-for="(v,i) in tableData" :key="i">
          <div>
            {{v.list_name}}
            <el-dropdown style="float: right;" @command="listClick">
              <span>
                ...
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{item:v,i:1}">编辑</el-dropdown-item>
                <el-dropdown-item :command="{item:v,i:2}">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <draggable
            class="list-group"
            :list="v.projectList"
            group="people"
            @change="log"
            :disabled="enabled"
          >
            <div
              class="productClass"
              v-for="(value,index) in v.projectList"
              :key="index"
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
                    <!-- <div style="display:flex;align-items:center;">
                <p style="margin-left:20px;">{{value.project_name}}</p>
                    </div>-->
                    <div class="projectfont">负责人:{{value.create_by}}</div>
                    <div class="projectfont">开始时间:{{value.begin_time}}</div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div @mouseenter="enabledClick(true)" @mouseleave="enabledClick(false)">
              <el-button
                style="-webkit-app-region:no-drag"
                class="productbutton"
                icon="el-icon-plus"
                @click="handleAddProject(v.id)"
              ></el-button>
            </div>
            <div style="height:300px"></div>
          </draggable>
        </div>
      </draggable>
      <div class="typeClass">
        <el-button
          icon="el-icon-plus"
          @click="listAddClick"
          style="border:none;color:#8c8c8c;"
        >新建任务列表</el-button>
      </div>
      <!-- 项目列结束 -->
      <!-- 项目分组dialog开始 -->
      <el-dialog :title="group.title" center :visible.sync="group.dialogVisible" width="30%">
        <el-form ref="groupForm" label-width="80">
          <el-form-item label="任务分组名称">
            <el-input v-model="group.form.group_name" clearable maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="任务分组描述">
            <el-input v-model="group.form.remark" type="textarea" maxlength="500" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="groupSave">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 项目分组dialog结束 -->
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
      <!-- 任务项目dialog开始 -->
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
      <!-- 任务项目dialog结束 -->
      <project-add
        :visible.sync="addProject.visible"
        :groupId="addProject.groupId"
        :listId="addProject.listId"
        :groupOptions="groupOptions"
        :listOptions="tableData"
        @submitSuccess="handleAddProjectSuccess"
        width="700px"
      ></project-add>
    </div>
    <div class="typeClass">
      <el-button icon="el-icon-plus" @click="listAddClick" style="border:none;color:#8c8c8c;">新建任务列表</el-button>
    </div>
    <!-- 项目列结束 -->
    <!-- 项目分组dialog开始 -->
    <el-dialog :title="group.title" center :visible.sync="group.dialogVisible" width="30%">
      <el-form ref="groupForm" label-width="80">
        <el-form-item label="任务分组名称">
          <el-input v-model="group.form.group_name" clearable maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="任务分组描述">
          <el-input v-model="group.form.remark" type="textarea" maxlength="500" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="groupSave">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 项目分组dialog结束 -->
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
    <!-- 任务项目dialog开始 -->
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
    <project-add 
      :visible.sync="addProject.visible" 
      :groupId="addProject.groupId" 
      :listId="addProject.listId"
      :groupOptions="groupOptions"
      :listOptions="tableData"
      @submitSuccess="handleAddProjectSuccess"
      width="700px">
    </project-add>
    <project-edit
      :visible.sync="editProject.visible" 
      :project="editProject.data" 
      :groupOptions="groupOptions"
      :listOptions="tableData"
      :userList="userList"
      @submitSuccess="handleEditProjectSuccess" @close="handleProjectEditClose">
    </project-edit>
  </div>
</template>

<script>
import ProjectAdd from './ProjectAdd';
import ProjectEdit from './ProjectEdit';
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
  updateListPos
} from '../../api/kanban';
import { query as queryProject } from '@/api/project';
import { queryUser } from '@/api/user';

export default {
  name: '',
  components: { ProjectAdd, ProjectEdit, draggable },
  mounted() {
    this.groupSearch();
    queryUser().then(res => {
      this.userList = res.data;
    });
  },
  data() {
    return {
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
        group_id: null
      },
      // 项目组集合
      groupOptions: [],
      // 项目表
      tableData: []
    };
  },
  methods: {
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
      console.log('logList', evt);
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
    // 项目拖拽
    log(evt) {
      console.log('log', evt);
      let { moved, added, removed } = evt;
      if (moved) {
        // 被拖拽的对象
        let row = moved.element;
        // 新数组下标
        let newIndex = moved.newIndex;
        for (let i = 0; i < this.tableData.length; i++) {
          if (
            this.tableData[i].projectList &&
            this.tableData[i].projectList.length > newIndex &&
            this.tableData[i].projectList[newIndex].id == row.id
          ) {
            let item;
            if (newIndex == this.tableData[i].projectList.length - 1) {
              item = this.tableData[i].projectList[newIndex - 1];
              item.pos = item.pos || 0;
              this.tableData[i].projectList[newIndex].pos = item.pos + 1;
            } else {
              item = this.tableData[i].projectList[newIndex + 1];
              item.pos = item.pos || 0;
              this.tableData[i].projectList[newIndex].pos = item.pos;
            }
            this.updatePos(this.tableData[i].projectList[newIndex]);
            return;
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
            this.tableData[i].projectList.length == newIndex
          ) {
            console.log(
              'this.tableData[i].projectList[newIndex - 1]',
              this.tableData[i].projectList[newIndex - 1]
            );
          }
          if (
            this.tableData[i].projectList &&
            newIndex != 0 &&
            this.tableData[i].projectList.length == newIndex &&
            this.tableData[i].projectList[newIndex - 1].id == row.id
          ) {
            newIndex = newIndex - 1;
          }
          if (
            this.tableData[i].projectList &&
            this.tableData[i].projectList.length > newIndex &&
            this.tableData[i].projectList[newIndex].id == row.id
          ) {
            let item;
            if (this.tableData[i].projectList.length == 1) {
              this.tableData[i].projectList[newIndex].list_id = this.tableData[
                i
              ].id;
              this.tableData[i].projectList[newIndex].pos = 0;
            } else if (newIndex == this.tableData[i].projectList.length - 1) {
              item = this.tableData[i].projectList[newIndex - 1];
              item.pos = item.pos || 0;
              this.tableData[i].projectList[newIndex].list_id = item.list_id;
              this.tableData[i].projectList[newIndex].pos = item.pos + 1;
            } else {
              item = this.tableData[i].projectList[newIndex + 1];
              item.pos = item.pos || 0;
              this.tableData[i].projectList[newIndex].list_id = item.list_id;
              this.tableData[i].projectList[newIndex].pos = item.pos;
            }
            this.updatePos(this.tableData[i].projectList[newIndex]);
            return;
          }
        }
        console.log('ffffffff', this.tableData);
        this.listSearch();
      }
    },
    // -----------------任务列表开始--------------------------
    // 查询任务列表
    async listSearch() {
      this.loading = true;
      let result = await listSearch(this.searchForm.group_id);
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
      this.groupOptions = result.data;
      if (!this.searchForm.group_id && this.groupOptions.length > 0) {
        this.searchForm.group_id = this.groupOptions[0].id;
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
      this.group.title = '添加分组';
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
        this.group.title = '修改分组';
        this.group.dialogVisible = true;
      } else if (i == 2) {
        // 删除
        this.$confirm('确认要删除分组吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
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
  margin: 20px;
  overflow: auto;
}
// 分类的class
.typeClass {
  float: left;
  margin-right: 20px;
}
// 项目外框背景的class
.productClass {
  box-shadow: 2px 2px 5px #bbb;
  margin-top: 20px;
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
  font-size: 12px;
  margin: 20px;
  padding-top: 10px;
  color: #262626;
}
// 项目文字
.projectfont {
  margin-top: 5px;
}
</style>