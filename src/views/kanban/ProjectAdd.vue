<template>
    <div class="dialog-body" v-if="visible_" @click="handleWhiteAreaClose">
        <div class="dialog-wrapper" :style="{ width }">
            <div class="dialog-header">
                <div class="dialog-header-title">
                    新增项目
                </div>
                <div class="dialog-header-right">
                    <fl-button-icon icon="el-icon-close" @click.native="handleDialogClose"></fl-button-icon>
                </div>
            </div>
            <div class="fl-divider"></div>
            <div class="dialog-content">
                <fl-input v-model="form.project_name" placeholder="请输入项目名称" :input-style="{ width: '100%', fontSize: '20px', color: '#000000' }"></fl-input>
                <el-form label-width="100px">
                    <el-form-item label="logo：">
                        <el-upload
                            class="logo-uploader"
                            :action="uploadConfig.uploadPath"
                            :show-file-list="false"
                            :headers="uploadConfig.headers"
                            :on-success="handleUploadSuccess">
                            <img v-if="form.project_logo" :src="resolveImagePath(form.project_logo)" class="logo">
                            <i v-else class="el-icon-plus logo-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="启动时间：">
                        <el-date-picker v-model="form.begin_time" type="date" placeholder="选择项目启动时间" value-format="yyyy-MM-DD"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="所属部门：">
                        <el-select v-model="form.group_id">
                            <el-option v-for="item in groupOptions" :index="item.id" :key="item.id" :label="item.group_name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属列表：">
                        <el-select v-model="form.list_id">
                            <el-option v-for="item in listOptions" :index="item.id" :key="item.id" :label="item.list_name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="优先级：">
                        <el-select v-model="form.priority">
                            <el-option
                                v-for="item in priorityOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签：">
                        <el-select v-model="form.tag" multiple placeholder="请选择标签">
                            <el-option v-for="item in tagOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                            @blur="handleInputConfirm"
                            style="width: 100px"
                        ></el-input>
                        <el-button v-else size="mini" @click="showInput">+ 新标签</el-button> -->
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog-footer" align="right">
                <el-button size="small" @click="handleDialogClose">关 闭</el-button>
                <el-button type="primary" size="small" @click="handleSubmit">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import FlButtonIcon from '@/components/custom/FlButtonIcon';
import FlInput from '@/components/custom/FlInput';
import { save } from '@/api/project';
import config from '@/config';
import { getToken } from '@/utils/auth';

export default {
    components: {
        FlButtonIcon,
        FlInput
    },
    props: {
        width: {
            type: String,
            default: '50%'
        },
        title: String,
        groupId: Number,
        listId: Number,
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
            tagOptions: [
                { label: '2D游戏', value: '2D游戏' },
                { label: '3D游戏', value: '3D游戏' }
            ],
            visible_: false,
            form: {
                project_name: '',
                project_logo: null,
                begin_time: null,
                group_id: null,
                list_id: null,
                remark: '',
                priority: 1,
                tag: []
            },
            priorityOptions: [
                { label: '一般', value: 1 },
                { label: '紧急', value: 2 },
                { label: '非常紧急', value: 3 },
            ],
            // tagInputVisible: false,
            // tagInput: '',
            uploadConfig: {
                uploadPath: config.baseUrl + '/upload/logo',
                imagePrefix: config.baseUrl.replace('/api', ''),
                headers: {
                    token: getToken()
                }
            }
        }
    },
    methods: {
        async handleSubmit() {
            if (!this.form.project_name) {
                return this.$message.warning('请输入项目名称');
            }
            let res = await save(this.form);
            this.$message.success(res.msg);
            // 通知父组件
            this.$emit('submitSuccess');
            // 关闭弹框
            this.handleDialogClose();
        },
        // handleClose(tag) {
        //     this.form.tag.splice(this.form.tag.indexOf(tag), 1);
        // },
        // showInput() {
        //     this.tagInputVisible = true;
        //     this.$nextTick(_ => {
        //         this.$refs.saveTagInput.$refs.input.focus();
        //     });
        // },
        // handleInputConfirm() {
        //     let tagInput = this.tagInput;
        //     if (tagInput) {
        //         this.form.tag.push(tagInput);
        //     }
        //     this.tagInputVisible = false;
        //     this.tagInput = '';
        // },
        handleWhiteAreaClose(e) {
            if (e.target === this.$el) {
                this.handleDialogClose();
            }
        },
        handleDialogClose() {
            this.visible_ = false;
            this.$emit('update:visible', false);
        },
        handleUploadSuccess(res) {
            if (res.code === 1000) {
                this.form.project_logo = res.data;
            } else {
                this.$message.error('图片上传失败');
            }
        },
        resolveImagePath(url) {
            if (!url || url.indexOf('http') === 0) {
                return url;
            }
            return this.uploadConfig.imagePrefix + '/upload/logo/' + url;
        }
    },
    watch: {
        groupId(val) {
            this.form.group_id = val;
        },
        listId(val) {
            this.form.list_id = val;
        },
        visible(val) {
            this.visible_ = val;
        }
    }
}
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
            padding: 15px;
        }

        .dialog-footer {
            padding: 15px;
        }
    }
}
.button-new-tag {
    margin-right: 10px;
}

.logo-uploader .el-upload {
    width: 80px;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.logo-uploader .el-upload:hover {
    border-color: #409EFF;
}

.logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
}
.logo {
    width: 80px;
    height: 80px;
    display: block;
}
</style>

<style lang="scss">
.logo-uploader .el-upload--text {
    width: 80px;
    height: 80px;
}
</style>