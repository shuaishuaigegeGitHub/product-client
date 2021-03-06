import { constantRoutes } from '@/router'
import axios from '@/utils/request'
import Layout from '@/views/index';
import config from '@/config';

const permission = {
    state: {
        routes: constantRoutes,
        addRoutes: [],
        // 具有的权限标识：user:list 
        perms: []
    },
    mutations: {
        SET_ROUTES: (state, routes) => {
            state.addRoutes = routes
            state.routes = constantRoutes.concat(routes)
        },
        SET_PERM: (state, perms) => {
            state.perms = perms;
        }
    },
    actions: {
        // 生成路由
        GenerateRoutes({ commit }) {
            return new Promise((resolve, reject) => {
                if (config.dev) {
                    commit('SET_ROUTES', []);
                    resolve([]);
                } else {
                    // 向后端请求路由数据
                    axios({
                        url: '/api/permission/menu',
                        method: 'get'
                    }).then(res => {
                        if (res.data && res.data.length > 0 && res.data[0].perms === 'CAIWU') {
                            let accessedRoutes = filterAsyncRouter(res.data[0].children, true);
                            let defaultPath = getDefaultIndexPath(accessedRoutes);
                            if (defaultPath !== null) {
                                accessedRoutes.push({ path: '*', redirect: defaultPath });
                            }
                            // 获取权限标识
                            let perms = filterPerms(res.data[0].children);
                            commit('SET_ROUTES', accessedRoutes);
                            commit('SET_PERM', perms);
                            resolve(accessedRoutes);
                        } else {
                            resolve([]);
                        }
                    })
                }
            })
        }
    }
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, isFirstLevel = false) {
    return asyncRouterMap.map(route => {
        if (route.menu_type == '1' || route.menu_type == '2') {
            let router = {
                path: route.path,
                show: route.status == '0',
                type: Number(route.menu_type),
                meta: {
                    title: route.menu_name,
                    icon: route.icon
                }
            };
            if (route.component) {
                router.component = loadView(route.component);
                if (isFirstLevel) {
                    // 处理一级菜单
                    router = {
                        path: '/special',
                        show: true,
                        type: 1,
                        meta: {
                            title: '',
                            icon: ''
                        },
                        component: Layout,
                        first: true,
                        children: [
                            router
                        ]
                    };
                }
            } else {
                router.component = Layout;
            }
            if (route.children != null && route.children && route.children.length) {
                router.children = filterAsyncRouter(route.children);
            }
            return router;
        }
    });
}

// 遍历后台传来的路由按钮，转化为权限数组
function filterPerms(asyncRouterMap) {
    let permsArr = [];
    if (asyncRouterMap && asyncRouterMap.length) {
        for (let i = 0; i < asyncRouterMap.length; i++) {
            if (asyncRouterMap[i].perms) {
                permsArr.push(asyncRouterMap[i].perms);
            }
            if (asyncRouterMap[i].children && asyncRouterMap[i].children.length) {
                let childPermsArr = filterPerms(asyncRouterMap[i].children);
                if (childPermsArr && childPermsArr.length) {
                    permsArr.concat(childPermsArr);
                }
            }
        }
    }
    return permsArr;
}

// 获取默认的显示页面
function getDefaultIndexPath(accessedRoutes) {
    if (accessedRoutes instanceof Array && accessedRoutes.length) {
        // 如果是数组并且数组中有元素
        return getDefaultIndexPath(accessedRoutes[0]);
    }
    if (accessedRoutes instanceof Object) {
        if (accessedRoutes.type === 2) {
            // 如果是菜单，那么就返回该path
            return accessedRoutes.path;
        }
        if (accessedRoutes.children && accessedRoutes.children.length) {
            return getDefaultIndexPath(accessedRoutes.children);
        }
    }
    return null;
}

export const loadView = (view) => { // 路由懒加载
    return (resolve) => require([`@/views/${view}`], resolve);
}

export default permission;
