import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/index';
import config from '../config';

Vue.use(Router);

let constantRoutesTemp = [
    {
        path: '/taskpanel',
        show: true,
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
                    title: '项目',
                    icon: ''
                },
                component: () => import('@/views/task/index')
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
                    path: '/ProjectOverview',
                    show: true,
                    type: 2,
                    meta: {
                        title: '主页',
                        icon: ''
                    },
                    component: () => import('@/views/ProjectOverview/index')
                },
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