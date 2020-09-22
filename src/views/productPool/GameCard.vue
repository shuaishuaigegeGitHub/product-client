<template>
  <div class="game-card">
    <div class="single-member effect-1">
      <div class="member-image">
        <img :src="logo" alt="Member" width="140px" height="140px" @dblclick="editGame(data.id)" />
      </div>
      <div class="product-type">
        <img
          src="../../../public/img/2D.png"
          v-if="data.technology_type==3 || data.technology_type==4"
        />
        <img src="../../../public/img/3D.png" v-else />
      </div>
      <div class="member-info">
        <h3>{{data.product_name}}</h3>
        <h5>{{data.provide_name}}</h5>
        <div class="detail-p">{{data.game_description |crossWord}}</div>
        <div class="social-touch">
          <div class="fb-touch" @click="editGame(data.id)">
            <i class="el-icon-edit" style="color:white;"></i>
          </div>
          <div class="tweet-touch" @click="reportProject">
            <i class="icon iconfont icon-yitishangbao" style="color:white;font-size:19px;"></i>
          </div>
          <div class="linkedin-touch" @click="delGameById(data.id)">
            <i class="el-icon-delete" style="color:white;"></i>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="产品立项" :visible.sync="isShowReport" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="项目负责人">
          <el-select v-model="form.manage_id" placeholder="请选择">
            <el-option
              :label="item.username"
              :value="item.user_id"
              v-for="(item,index) in userList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策划负责人">
          <el-select v-model="form.plan_id" placeholder="请选择">
            <el-option
              :label="item.username"
              :value="item.user_id"
              v-for="(item,index) in userList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="isShowReport = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import bus from '../../utils/bus';
import { queryUser } from '../../api/user';
import {
  productCancel,
  projectApproval,
  themeUpdate,
} from '../../api/productPool';
import { deepClone } from '../../utils/tools';
export default {
  props: ['data'],
  data() {
    return {
      logo:
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=179057337,2765188365&fm=26&gp=0.jpg',
      userList: [],
      form: {
        manage_id: '',
        plan_id: '',
      },
      isShowReport: false,
    };
  },
  filters: {
    crossWord(val) {
      val = val ? val : '';
      if (val.length > 33) {
        return val.slice(0, 33) + '【详情】';
      }
      return val;
    },
  },
  async created() {
    if (this.data && this.data.fileList && this.data.fileList.length) {
      let res = this.data.fileList.filter((item) => item.type == 1);
      res = res.length ? res[0].path : '';
      if (res) {
        this.logo = res;
      }
    }
    let res = await queryUser();
    if (res.code === 1000) {
      this.$store.commit('productPool/SET_USER_LIST', deepClone(res.data));
      this.userList = deepClone(res.data);
    }
  },
  mounted() {},
  methods: {
    // 通过id将项目移入回收站
    delGameById(id) {
      this.$confirm('数据将被放入回收站, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let res = await productCancel({ id });
          if (res.code === 1000) {
            this.$message({
              type: 'success',
              message: res.msg,
            });
            bus.$emit('init_data');
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
            });
          }
        })
        .catch(() => {});
    },
    // 编辑选中项目
    editGame(id) {
      bus.$emit('show_edit', id);
    },
    //选中的产品立项处理
    async reportProject() {
      this.isShowReport = true;
    },
    handleClose() {
      this.isShowReport = false;
    },
    onSubmit() {
      let manage_name = this.userList.filter(
        (item) => item.user_id == this.form.manage_id
      )[0].manage_name;
      let plan_manage_name = this.userList.filter(
        (item) => item.user_id == this.form.plan_id
      )[0].plan_manage_name;
      this.$confirm(
        '此操作将选择产品进行立项管理，是否继续?',
        `【${this.data.product_name}】`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          let res = await projectApproval({
            id: this.data.id,
            product_name: this.data.product_name,
            priority: this.data.priority,
            status: this.data.source > 2 ? 2 : 1,
            manage_id: this.form.manage_id,
            plan_manage_id: this.form.plan_id,
            manage_name,
            plan_manage_name,
          });
          if (res.code === 1000) {
            this.$message({
              type: 'success',
              message: res.msg,
            });
            this.isShowReport = false;
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
            });
          }
        })
        .catch(() => {});
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.game-card .single-member {
  width: 250px;
  float: left;
  margin: 30px 10px;
  background-color: #a1dbef;
  text-align: center;
  position: relative;
  margin-top: 50px;
}
.game-card .member-image img {
  max-width: 100%;
  vertical-align: middle;
}
.game-card .product-type {
  position: absolute;
  top: -12px;
  left: 224px;
  /* transform: rotate(30deg); */
}
.game-card .product-type img {
  width: 32px;
  height: 45px;
  /* border-radius: 30%; */
}
.game-card h3 {
  font-size: 24px;
  font-weight: normal;
  margin: 10px 0 0;
  text-transform: uppercase;
}
.game-card h5 {
  font-size: 13px;
  font-weight: 350;
  margin: 0 0 5px;
  line-height: 22px;
}
.game-card .detail-p {
  font-size: 14px;
  font-weight: 300;
  line-height: 22px;
  padding: 0 30px;
  margin-bottom: 10px;
  width: 250px;
  height: 88px;
  text-align: left;
  text-indent: 10px;
}
.game-card .social-touch div {
  display: inline-block;
  width: 27px;
  height: 26px;
  vertical-align: middle;
  margin: 0 2px;
  /* background-image: url(./images/social-icons.png); */
  background-repeat: no-repeat;
  opacity: 0.7;
  transition: 0.3s;
}
.game-card .social-touch div:hover {
  opacity: 1;
  transition: 0.3s;
  cursor: pointer;
}
.game-card .fb-touch {
  background-position: 0 0;
}
.game-card .tweet-touch {
  background-position: -35px 0;
}
.game-card .linkedin-touch {
  background-position: -71px 0;
}
.game-card .icon-colored .fb-touch {
  background-position: 0 -27px;
}
.game-card .icon-colored .tweet-touch {
  background-position: -35px -27px;
}
.game-card .icon-colored .linkedin-touch {
  background-position: -71px -27px;
}

.game-card .effect-1 {
  border-radius: 10px 10px 0 0;
  padding-bottom: 21px;
}
.game-card .effect-1 .member-image {
  border: 2px solid white;
  border-radius: 60px 0;
  display: inline-block;
  margin-top: -52px;
  overflow: hidden;
  transition: 0.3s;
  margin-left: -10px;
  transform: rotate(5deg);
}
.game-card .effect-1 .social-touch {
  background-color: #e13157;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 5px;
  overflow: hidden;
  padding: 5px 0 0;
  width: 100%;
  transition: 0.3s;
}
.game-card .effect-1 .member-image img {
  transition: 0.3s;
  border-radius: 60px 0;
}
.game-card .effect-1:hover .member-image {
  border-color: #e13157;
  transition: 0.3s;
  border-radius: 50%;
}
.game-card .effect-1:hover .social-touch {
  padding: 6px 0;
  height: 38px;
  transition: 0.3s;
}
</style>

