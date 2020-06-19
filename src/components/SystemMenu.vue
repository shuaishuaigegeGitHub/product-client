<template>
    <div class="system-menu" v-if="visible_" @click="handleClose">
        <div class="content">
            <el-menu
                background-color="#344061"
                text-color="#a7afb7"
                active-text-color="#fff"
                @select="handleSelect">
                <el-menu-item v-for="(item, index) in systemMenu" :key="index" :index="item.path">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.menu_name }}</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
import anime from 'animejs';
import config from '../config';
import { getSystemMenu } from '@/api/permission';

export default {
    name: 'SystemMenu',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // 系统菜单
            systemMenu: [],
            visible_: false
        }
    },
    methods: {
        handleSelect(index) {
            if (index) {
                window.open(index, '_blank');
            }
        },
        handleClose(e) {
            if (e.target !== document.querySelector('.system-menu>.content')) {
                this.$emit('update:visible', false);
                anime({
                    targets: '.system-menu>.content',
                    translateX: '-230px',
                    duration: 0
                });
            }
        },
        handleVisible() {
            if (this.visible_) {
                anime({
                    targets: '.system-menu>.content',
                    translateX: '230px',
                    easing: 'linear',
                    duration: 200
                });
            }
        }
    },
    watch: {
        visible(val) {
            this.visible_ = val;
            this.$nextTick(() => {
                this.handleVisible();
            });
        }
    },
    mounted() {
        if (!config.dev) {
            getSystemMenu().then(res => {
                this.systemMenu = res.data.filter(item => item.status == '0');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.system-menu {
    position: fixed;
    width: 100%;
    background-color: #00000033;
    height: calc(100vh - 50px);
    top: 50px;
    z-index: 100;
    
    .content {
        width: 230px;
        background-color: #344061;
        margin-left: -230px;
    }
}
.el-menu {
    border-right: 1px solid #344061;
}
</style>