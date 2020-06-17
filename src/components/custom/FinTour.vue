<template>
    <div></div>
</template>

<script>
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import config from '@/config';

export default {
    name: 'FinTour',
    data() {
        return {
            driver: null,
            steps: [
                {
                    element: '.fin-tour-step-0',
                    popover: {
                        title: '开始引导教程',
                        position: 'left'
                    }
                },
                {
                    element: '.fin-tour-step-1',
                    popover: {
                        title: '全屏显示',
                        position: 'left'
                    }
                },
                {
                    element: '.fin-tour-step-2',
                    popover: {
                        title: '展开或者收缩财务系统内部菜单',
                    }
                },
                {
                    element: '.fin-tour-step-3',
                    popover: {
                        title: '财务系统内部菜单',
                        position: 'right'
                    }
                },
                {
                    element: '.fin-tour-step-4',
                    popover: {
                        title: '鼠标经过或者点击可以打开系统菜单,再次点击就可以关闭系统菜单',
                        position: 'right'
                    }
                },
                {
                    element: '.fin-tour-step-5',
                    popover: {
                        title: '对标签栏进行操作，关闭其他标签或者所有标签',
                    }
                },
                {
                    element: '.fin-tour-step-6',
                    popover: {
                        title: '双击空白处，或者点击<i class="el-icon-full-screen"></i>可以放大',
                    }
                }
            ]
        }
    },
    methods: {
        start() {
            this.driver.defineSteps(this.steps);
            this.driver.start();
        },
        onFinish(ele) {
            let user = this.$store.state.user.user;
            if (user.firstLogin) {
                this.$axios({
                    url: '/api/permission/changeLoginStatus',
                    method: 'post'
                }).then(res => {
                    sessionStorage.setItem(config.firstLoginKey + user.id, '1');
                });
            }
        }
    },
    mounted() {
        this.driver = new Driver({
            opacity: 0.5,
            nextBtnText: '下一步',
            prevBtnText: '上一步',
            closeBtnText: '跳过教程',
            doneBtnText: '结束教程',
            allowClose: false,
            onNext: this.onNext,
            onReset: this.onFinish
        });
    }
}
</script>

<style>
</style>