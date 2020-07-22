const englishMonthList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
];
const weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
/**
 * 返回月份日期组成的数组
 * year 年份
 * month 月份
 */
export const monthDate = (year, month) => {
    // 返回的结果
    let result = [];
    // 获取月份第一天
    let time = new Date(year, month, 1);
    // 下个月
    let downtime = new Date(year, month + 1, 1);
    downtime.setDate(downtime.getDate() - 1);
    // 本月天数
    let dateNum = downtime.getDate();
    //获取星期几
    let day = time.getDay();
    // 开始日期
    time.setDate(time.getDate() - day);
    // 长度默认5行
    let length = 35;
    if ((dateNum + day) / 7 > 5) {
        length = 42;
    }
    // 将日期放入结果
    for (let i = 0; i < length; i++) {
        result.push({ month: time.getMonth(), date: time.getDate() });
        time.setDate(time.getDate() + 1);
    }

    return result;

};









// const getNewDate = (date) => {
//     let year = date.getFullYear();
//     let month = date.getMonth();
//     let day = date.getDate();
//     return { year, month, day };
// };

// const getDate = (year, month, day) => {
//     return new Date(year, month, day);
// };

// const englishMonth = (month) => {
//     let engMonth;

//     englishMonthList.map(() => {
//         engMonth = englishMonthList[month];
//     });

//     return engMonth;
// };

// const formatDate = (date) => {
//     date = Number(date);
//     return date < 10 ? `0${date}` : date;
// };
// export {
//     getNewDate,
//     getDate,
//     englishMonth,
//     formatDate
// };