<template>
  <div class="person-config">
    <el-dialog title="人员配置" :visible.sync="isShow" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="主程">
          <el-select v-model="form.mainCodeperson" clearable placeholder="请选择">
            <el-option
              v-for="item in codeOptions"
              :key="item.user_id"
              :label="item.username"
              :value="item.user_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="程序">
          <el-select v-model="form.codePerson" multiple placeholder="请选择">
            <el-option
              v-for="item in codeOptions"
              :key="item.user_id"
              :label="item.username"
              :value="item.user_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="美术">
          <el-select v-model="form.artPerson" multiple placeholder="请选择">
            <el-option
              v-for="item in artOptions"
              :key="item.user_id"
              :label="item.username"
              :value="item.user_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策划">
          <el-select v-model="form.planPerson" multiple placeholder="请选择">
            <el-option
              v-for="item in planOptions"
              :key="item.user_id"
              :label="item.username"
              :value="item.user_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运营">
          <el-select v-model="form.operatePerson" multiple placeholder="请选择">
            <el-option
              v-for="item in operateOptions"
              :key="item.user_id"
              :label="item.username"
              :value="item.user_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { deepClone } from '../../utils/tools';
import { savePerson } from '../../api/projectApproval';
import { queryUser } from '../../api/user';
import bus from '../../utils/bus';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      isShow: false,
      form: {
        mainCodeperson: [],
        codePerson: [],
        artPerson: [],
        planPerson: [],
        operatePerson: [],
      },
      productData: [],
      //   程序人员列表
      codeOptions: [
        {
          id: 1,
          name: '曾煜',
        },
        {
          id: 2,
          name: '林龙方',
        },
        {
          id: 3,
          name: '严若鹏',
        },
        {
          id: 4,
          name: '甘代诗',
        },
      ],
      //   美术人员列表
      artOptions: [
        {
          id: 1,
          name: '刘巧清',
        },
        {
          id: 2,
          name: '李丽珠',
        },
        {
          id: 3,
          name: '邓静雯',
        },
        {
          id: 4,
          name: '马晨',
        },
      ],
      //   策划人员列表
      planOptions: [
        {
          id: 1,
          name: '洪剑达',
        },
        {
          id: 2,
          name: '黄路祺',
        },
        {
          id: 3,
          name: '林嘉敏',
        },
        {
          id: 4,
          name: '林灵',
        },
      ],
      //   运营人员列表
      operateOptions: [
        {
          id: 1,
          name: '郑为满',
        },
        {
          id: 2,
          name: '范楚婷',
        },
        {
          id: 3,
          name: '陈文楷',
        },
        {
          id: 4,
          name: '郑宇航',
        },
        {
          id: 5,
          name: '杨少杰',
        },
      ],
    };
  },
  async created() {
    if (this.$store.state.productPool.userList.length) {
      this.codeOptions = deepClone(this.$store.state.productPool.userList);
      this.artOptions = deepClone(this.$store.state.productPool.userList);
      this.planOptions = deepClone(this.$store.state.productPool.userList);
      this.operateOptions = deepClone(this.$store.state.productPool.userList);
    } else {
      let res = await queryUser();
      if (res.code === 1000) {
        this.$store.commit('productPool/SET_USER_LIST', deepClone(res.data));
        this.codeOptions = deepClone(res.data);
        this.artOptions = deepClone(res.data);
        this.planOptions = deepClone(res.data);
        this.operateOptions = deepClone(res.data);
      }
    }
  },
  mounted() {
    bus.$on('toggle-person-config-show', (data) => {
      this.isShow = data[0];
      this.productData = data[1];
      this.form.codePerson = this.productData.codePerson.map(
        (item) => item.user_id
      );
      this.form.artPerson = this.productData.artPerson.map(
        (item) => item.user_id
      );
      this.form.planPerson = this.productData.planPerson.map(
        (item) => item.user_id
      );
      this.form.operatePerson = this.productData.operatePerson.map(
        (item) => item.user_id
      );
    });
  },
  methods: {
    async onSubmit() {
      let codePerson = this.codeOptions
        .filter((item) => this.form.codePerson.includes(item.user_id))
        .map((item) => ({ user_id: item.user_id, user_name: item.username }));
      let artPerson = this.artOptions
        .filter((item) => this.form.artPerson.includes(item.user_id))
        .map((item) => ({ user_id: item.user_id, user_name: item.username }));
      let planPerson = this.planOptions
        .filter((item) => this.form.planPerson.includes(item.user_id))
        .map((item) => ({ user_id: item.user_id, user_name: item.username }));
      let operatePerson = this.operateOptions
        .filter((item) => this.form.operatePerson.includes(item.user_id))
        .map((item) => ({ user_id: item.user_id, user_name: item.username }));
      console.log(artPerson, codePerson, planPerson, operatePerson);
      let res = await savePerson({
        id: this.productData.id,
        artPerson,
        codePerson,
        planPerson,
        operatePerson,
      });
      if (res.code === 1000) {
        this.$message({
          type: 'success',
          message: res.msg,
        });
        this.isShow = false;
        bus.$emit('init-person-list');
      }
    },
    handleClose() {
      this.isShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.person-config {
}
</style>

