import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/index';
import config from '../config';

Vue.use(Router);

let constantRoutesTemp = [
    {
        path: '/taskpanel',
        show: false,
        type: 1,
        meta: {
            title: '任务管理',
        },
        component: Layout,
        children: [
            {
                path: '/task/:projectId',
                show: false,
                type: 2,
                meta: {
                    title: '任务清单',
                    icon: ''
                },
                component: () => import('@/views/task/index')
            },
            {
                path: '/fileManage/:projectId',
                show: false,
                type: 2,
                meta: {
                    title: '项目云盘',
                    icon: ''
                },
                component: () => import('@/views/fileManage/index')
            },
            {
                path: '/followUp/:projectId',
                show: false,
                type: 2,
                meta: {
                    title: '排期表',
                    icon: ''
                },
                component: () => import('@/views/kanban/ProjectfollowUp')
            },
            {
                path: '/scheduling/:projectId',
                show: false,
                type: 2,
                meta: {
                    title: '项目排期',
                    icon: ''
                },
                component: () => import('@/views/kanban/scheduling')
            }
        ]
    }
];

if (config.dev) {
    constantRoutesTemp = [
        {
            path: '/financial',
            show: true,
            type: 1,
            meta: {
                title: '产品项目管理',
                icon: 'el-icon-money'
            },
            component: Layout,
            children: [

                {
                    path: '/kanban/index',
                    show: true,
                    type: 2,
                    meta: {
                        title: '看板',
                        icon: ''
                    },
                    component: () => import('@/views/kanban/index')
                },

            ]
        },

        {
            path: '*',
            redirect: '/ProjectOverview'
        }
    ];
}

export const constantRoutes = constantRoutesTemp;

export default new Router({
    routes: constantRoutes,
    mode: "hash"
});