import Mock from 'mockjs'

// 图表数据
let List = []
export default {
    getStatisticalData: () => {
        // Mock.Random.float 产生随机数100到8000之间 保留小数 最大0位 最小0位
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    Apple: Mock.Random.float(100, 8000, 0, 0),
                    Vivo: Mock.Random.float(100, 8000, 0, 0),
                    Oppo: Mock.Random.float(100, 8000, 0, 0),
                    Meizu: Mock.Random.float(100, 8000, 0, 0),
                    Samsung: Mock.Random.float(100, 8000, 0, 0),
                    Xiaomi: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }

        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [
                    {
                        name: "Xiaomi",
                        value: 1999
                    },
                    {
                        name: "Oppo",
                        value: 3999
                    },
                    {
                        name: "Vivo",
                        value: 4999
                    },
                    {
                        name: "Apple",
                        value: 5999
                    },
                    {
                        name: "Meizu",
                        value: 6999
                    },
                    {
                        name: "Samsung",
                        value: 7999
                    }
                ],
                // 柱状图
                userData: [
                    {
                        date: "Mon",
                        new: 5,
                        active: 200
                    }, {
                        date: "Tue",
                        new: 10,
                        active: 300
                    }, {
                        date: "Wed",
                        new: 12,
                        active: 400
                    }, {
                        date: "Thu",
                        new: 60,
                        active: 800
                    }, {
                        date: "Fri",
                        new: 65,
                        active: 550
                    }, {
                        date: "Sat",
                        new: 30,
                        active: 700
                    }, {
                        date: "Sun",
                        new: 35,
                        active: 800
                    }
                ],
                // 折线图
                orderData: {
                    date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    data: List
                },
                tableData: [
                    {
                        name: 'Oppo',
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: 'Vivo',
                        todayBuy: 100,
                        monthBuy: 3500,
                        totalBuy: 12000
                    },
                    {
                        name: 'Apple',
                        todayBuy: 300,
                        monthBuy: 3500,
                        totalBuy: 20000
                    },
                    {
                        name: 'Meizu',
                        todayBuy: 220,
                        monthBuy: 3500,
                        totalBuy: 22222
                    },
                    {
                        name: 'Samsung',
                        todayBuy: 450,
                        monthBuy: 3500,
                        totalBuy: 25500
                    },
                    {
                        name: 'Xiaomi',
                        todayBuy: 300,
                        monthBuy: 3500,
                        totalBuy: 23000
                    },
                ]


            }
        }
    }
}