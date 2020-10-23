<template>
  <div class="product-pool">
    <!-- 过滤项 -->
    <div class="header-content">
      <div class="filter-list">
        <div class="project-filter">
          <p>项目状态：</p>
          <el-select v-model="filterValue.projectStatus" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="project-filter">
          <p>游戏类型：</p>
          <el-select v-model="filterValue.projectType" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="project-filter">
          <p>产品分组：</p>
          <el-select v-model="filterValue.projectGroup" placeholder="请选择">
            <el-option
              v-for="item in GroupOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="project-filter">
          <p>立项来源：</p>
          <el-select v-model="filterValue.projectSource" placeholder="请选择">
            <el-option
              v-for="item in sourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="project-filter">
          <p>日期：</p>
          <el-date-picker
            v-model="filterValue.projectDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div style>
          <el-button type="success" @click="filterSearch">检索</el-button>
          <el-button type="primary" style="margin-left: 35px">添加项目</el-button>
        </div>
      </div>
      <div class="add"></div>
    </div>
    <!-- 游戏列表内容 -->
    <div class="product-content">
      <vxe-table
        :border="false"
        :data="tableData"
        highlight-hover-row
        header-align="center"
        height="95%"
        @cell-click="cellClickEvent"
      >
        <vxe-table-column type="seq" width="70" align="center"></vxe-table-column>
        <vxe-table-column title="游戏" width="250">
          <template v-slot:header>
            <div class="first-col-top">游戏</div>
          </template>
          <template v-slot="{ row }">
            <div class="game-info">
              <div class="icon">
                <img :src="row.icon" alt />
              </div>
              <div>
                <p class="game-name">{{ row.product_name | nameFormat }}</p>
                <p class="game-publisher">{{ row.manufacturer_name | publisherFormat }}</p>
              </div>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="provide_name" title="提供者" align="center"></vxe-table-column>
        <vxe-table-column field="source" title="立项来源" align="center">
          <template v-slot="{ row }">
            <span v-if="row.source === 1">直接立项</span>
            <span v-else-if="row.source === 2">微创新</span>
            <span v-else-if="row.source === 3">选品会</span>
            <span v-else>自主设计</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="technology_type" title="技术选型" align="center">
          <template v-slot="{ row }">
            <span v-if="row.technology_type === 1">3D竖屏</span>
            <span v-else-if="row.technology_type === 2">3D横屏</span>
            <span v-else-if="row.technology_type === 3">2D竖屏</span>
            <span v-else>2D横屏</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="priority" title="产品权重" align="center" sortable>
          <template v-slot="{ row }">
            <span
              v-if="row.priority === 1"
              style="font-size: 15px; color: #d9001b; font-weight: 600"
            >S级</span>
            <span
              v-else-if="row.priority === 2"
              style="font-size: 15px; color: #f59a23; font-weight: 600"
            >A级</span>
            <span
              v-else-if="row.priority === 3"
              style="font-size: 15px; color: #70b603; font-weight: 600"
            >B级</span>
            <span v-else style="font-size: 15px; color: #2d95fb; font-weight: 600">C级</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="projectSponsor" title="选品结果" align="center">
          <template v-slot="{ row }">
            <span v-if="row.project_approval_user">{{ row.project_approval_user }} 直接立项</span>
            <span v-else>选品票数：{{ row.poll }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="create_time" title="创建时间" align="center" sortable></vxe-table-column>
        <vxe-table-column title="操作" width="250">
          <template v-slot="{ row }">
            <vxe-button @click="editProject(row)" class="edit">
              <span>编辑</span>
            </vxe-button>
            <vxe-button @click="delProject(row)" class="del">
              <span>删除</span>
            </vxe-button>
            <vxe-button @click="approvalProject(row)" class="approval">
              <span>立项</span>
            </vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="pagination" style="margin-right: 25px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.currentPage"
        :page-sizes="pagination.pageSizeArr"
        :page-size="pagination.pageSize"
        layout="sizes,prev, pager, next"
        :total="pagination.total"
      ></el-pagination>
    </div>
    <!-- 根据id立项产品时，信息填写弹出框 -->
    <el-dialog
      title="产品立项"
      :visible.sync="approvalDialogShow"
      width="30%"
      :before-close="closeApprovalDialog"
    >
      <el-form ref="form" :model="approvalInfo" label-width="140px">
        <el-form-item label="项目负责人">
          <el-select v-model="approvalInfo.leader" placeholder="请选择">
            <el-option
              v-for="item in personnelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策划负责人">
          <el-select v-model="approvalInfo.leader" placeholder="请选择">
            <el-option
              v-for="item in personnelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: flex-end">
          <el-button type="primary" @click="submitApprovalInfo">确定</el-button>
          <el-button @click="closeApprovalDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  productSearch,
  productSave,
  productUpdate,
  productCancel
} from '../../api/productPool';
export default {
  data() {
    return {
      // 项目展示数据列表
      tableData: [
        {
          id: 10001,
          name: '魔法纪录-魔法少女小圆外传',
          icon:
            'https://is2-ssl.mzstatic.com/image/thumb/Purple124/v4/44/9c/5c/449c5c96-f546-7d6e-1afc-bf6366b50d4d/AppIcon-1x_U007emarketing-0-4-85-220.png/180x180bb.png',
          publisher: 'Shanghai Hode Information Technology Co.,Ltd.',
          provider: '朱志鹏',
          projectSource: '直接立项',
          techSelection: '3D横屏',
          productWeight: 1,
          projectSponsor: '凌建风',
          selectionVotes: 0,
          createTime: '2020-10-14'
        },
        {
          id: 10002,
          name: '原神',
          icon:
            'https://is2-ssl.mzstatic.com/image/thumb/Purple124/v4/97/8d/f5/978df5dd-9368-5724-44ac-50453765d087/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-85-220.png/180x180bb.png',
          publisher: 'miHoYo Games',
          provider: '林灵',
          projectSource: '直接立项',
          techSelection: '3D横屏',
          productWeight: 1,
          projectSponsor: '陈文楷',
          selectionVotes: 0,
          createTime: '2020-09-10'
        },
        {
          id: 10003,
          name: '网吧模拟器 - 经营自己的网吧',
          icon:
            'https://is4-ssl.mzstatic.com/image/thumb/Purple124/v4/e2/15/fb/e215fbbd-d456-3211-bfde-710bfff3f18e/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/180x180bb.png',
          publisher: 'Chengdu Pinyou Technology Co.,Ltd.',
          provider: '黄路祺',
          projectSource: '直接立项',
          techSelection: '2D竖屏',
          productWeight: 1,
          projectSponsor: '陈文楷',
          selectionVotes: 0,
          createTime: '2020-08-01'
        },
        {
          id: 10004,
          name: '王者荣耀',
          icon:
            'https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/98/f1/f0/98f1f086-a936-01aa-cbe1-8597fada956f/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-85-220.png/180x180bb.png',
          publisher: 'Shenzhen Tencent Computer Systems Company Limited',
          provider: '林嘉敏',
          projectSource: '微创新',
          techSelection: '2D竖屏',
          productWeight: 1,
          projectSponsor: '',
          selectionVotes: 7,
          createTime: '2020-07-05'
        },
        {
          id: 10005,
          name: '和平精英',
          icon:
            'https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/97/aa/9a/97aa9a86-7af8-8846-cd6f-8411e5e80a66/AppIcon-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-8.png/180x180bb.png',
          publisher: 'Shenzhen Tencent Computer Systems Company Limited',
          provider: '黄路祺',
          projectSource: '选品会',
          techSelection: '3D竖屏',
          productWeight: 2,
          projectSponsor: '',
          selectionVotes: 7,
          createTime: '2020-10-01'
        },
        {
          id: 10006,
          name: '抽个棍棍',
          icon:
            'https://is2-ssl.mzstatic.com/image/thumb/Purple124/v4/45/0a/69/450a69c4-c966-c054-a703-2691f751cc30/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/180x180bb.png',
          publisher: 'Nox',
          provider: '朱志鹏',
          projectSource: '微创新',
          techSelection: '3D竖屏',
          productWeight: 2,
          projectSponsor: '',
          selectionVotes: 6,
          createTime: '2020-09-25'
        },
        {
          id: 10007,
          name: '花花不好惹',
          icon:
            'https://is2-ssl.mzstatic.com/image/thumb/Purple124/v4/8c/f0/1c/8cf01ce5-7f20-8f8e-acef-3ae56aa7b46b/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/180x180bb.png',
          publisher: '叶睿 陈',
          provider: '洪剑达',
          projectSource: '自主设计',
          techSelection: '3D竖屏',
          productWeight: 2,
          projectSponsor: '',
          selectionVotes: 6,
          createTime: '2020-09-21'
        },
        {
          id: 10008,
          name: '万国觉醒 - RoK',
          icon:
            'https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/9b/89/1a/9b891a08-d08d-2bd7-1dda-5638945dfe82/AppIcon-1x_U007emarketing-0-9-85-220.png/180x180bb.png',
          publisher: 'Shanghai Lilith Network Technology Co., Ltd.',
          provider: '林灵',
          projectSource: '微创新',
          techSelection: '3D横屏',
          productWeight: 3,
          projectSponsor: '',
          selectionVotes: 5,
          createTime: '2020-09-19'
        },
        {
          id: 10009,
          name: '六号特工:秘密任务',
          icon:
            'https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/d4/4e/1c/d44e1c78-2715-5b4e-e5a3-e3bb875ba80d/AppIcon-1x_U007emarketing-0-7-0-85-220.png/180x180bb.png',
          publisher: 'Beijing Bit Walking Technology Co., Ltd.',
          provider: '林嘉敏',
          projectSource: '选品会',
          techSelection: '2D横屏',
          productWeight: 3,
          projectSponsor: '',
          selectionVotes: 5,
          createTime: '2020-09-01'
        },
        {
          id: 10010,
          name: '光·遇',
          icon:
            'https://is4-ssl.mzstatic.com/image/thumb/Purple114/v4/d6/4f/2b/d64f2beb-9675-c8a2-4043-b0ff892b9480/AppIcon_Netease-0-0-1x_U007emarketing-0-0-0-4-0-0-85-220.png/180x180bb.png',
          publisher: 'Hangzhou NetEase Leihuo Technology Co., Ltd.',
          provider: '黄路祺',
          projectSource: '选品会',
          techSelection: '3D横屏',
          productWeight: 4,
          projectSponsor: '',
          selectionVotes: 5,
          createTime: '2020-08-01'
        }
      ],
      //   项目状态下拉列表
      statusOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '未立项'
        },
        {
          value: 2,
          label: '已立项'
        }
      ],
      //   游戏类型下拉类表
      typeOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '车类'
        },
        {
          value: 2,
          label: '枪类'
        },
        {
          value: 3,
          label: '球类'
        }
      ],
      //   产品分组下拉列表
      GroupOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '产品一组'
        },
        {
          value: 2,
          label: '产品二组'
        }
      ],
      //   立项来源下拉列表
      sourceOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '直接立项'
        },
        {
          value: 2,
          label: '微创新'
        },
        {
          value: 3,
          label: '选品会'
        },
        {
          value: 4,
          label: '自主设计'
        }
      ],
      //   过滤条件
      filterValue: {
        projectStatus: 1,
        projectType: 0,
        projectGroup: 0,
        projectSource: 0,
        projectDate: []
      },
      //   分页配置信息
      pagination: {
        total: 100,
        pageSize: 10,
        currentPage: 1,
        pageSizeArr: [10, 50, 100]
      },
      approvalDialogShow: false,
      //   产品立项时项目负责人、策划负责人信息
      approvalInfo: {
        projectId: 0,
        leader: '',
        planner: ''
      },
      //   人员列表
      personnelList: [
        {
          value: 1,
          label: '凌建风'
        },
        {
          value: 2,
          label: '陈文楷'
        },
        {
          value: 3,
          label: '曾彬思'
        },
        {
          value: 4,
          label: '徐斌杰'
        }
      ],
      resultData: []
    };
  },
  filters: {
    //   列表中游戏发行厂商名称格式化
    publisherFormat(val) {
      if (val && val.length > 25) {
        return val.slice(0, 20) + '...';
      }
      return val;
    },
    // 列表中游戏名称格式化
    nameFormat(val) {
      if (val && val.length > 9) {
        return val.slice(0, 9) + '...';
      }
      return val;
    }
  },
  mounted() {
    this.filterSearch();
  },
  methods: {
    pageData() {
      this.tableData = [];
      let start = (this.pagination.currentPage - 1) * this.pagination.pageSize;
      start = start > 0 ? start - 1 : start;
      let end = start + this.pagination.pageSize;
      end = end > this.resultData.length ? this.resultData.length : end;

      if (start < this.resultData.length) {
        for (let i = start; i < end; i++) {
          this.tableData.push(this.resultData[i]);
        }
      }
      if (this.tableData && this.tableData.length) {
        this.tableData.forEach(item => {
          if (item.fileList && item.fileList.length) {
            item.fileList.forEach(jt => {
              item.logo = {};
              if (jt.type == 1) {
                item.logo = jt;
                item.icon = jt.path;
              }
            });
          }
        });
      }
      console.log('111', this.tableData);
    },
    //   调整表格每页显示条数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.pageData();
    },
    // 切换表格第几页
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.pageData();
    },
    // 根据筛选条件检索
    async filterSearch() {
      let result = await productSearch(this.filterValue);
      if (result.code != 1000) return this.$message.error(result.msg);
      this.pagination.total = result.data.length;
      this.resultData = result.data;
      console.log('filterSearch', result);
      this.pageData();
    },
    // 根据id编辑该条数据
    editProject(data) {},
    // 根据id删除该条数据
    delProject(data) {
      this.$confirm('此操作将永久删除该游戏数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {});
    },
    // 根据id立项该项目
    approvalProject(data) {
      this.approvalInfo.projectId = data.id;
      this.approvalDialogShow = true;
    },
    // 提交产品立项信息
    submitApprovalInfo() {
      this.approvalDialogShow = false;
    },
    // 关闭产品立项弹出框
    closeApprovalDialog() {
      this.approvalDialogShow = false;
    },
    // 项目列表行点击事件，获取当前行项目数据
    cellClickEvent(rowData) {
      console.log(rowData.row);
    }
  }
};
</script>

<style lang="scss" scoped>
.product-pool {
  .header-content {
    margin: 15px auto;
    .filter-list {
      display: flex;
      margin-left: 25px;
      .project-filter {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
    }
  }
  .product-content {
    width: 95%;
    margin: 20px auto;
    .game-info {
      display: flex;
      .icon {
        margin-right: 10px;
        img {
          width: 45px;
          height: 45px;
          border-radius: 5px;
        }
      }
      .game-name {
        font-size: 14px;
        color: #333333;
      }
      .game-publisher {
        color: #7f7f7f;
        font-size: 11px;
      }
    }
    .edit,
    .del,
    .approval {
      background: rgba(45, 149, 251, 0.7);
      color: white;
      font-size: 16px;
      font-weight: 500;
      color: white;
      &:hover {
        background: rgba(45, 149, 251, 0.92);
      }
    }
    .del {
      background: rgba(225, 22, 25, 0.7);
      &:hover {
        background: rgba(225, 22, 25, 0.92);
      }
    }
    .approval {
      background: rgba(76, 186, 64, 0.7);
      &:hover {
        background: rgba(76, 186, 64, 0.92);
      }
    }
  }
}
</style>
<style>
.product-pool .header-content .el-input--medium .el-input__inner {
  width: 130px;
}
</style>