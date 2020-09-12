import request from '../utils/request';
//  查询产品数据
export const productSearch = (data) => request({ url: "/procuctPool/productSearch", method: "post", data: data });
// 还原产品
export const productReduction = (data) => request({ url: "/procuctPool/productReduction", method: "post", data: data });
//  删除产品
export const productDelete = (data) => request({ url: "/procuctPool/productDelete", method: "post", data: data }); 