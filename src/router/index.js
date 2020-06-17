import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/index';
import config from '../config';

Vue.use(Router);

let constantRoutesTemp = [];

if (config.dev) {
    constantRoutesTemp = [
        {
            path: '/financial',
            show: true,
            type: 1,
            meta: {
                title: '财务面板',
                icon: 'el-icon-money'
            },
            component: Layout,
            children: [
                {
                    path: '/finanical/overview',
                    show: true,
                    type: 2,
                    meta: {
                        title: '财务总览',
                        icon: ''
                    },
                    component: () => import('@/views/FinanicalOverview/index')
                },
                {
                    path: '/finanical/profit',
                    show: true,
                    type: 2,
                    meta: {
                        title: '财务利润',
                        icon: ''
                    },
                    component: () => import('@/views/FinanicalProfit/index')
                }
            ]
        },
        {
            path: '/income',
            show: true,
            type: 1,
            meta: {
                title: '收入',
                icon: 'el-icon-receiving'
            },
            component: Layout,
            children: [
                {
                    path: '/income/statement',
                    show: true,
                    type: 2,
                    meta: {
                        title: '卖量收入',
                        icon: ''
                    },
                    component: () => import('@/views/income/salesIncome')
                },
                {
                    path: '/income/traffic',
                    show: true,
                    type: 2,
                    meta: {
                        title: '流量主收入',
                        icon: ''
                    },
                    component: () => import('@/views/TrafficRevenue/index')
                }
            ]
        },
        {
            path: '/buyout',
            show: true,
            type: 1,
            meta: {
                title: '支出',
                icon: 'el-icon-monitor'
            },
            component: Layout,
            children: [
                {
                    path: '/buyout/payment',
                    show: true,
                    type: 2,
                    meta: {
                        title: '买量支出',
                        icon: ''
                    },
                    component: () => import('@/views/expenses/index')
                },
                {
                    path: '/buyout/ad',
                    show: true,
                    type: 2,
                    meta: {
                        title: '投放成本',
                        icon: ''
                    },
                    component: () => import('@/views/AdCost/index')
                }
            ]
        },
        {
            path: '/bank',
            show: true,
            type: 1,
            meta: {
                title: '银行流水',
                icon: 'el-icon-tickets'
            },
            component: Layout,
            children: [
                {
                    path: '/bank/bill_list',
                    show: true,
                    type: 2,
                    meta: {
                        title: '银行流水账单',
                        icon: ''
                    },
                    component: () => import('@/views/BankBill/index')
                },
                {
                    path: '/bank/bill_check',
                    show: true,
                    type: 2,
                    meta: {
                        title: '账单审核',
                        icon: ''
                    },
                    component: () => import('@/views/BankBill/Check')
                },
                {
                    path: '/bank/subject',
                    show: true,
                    type: 2,
                    meta: {
                        title: '科目级别',
                        icon: ''
                    },
                    component: () => import('@/views/BankBill/Subject')
                }
            ]
        },
        {
            path: '*',
            redirect: '/finanical/overview'
        }
    ];
}

export const constantRoutes = constantRoutesTemp;

export default new Router({
    routes: constantRoutes,
    mode: "hash"
});