
  <template>
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
                :src="value.project_logo"
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
      <div>
        <el-button class="productbutton" icon="el-icon-plus" @click="handleAddProject(v.id)"></el-button>
      </div>
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
    <!-- 任务项目dialog结束 -->
    <project-add 
      :visible.sync="addProject.visible" 
      :groupId="addProject.groupId" 
      :listId="addProject.listId"
      :groupOptions="groupOptions"
      :listOptions="tableData"
      @submitSuccess="handleAddProjectSuccess"
      width="700px">
    </project-add>
  </div>
</template>

<script>
import ProjectAdd from './ProjectAdd';
import {
  groupSave,
  groupUpdate,
  groupdel,
  groupSearch,
  listSave,
  listUpdate,
  listdel,
  listSearch
} from '../../api/kanban';
export default {
  name: '',
  components: { ProjectAdd },
  mounted() {
    this.groupSearch();
  },
  data() {
    return {
      addProject: {
        visible: false,
        groupId: null,
        listId: null
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
    // -----------------任务列表开始--------------------------
    // 查询任务列表
    async listSearch() {
      let result = await listSearch(this.searchForm.group_id);
      if (result.code != 1000) return this.$message.warning(result.msg);

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
    edit(row) {
      console.log('edit', row);
    },
    handleAddProject(listId) {
      this.addProject.groupId = this.searchForm.group_id;
      this.addProject.listId = listId;
      this.addProject.visible = true;
    },
    handleAddProjectSuccess() {
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