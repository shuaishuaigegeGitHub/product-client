<template>
    <div>
        <el-button :type="type" size="mini" @click="handleClick">{{ msg }}</el-button>
        <span class="tip">{{ tip_ }}</span>
        <input :id="id" type="file" :accept="accept" @change="handleFileChange" style="display: none">
    </div>
</template>

<script>
export default {
    name: 'FinUpload',
    props: {
        id: {
            type: String,
            required: true
        },
        tip: {
            type: String,
            default: '未选择任何文件'
        },
        type: {
            type: String,
            default: 'success'
        },
        msg: {
            type: String,
            default: '选择文件'
        },
        accept: String
    },
    data() {
        return {
            tip_: ''
        }
    },
    methods: {
        handleClick() {
            document.getElementById(this.id).click();
        },
        handleFileChange() {
            let file = document.getElementById(this.id).files[0];
            if (file) {
                this.tip_ = file.name;
            }
        }
    },
    created() {
        this.tip_ = this.tip;
    }
}
</script>

<style lang="scss" scoped>
.tip {
    font-size: 12px;
    color: #333333;
    margin-left: 5px;
}
</style>