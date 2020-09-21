const axios = require('axios');

let session = [
    'BgAA3b5rtw20phFXEfmvIds3iEW2vyQJNyY5sClTtgzm9JY',
    'BgAAeejd1UBx0siUV6Slw0KhqK0apWyaVd2JCthwq47uFyA'       //监测过期时间
    // 'BgAARnsHqfFts56ADEWzFzgfPSCVB1rotwqqaFx2FYpag1I'
];

let gameList = [
    {
        name: '小刀忍者',
        appid: 'wx586d3b188729efb3'
    },
    {
        name: '球球运输队',
        appid: 'wx8f553de6b8e9553b'
    },
    {
        name: '坦克冲突',
        appid: 'wx6369623eed7cdca5a'
    },
    {
        name: '疯狂城市大乱斗',
        appid: 'wxc989a2c8d4c4c360'
    },
    {
        name: '攀岩大师',
        appid: 'wx422342bfb81b0ff4'
    },
    {
        name: '沙漠球球',
        appid: 'wx3fc74cc72434ee0f'
    },
];

let reportStatus = {};

const test = async () => {
    for (let index in gameList) {
        let nextSessionIndex = 0;
        while (1) {
            console.log(gameList[index].name, nextSessionIndex, "*******************");
            try {
                let res = await axios({
                    methods: 'get',
                    url: 'https://game.weixin.qq.com/cgi-bin/gamewxagbdatawap/getnotifymsglist',
                    params: {
                        session_id: session[nextSessionIndex],
                        data: { "offset": "0", "appid": gameList[index].appid, "per_page": 20 }
                    }
                });
                let nowTime = Math.floor((Date.now() - 86400000 * 5) / 1000);
                console.log("当前--------------", gameList[index].name);
                if (res.data.errcode === 0) {
                    let data = res.data.data.notify_msg_list;
                    data = data.filter(item => item.create_time > nowTime);
                    for (let i in data) {
                        if ((/(封禁|违规|警告)/g).test(data[i].title)) {
                            console.log(gameList[index].name, {
                                time: new Date(Number(data[i].create_time) * 1000).toLocaleString(),
                                title: data[i].title,
                                content: data[i].content
                            });
                        }
                    }
                    break;
                } else {
                    console.log(res.data, nextSessionIndex, gameList[index].name, "~~~~~~~~~~~~~~");
                    nextSessionIndex++;
                    if (nextSessionIndex > 1) {
                        break;
                    }
                }
            } catch (err) {
                console.log(err, nextSessionIndex, gameList[index].name, "!!!!!!!!!!!!!!!");
                nextSessionIndex++;
                if (nextSessionIndex > 1) {
                    break;
                }
            }
        }
    }
};


test();