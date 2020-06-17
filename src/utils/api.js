const api = {
    "overview": "/api/statement/overview", // 卖量面板--总览
    "overviewList": "/api/statement/overview-list", // 卖量面板--总览曲线/总览面拌
    "overviewBar": "/api/statement/overview-bar",  // 卖量面板--总览柱状
    "statementPieChart": "/api/statement/statement-pie-chart", // 卖量面板--账单分布图 
    "statementProgress": "/api/statement/statement-progress", // 卖量面板--结算进度
    "statementDeduction": "/api/statement/statement-deduction", // 卖量面板 -- 抵扣款
    "searchDeductDetail": "/api/statement/search-deduct-detail", // 卖量面板 -- 查关联单
    "noStatementList": "/api/statement/no-statement-list", // 卖量面板 -- 未结算
    "statementRanking": "/api/statement/statement-ranking", // 卖量面板 -- 平均回款账期
    "statementReturnMoney": "/api/statement/statement-return-money", // 卖量面板 -- 回款中
    "queryExpressDelivery": "/api/statement/express-delivery-msg", // 获取快递信息接口
    "statementList": "/api/statement/statement-list", // 账单明细接口
    "statementDetails": "/api/statement/statement-detail", // 账单明细--明细
    "statementTop": "/api/statement/top", // 卖量排名

    // 买量面板
    "paymentExpensesProportion": "/api/payment/payment-expenses-proportion", // 支出占比饼图数据接口
    "paymentDeduction": "/api/payment/payment-deduction", // 抵扣款接口
    "searchPaymentDeductDetail": "/api/payment/search-deduct-detail", // 查关联单
    "paymentUnsettlementList": "/api/payment/unsettlement-list", // 未结算
    "paymentPaying": "/api/payment/paying", // 付款中
    "paymentOverview": "/api/payment/overview", // 总览
    "paymentOverviewList": "/api/payment/overview-list", // 成本明细
    "paymentOverviewBar": "/api/payment/overview-bar",  // 总览柱状图
    "paymentBillPieChart": "/api/payment/bill-pie-chart", // 账单分布图
    "paymentTop": "/api/payment/top", // 买量排名
    "paymentBillDetail": "/api/payment/bill-detail", // 账单明细接口
    "paymentDetails": "/api/payment/payment-detail", // 账单明细--明细

    // 流量主收入
    "adincomeConsumerTrend": "/api/adincome/consumer-trend",  // 收入趋势
    "adincomeRanking": "/api/adincome/ranking", // 收入排名
    "adincomeOverview": "/api/adincome/overview", // 总览数据统计
    "adincomeBillList": "/api/adincome/bill-list", // 流量主账单
    "adincomeBillAdd": "/api/adincome/bill-add", // 流量主账单新增
    "adincomeBillInvoice": "/api/adincome/bill-invoice", // 流量主账单开票
    "adincomeBillPayment": "/api/adincome/bill-payment", // 流量主账单收款
    "adincomeBillRemark": "/api/adincome/bill-remark", // 流量主账单修改备注
    "adincomeReissueBillList": "/api/adincome/reissue-bill-list", // 流量主补发账单列表
    "adincomeReissueBillAdd": "/api/adincome/reissue-bill-add", // 流量主补发账单新增
    "adincomeReissueBillInvoice": "/api/adincome/reissue-bill-invoice", // 流量主补发账单开票
    "adincomeReissueBillPayment": "/api/adincome/reissue-bill-payment", // 流量主补发账单收款
    "adincomeReissueBillRemark": "/api/adincome/reissue-bill-remark", // 流量主补发账单修改备注

    // 投放成本
    "adcostConsumerTrend": "/api/adcost/consumer-trend",  // 趋势
    "adcostRanking": "/api/adcost/ranking", // 消耗排名
    "adcostOverview": "/api/adcost/overview", // 总览数据统计
    "adcostDetail": "/api/adcost/detail", // 消费明细

    // 财务总览
    "finanicalOverviewStatistics": "/api/finanical-overview/statistics", // 财务统计
    "finanicalOverviewTrend": "/api/finanical-overview/trend", // 财务走势
    "finanicalOverviewCost": "/api/finanical-overview/cost", // 成本分布图
    "finanicalOverviewIncome": "/api/finanical-overview/income", // 收入分布图
    "finanicalOverviewUncollected": "/api/finanical-overview/uncollected", // 未收付账款
    "finanicalOverviewSubdivisionTrend": "/api/finanical-overview/subdivision-trend", // 财务细分走势

    // 财务利润
    "finanicalProfitProfit": "/api/finanical-profit/profit", // 总利润
    "finanicalProfitDetail": "/api/finanical-profit/detail", // 收付款明细

    // 银行流水账单
    "bankBillList": "/api/bank-bill/list", // 列表
    "bankBillCheckList": "/api/bank-bill/check-list", // 审核列表
    "bankBillUpload": "/api/bank-bill/upload", // 上传csv文件
    "bankBillSubjectTree": "/api/bank-bill/subject-tree", // 科目树形
    "bankBillSubjectAdd": "/api/bank-bill/subject-add", // 添加科目
    "bankBillSubjectDel": "/api/bank-bill/subject-del", // 删除科目
    "bankBillSubjectEdit": "/api/bank-bill/subject-edit", // 编辑科目
    "bankBillCheckPaymentList": "/api/bank-bill/check-payment-list", // 买量未审核列表
    "bankBillCheckStatementList": "/api/bank-bill/check-statement-list", // 卖量未审核列表
    "bankBillCheckPayment": "/api/bank-bill/check-payment", // 买量审核操作
    "bankBillCheckStatement": "/api/bank-bill/check-statement", // 卖量审核操作

    "companyOptions": "/api/options/company-list", // 全部卖量公司列表，用于select做选择
    "sysCompanyOptions": "/api/options/sys-company-list", // 全部买量公司列表，用于select做选择
}
export default api;
