import request from '../utils/request';
//  查询产品数据
export const productSearch = (data) => request({ url: "/procuctPool/productSearch", method: "post", data: data });
//  保存产品数据
export const productSave = (data) => request({ url: "/procuctPool/productSave", method: "post", data: data });
//  更新产品数据
export const productUpdate = (data) => request({ url: "/procuctPool/productUpdate", method: "post", data: data });
// 还原产品
export const productReduction = (data) => request({ url: "/procuctPool/productReduction", method: "post", data: data });
//  删除产品
export const productDelete = (data) => request({ url: "/procuctPool/productDelete", method: "post", data: data });
//  作废产品
export const productCancel = (data) => request({ url: "/procuctPool/productCancel", method: "post", data: data });
// 产品池查询
export const poolSearch = (data) => request({ url: "/procuctPool/poolSearch", method: "post", data: data });
//  游戏题材查询
export const themeSearch = (data) => request({ url: "/procuctPool/themeSearch", method: "post", data: data });
//  游戏进入立项
export const projectApproval = (data) => request({ url: "/procuctPool/projectApproval", method: "post", data: data });