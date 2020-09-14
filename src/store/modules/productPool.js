import Cookies from 'js-cookie';

const state = {
    // 是否展示回收站页面
    showDialogTrash: false,
    // 项目列表
    gameList: [
        {
            id: 1,
            name: '沙漠球球',
            date: '2020.09.05',
            detail:
                '《沙漠球球》是一款超休闲的游戏，在沙漠里寻找小球，快来滑动你的手指，引导小球装车。',
            logo: 'http://www.fenglinghudong.com/img/ball.05fb0ac0.png',
        },
        {
            id: 2,
            name: '子弹行动',
            date: '2020.08.05',
            detail:
                '《子弹行动》是一款枪类射击游戏，玩家需要操作一名特工完成行动，通过有限的子弹，消灭场景下的所有敌人，快来一起体验吧。',
            logo: 'http://www.fenglinghudong.com/img/zidan.293b93f2.png',
        },
        {
            id: 3,
            name: '超级坦克王',
            date: '2020.07.05',
            detail:
                '《超级坦克王》是一款对战类游戏，一人一发炮弹，各种炫酷的技能，远距离炮轰，靠的就是你的预判，你敢挑战吗？',
            logo: 'http://www.fenglinghudong.com/img/tank.94f27dee.png',
        },
        {
            id: 4,
            name: '枪王射击',
            date: '2020.06.05',
            detail:
                '《枪王射击》是一款射击类游戏，重重关卡，层层危机，枪枪爆头，开启吃鸡模式，快来展现你的火力。',
            logo: 'http://www.fenglinghudong.com/img/gun.8a72156b.png',
        },
        {
            id: 5,
            name: '子弹行动',
            date: '2020.08.05',
            detail:
                '《子弹行动》是一款枪类射击游戏，玩家需要操作一名特工完成行动，通过有限的子弹，消灭场景下的所有敌人，快来一起体验吧。',
            logo: 'http://www.fenglinghudong.com/img/zidan.293b93f2.png',
        },
        {
            id: 6,
            name: '超级坦克王',
            date: '2020.07.05',
            detail:
                '《超级坦克王》是一款对战类游戏，一人一发炮弹，各种炫酷的技能，远距离炮轰，靠的就是你的预判，你敢挑战吗？',
            logo: 'http://www.fenglinghudong.com/img/tank.94f27dee.png',
        },
        {
            id: 7,
            name: '枪王射击',
            date: '2020.06.05',
            detail:
                '《枪王射击》是一款射击类游戏，重重关卡，层层危机，枪枪爆头，开启吃鸡模式，快来展现你的火力。',
            logo: 'http://www.fenglinghudong.com/img/gun.8a72156b.png',
        },
        {
            id: 8,
            name: '枪王射击',
            date: '2020.06.05',
            detail:
                '《枪王射击》是一款射击类游戏，重重关卡，层层危机，枪枪爆头，开启吃鸡模式，快来展现你的火力。',
            logo: 'http://www.fenglinghudong.com/img/gun.8a72156b.png',
        },
        {
            id: 9,
            name: '子弹行动',
            date: '2020.08.05',
            detail:
                '《子弹行动》是一款枪类射击游戏，玩家需要操作一名特工完成行动，通过有限的子弹，消灭场景下的所有敌人，快来一起体验吧。',
            logo: 'http://www.fenglinghudong.com/img/zidan.293b93f2.png',
        },
        {
            id: 10,
            name: '超级坦克王',
            date: '2020.07.05',
            detail:
                '《超级坦克王》是一款对战类游戏，一人一发炮弹，各种炫酷的技能，远距离炮轰，靠的就是你的预判，你敢挑战吗？',
            logo: 'http://www.fenglinghudong.com/img/tank.94f27dee.png',
        },
    ],
    // 回收站项目列表
    trashGameList: [
        {
            id: 11,
            name: '小刀忍者',
            date: '2020.09.05',
            detail:
                '《小刀忍者》是一款超休闲的游戏，在沙漠里寻找小球，快来滑动你的手指，引导小球装车。',
            logo: 'http://www.fenglinghudong.com/img/ball.05fb0ac0.png',
        },
        {
            id: 12,
            name: '我的潜艇',
            date: '2020.08.05',
            detail:
                '《我的潜艇》是一款枪类射击游戏，玩家需要操作一名特工完成行动，通过有限的子弹，消灭场景下的所有敌人，快来一起体验吧。',
            logo: 'http://www.fenglinghudong.com/img/zidan.293b93f2.png',
        },
    ],
    // 是否展示添加页面
    showdialogAdd: false,
    // 时间轴日期列表
    dateList: [
        {
            isActived: true,
            value: '2020-09',
        },
        {
            isActived: false,
            value: '2020-08',
        },
        {
            isActived: false,
            value: '2020-07',
        },
        {
            isActived: false,
            value: '2020-06',
        },
        {
            isActived: false,
            value: '2020-05',
        },
        {
            isActived: false,
            value: '2020-04',
        },
        {
            isActived: false,
            value: '2020-03',
        },
    ],
    // 筛选列表
    filterList: [
        {
            name: '项目类型',
            cond: [
                {
                    id: 1,
                    filterName: '超轻度',
                },
                {
                    id: 2,
                    filterName: '轻度',
                },
                {
                    id: 3,
                    filterName: '中度',
                },
                {
                    id: 4,
                    filterName: '重度',
                },
            ],
            value: 0,
        },
        {
            name: '技术选型',
            cond: [
                {
                    id: 1,
                    filterName: '3D竖屏',
                },
                {
                    id: 2,
                    filterName: '3D横屏',
                },
                {
                    id: 3,
                    filterName: '2D竖屏',
                },
                {
                    id: 4,
                    filterName: '2D横屏',
                },
            ],
            value: 0,
        },
        {
            name: '立项来源',
            cond: [
                {
                    id: 1,
                    filterName: '直接立项',
                },
                {
                    id: 2,
                    filterName: '微创新',
                },
                {
                    id: 3,
                    filterName: '选品会',
                },
                {
                    id: 4,
                    filterName: '自主设计',
                },
            ],
            value: 0,
        },
        {
            name: '游戏题材',
            cond: [
                {
                    id: 1,
                    filterName: '车类',
                },
                {
                    id: 2,
                    filterName: '枪类',
                },
                {
                    id: 3,
                    filterName: '球类',
                },
                {
                    id: 4,
                    filterName: '其他类',
                },
            ],
            value: 0,
        },
        {
            name: '首选平台',
            cond: [
                {
                    id: 1,
                    filterName: '微信',
                },
                {
                    id: 2,
                    filterName: 'OPPO',
                },
                {
                    id: 3,
                    filterName: '头条',
                },
                {
                    id: 4,
                    filterName: 'QQ',
                },
            ],
            value: 0,
        },
        {
            name: '分组',
            cond: [
                {
                    id: 1,
                    filterName: '2D一组',
                },
                {
                    id: 2,
                    filterName: '2D二组',
                },
                {
                    id: 3,
                    filterName: '3D一组',
                },
                {
                    id: 4,
                    filterName: '3D二组',
                },
            ],
            value: 0,
        },
    ],
    // 选中项目id
    selectedId: 0
};

const mutations = {
    // 切换是否打开垃圾篓
    TRASH_STASTUS: (state, value) => {
        state.showDialogTrash = value;
    },
    // 切换是否打开项目页面
    ADD_STASTUS: (state, value) => {
        state.showdialogAdd = value;
    },
    // 更新时间轴日期列表
    FRESH_DATE_LIST: (state, value) => {
        state.dateList = value;
    },
    // 设置选中项目ID
    SET_GAME_ID: (state, value) => {
        state.selectedId = value;
    },
    // 更新项目列表
    SET_GAME_LIST: (state, value) => {
        state.gameList = value;
    },
};

const actions = {
    // 切换是否打开垃圾篓
    toggleTrashState({ commit }) {
        commit('TRASH_STASTUS');
    },
    // 切换是否打开项目页面
    toggleAddState({ commit }) {
        commit('ADD_STASTUS');
    },
    // 更新时间轴日期列表
    refreshDateList({ commit }) {
        commit('FRESH_DATE_LIST');
    },
    // 设置选中项目ID
    setGameId({ commit }) {
        commit('SET_GAME_ID');
    },
    // 更新项目列表
    setGameList({ commit }) {
        commit('SET_GAME_LIST');
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
