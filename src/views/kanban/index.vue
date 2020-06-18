
  <template>
  <div class="bodyDiv" :style="'width:'+(tableData.length*500)+'px;'">
    <!-- 搜索条件 -->
    <div>
      <el-form label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目分组">
              <el-select v-model="searchForm.group_id" placeholder="请选择">
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
        v-for="(value,index) in v.children"
        :key="index"
        @click="edit(value)"
      >
        <div class="productbody">
          <div style="display:flex;align-items:center;">
            <img height="30px" width="30px" style="border-radius:50%;" :src="value.img" />
            <p style="margin-left:20px;">{{value.project_name}}</p>
          </div>
          <div>负责人:{{value.create_by}}</div>
          <div>开始时间:{{value.begin_time}}</div>
        </div>
      </div>
      <div>
        <el-button class="productbutton" icon="el-icon-plus"></el-button>
      </div>
    </div>
    <div class="typeClass">
      <el-button icon="el-icon-plus" @click="listAddClick">新建任务列表</el-button>
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
  </div>
</template>

<script>
import {
  groupSave,
  groupUpdate,
  groupdel,
  listSave,
  listUpdate,
  listdel
} from '../../api/kanban';
export default {
  name: '',
  components: {},
  mounted() {},
  data() {
    return {
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
      groupOptions: [
        {
          id: 1,
          group_name: '3d'
        },
        {
          id: 2,
          group_name: '2d'
        }
      ],
      // 项目表
      tableData: [
        {
          list_name: '预启动的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑',
              begin_time: '2020-09-18',
              end_time: '2020-19-19',
              create_by: '林建伟',
              priority: 1
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切',
              begin_time: '2020-09-18',
              end_time: '2020-19-19',
              priority: 1
            }
          ]
        },
        {
          list_name: '研发中的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            }
          ]
        },
        {
          list_name: '运营调优',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '爆破火线'
            }
          ]
        },
        {
          list_name: '预启动的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            }
          ]
        },
        {
          list_name: '预启动的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            }
          ]
        },
        {
          list_name: '预启动的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            }
          ]
        },
        {
          list_name: '预启动的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            }
          ]
        },
        {
          list_name: '预启动的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            }
          ]
        },
        {
          list_name: '预启动的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            }
          ]
        },
        {
          list_name: '预启动的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            }
          ]
        },
        {
          list_name: '预启动的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            }
          ]
        },
        {
          list_name: '预启动的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            }
          ]
        },
        {
          list_name: '预启动的项目',
          children: [
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '深红剑'
            },
            {
              img: 'img/logo.0c2f1fd4.png',
              project_name: '拍飞一切'
            }
          ]
        }
      ]
    };
  },
  methods: {
    // -----------------任务列表开始--------------------------
    // 任务列表保存
    async listSave() {
      if (!this.list.form.list_name) {
        return this.$message.warning('请填写名称');
      }
      if (this.list.form.id) {
        this.listUpdate();
        return;
      }
      this.list.form.group_id = this.searchForm.group_id;
      // let result = await listSave(this.list.form);
      // if (result != 1000) return this.$message.warning(result.msg);
      // this.$message.success(result.msg);
      this.list.dialogVisible = false;
    },
    // 更新任务列表
    async listUpdate() {
      // let result = await listUpdate(this.list.form);
      // if (result != 1000) return this.$message.warning(result.msg);
      // this.$message.success(result.msg);
      this.list.dialogVisible = false;
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
      console.log('listClick(row)', row);
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
          .then(() => {
            // let result = await listdel(item);
            // if (result != 1000) return this.$message.warning(result.msg);
            // this.$message.success(result.msg);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(() => {});
      }
    },
    // -----------------任务列表结束--------------------------
    // -----------------分组开始--------------------------
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
      // let result = await groupSave(this.group.form);
      // if (result != 1000) return this.$message.warning(result.msg);
      // this.$message.success(result.msg);
      this.group.dialogVisible = false;
    },
    // 更新分组
    async groupUpdate() {
      // let result = await groupUpdate(this.group.form);
      // if (result != 1000) return this.$message.warning(result.msg);
      // this.$message.success(result.msg);
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
      console.log('groupClick(row)', row);
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
          .then(() => {
            // let result = await groupdel(item);
            // if (result != 1000) return this.$message.warning(result.msg);
            // this.$message.success(result.msg);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
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
}
</style>