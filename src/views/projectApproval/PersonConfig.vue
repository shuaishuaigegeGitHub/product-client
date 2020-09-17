<template>
  <div class="person-config">
    <el-dialog title="人员配置" :visible.sync="isShow" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="程序">
          <el-select v-model="form.codePerson" multiple placeholder="请选择">
            <el-option
              v-for="item in codeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="美术">
          <el-select v-model="form.artPerson" multiple placeholder="请选择">
            <el-option
              v-for="item in artOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策划">
          <el-select v-model="form.planPerson" multiple placeholder="请选择">
            <el-option
              v-for="item in planOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运营">
          <el-select v-model="form.operatePerson" multiple placeholder="请选择">
            <el-option
              v-for="item in operateOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
import bus from '../../utils/bus';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      isShow: false,
      form: {
        codePerson: [],
        artPerson: [],
        planPerson: [],
        operatePerson: [],
      },
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
  created() {},
  mounted() {
    bus.$on('toggle-person-config-show', (data) => {
      this.isShow = data;
    });
  },
  methods: {
    onSubmit() {
      console.log(this.form);
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

