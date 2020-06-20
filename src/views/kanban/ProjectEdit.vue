<template>
    <div class="dialog-body" v-if="visible_" @click="handleWhiteAreaClose">
        <div class="dialog-wrapper" :style="{ width }">
            <!-- 弹框头部 -->
            <div class="dialog-header">
                <div class="dialog-header-title">
                </div>
                <div class="dialog-header-right">
                    <el-tooltip effect="dark" placement="top" content="转移项目到回收站">
                        <fl-button-icon v-if="!readonly" icon="el-icon-delete" style="margin-right: 10px;" @click.native="handleDelete"></fl-button-icon>
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
                        v-model="form.project_name" placeholder="请输入项目名称" @change="handleChangeProjectName" :readonly="readonly"
                        :input-style="{ width: '100%', fontSize: '20px', color: '#000000' }">
                    </fl-input>
                    <div class="fl-form-item">
                        <div class="label">
                            <i class="el-icon-edit"></i> 启动时间
                        </div>
                        <div class="value">
                            <el-date-picker v-model="form.begin_time" type="date" placeholder="选择项目启动时间" value-format="yyyy-MM-DD" @change="handleChangeBeginTime" :readonly="readonly"></el-date-picker>
                        </div>
                    </div>
                    <div class="fl-form-item">
                        <div class="label">
                            <i class="el-icon-user"></i> 负责人
                        </div>
                        <div class="value">
                            <el-select v-model="principal.user_id" placeholder="请选择负责人" @change="handleChangePrincipal" :disabled="readonly">
                                <el-option
                                    v-for="item in form.memberList"
                                    :key="item.id"
                                    :label="item.username"
                                    :value="item.user_id">
                                    <div style="display: flex">
                                        <el-avatar size="small" style="margin-top: 3px" :src="item.avatar">{{ item.username.substr(0, 1) }}</el-avatar>
                                        <div style="margin-left: 10px">{{ item.username }}</div>
                                    </div>
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="fl-form-item">
                        <div class="label">
                            <i class="el-icon-folder"></i> 所属分组
                        </div>
                        <div class="value">
                            <el-select v-model="form.group_id" @change="handleChangeGroup" :disabled="readonly">
                                <el-option v-for="item in groupOptions" :index="item.id" :key="item.id" :label="item.group_name" :value="item.id"></el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="fl-form-item">
                        <div class="label">
                            <i class="el-icon-folder"></i> 所属列表
                        </div>
                        <div class="value">
                            <el-select v-model="form.list_id" @change="handleChangeList" :disabled="readonly">
                                <el-option v-for="item in listOptions" :index="item.id" :key="item.id" :label="item.list_name" :value="item.id"></el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="fl-form-item">
                        <div class="label">
                            <i class="el-icon-timer"></i> 优先级
                        </div>
                        <div class="value">
                            <el-select v-model="form.priority" @change="handleChangePriority" :disabled="readonly">
                                <el-option
                                    v-for="item in priorityOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="fl-form-item">
                        <div class="label">
                            <i class="el-icon-collection-tag"></i> 标签
                        </div>
                        <div class="value">
                            <el-tag
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
                                style="width: 100px"
                            ></el-input>
                            <el-button v-else-if="!readonly" size="mini" @click="showInput">+ 新标签</el-button>
                        </div>
                    </div>

                    <div class="fl-form-item">
                        <div class="label">
                            <i class="el-icon-document"></i> 备注
                        </div>
                        <div class="value">
                            <el-input type="textarea" v-model="form.remark" @change="handleChangeRemark" :readonly="readonly"></el-input>
                        </div>
                    </div>
                </el-col>
                <!-- 右面板 -->
                <el-col class="dialog-content-right" :span="10">
                    <p>
                        参与者 · {{ form.memberList.length }}
                    </p>
                    <div class="partner">
                        <div v-for="item in form.memberList" :key="item.id">
                            <el-tooltip effect="dark" :content="resolveUsername(item)" placement="top">
                                <el-avatar size="medium" :src="resolveImagePath(item.avatar)">{{ item.username.substr(0, 1) }}</el-avatar>
                            </el-tooltip>
                        </div>
                        <div class="add-partner">
                            <el-tooltip effect="dark" content="添加参与者" placement="top">
                                <el-button v-if="!readonly" type="primary" icon="el-icon-plus" circle @click="addPartnerVisible = true"></el-button>
                            </el-tooltip>
                            <div class="float-card" v-if="addPartnerVisible">
                                <el-select v-model="addPartner" filterable multiple style="width: 100%" placeholder="请选择参与者">
                                    <el-option
                                        v-for="item in noneUserList"
                                        :key="item.user_id"
                                        :label="item.username"
                                        :value="item.user_id">
                                        <div style="display: flex">
                                            <el-avatar size="small" style="margin-top: 3px" :src="item.avatar">{{ item.username.substr(0, 1) }}</el-avatar>
                                            <div style="margin-left: 10px">{{ item.username }}</div>
                                        </div>
                                    </el-option>
                                </el-select>
                                <el-row style="width: 100%; margin-top: 10px">
                                    <el-col style="width: 50%">
                                        <el-button style="width: 95%; margin-top: 10px" @click="addPartnerVisible = false">取 消</el-button>
                                    </el-col>
                                    <el-col style="width: 50%; text-align: right">
                                        <el-button type="primary" style="width: 95%; margin-top: 10px" @click="handleAddPartner">确 定</el-button>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                    <div class="dynamic">
                        <p>项目动态</p>
                        <div class="dynamic-item">
                            <div class="detail"> <i class="el-icon-plus"></i> 徐斌杰 创建了项目 </div>
                            <span class="time">4月30日 16:04</span>
                        </div>
                        <div class="dynamic-item">
                            <div class="detail"> <i class="el-icon-edit"></i> 徐斌杰 修改了项目优先级 </div>
                            <span class="time">4月30日 16:15</span>
                        </div>
                        <div class="dynamic-item">
                            <div class="detail"> <i class="el-icon-edit"></i> 徐斌杰 修改了备注 </div>
                            <span class="time">5月3日 11:00</span>
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
    del,
    updateProjectName,
    updateGroup,
    updatePriority,
    updateList,
    updateRemark,
    updateAddTag,
    updateDelTag,
    updateBeginTime,
    updatePrincipal,
    addMember
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
            principal: {},
            priorityOptions: [
                { label: '一般', value: 1 },
                { label: '紧急', value: 2 },
                { label: '非常紧急', value: 3 },
            ],
            tagInputVisible: false,
            tagInput: '',
            addPartner: [],
            addPartnerVisible: false,
            // 未参与该项目的用户
            noneUserList: [],
            readonly: false
        }
    },
    methods: {
        handleDelete() {
            this.$confirm(`确定把【${this.form.project_name}】转移到回收站？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                del(this.form.id).then(res => {
                    this.$notify({
                        title: '提示',
                        message: `【${this.form.project_name}】已成功转移到回收站！`,
                        type: 'success'
                    });
                    this.handleDialogClose();
                });
            }).catch(() => {});
        },
        async handleAddPartner() {
            if (this.addPartner && this.addPartner.length) {
                let addPartner = this.noneUserList.filter(item => this.addPartner.includes(item.user_id));
                addPartner.forEach(item => item.project_id = this.form.id);
                await addMember(addPartner);
                this.addPartnerVisible = false;
                this.form.memberList = this.form.memberList.concat(addPartner);
            }
        },
        resolveUsername(data) {
            let result = '';
            if (data.role === 'PRINCIPAL') {
                result += '负责人：';
            } else if (data.role === 'PARTNER') {
                result += '参与者：';
            }
            result += data.username;
            return result;
        },
        async handleClose(tag) {
            await updateDelTag({ id: this.form.id, tag: tag });
            this.form.tag.splice(this.form.tag.indexOf(tag), 1);
        },
        showInput() {
            this.tagInputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        async handleInputConfirm() {
            let tagInput = this.tagInput;
            await updateAddTag({ id: this.form.id, tag: tagInput });
            if (tagInput) {
                this.form.tag.push(tagInput);
            }
            this.tagInputVisible = false;
            this.tagInput = '';
        },
        handleWhiteAreaClose(e) {
             if (e.target === this.$el) {
                this.handleDialogClose();
            }
        },
        handleDialogClose() {
            this.visible_ = false;
            this.$emit('update:visible', false);
            this.$emit('close');
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
        },
        async handleChangeRemark(val) {
            await updateRemark({ id: this.form.id, remark: val });
        },
        async handleChangeProjectName(val) {
            await updateProjectName({ id: this.form.id, project_name: val });
        },
        async handleChangeGroup(val) {
            await updateGroup({ id: this.form.id, group: val });
        },
        async handleChangeList(val) {
            await updateList({ id: this.form.id, list: val });
        },
        async handleChangePriority(val) {
            await updatePriority({ id: this.form.id, priority: val });
        },
        async handleChangeBeginTime(val) {
            await updateBeginTime({ id: this.form.id, begin_time: val });
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
        }
    },
    watch: {
        visible(val) {
            this.visible_ = val;
            this.addPartnerVisible = false;
            this.addPartner = [];
        },
        project(val) {
            this.principal = {};
            this.form = val || {};
            if (this.form.begin_time) {
                this.form.begin_time = new Date(this.form.begin_time * 1000);
            }
            if (this.form.memberList) {
                for (let i = 0; i < this.form.memberList.length; i++) {
                    if (this.form.memberList[i].role === 'PRINCIPAL') {
                        this.principal = Object.assign({}, this.form.memberList[i]);
                        let loginUser = this.$store.state.user.user;
                        if (this.principal.user_id === loginUser.uid) {
                            // 如果当前登录的是负责人
                            this.readonly = false;
                        } else {
                            this.readonly = true;
                        }
                        break;
                    }
                }
                let memberIds = this.form.memberList.map(item => item.user_id);
                this.noneUserList = this.userList.filter(item => !memberIds.includes(item.user_id));
            } else {
                this.noneUserList = this.userList;
            }
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

            .dialog-content-left  {
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
                            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
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
                            width: 150px;
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
