import { Col, Row, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import './home.css'
import { getData } from '../../api'
import * as Icon from '@ant-design/icons';
// import * as echarts from 'echarts';
import MyEcharts from '../../components/Echarts'

// table列的数据
const columns = [
    {
        title: "名称",
        dataIndex: "name"
    },
    {
        title: "今日购买",
        dataIndex: "todayBuy"
    },
    {
        title: "本月购买",
        dataIndex: "monthBuy"
    },
    {
        title: "总购买",
        dataIndex: "totalBuy"
    }]

// 订单统计的数据
const countData = [
    {
        "name": "今日支付订单",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "今日收藏订单",
        "value": 333,
        "icon": "ClockCircleOutlined",
        "color": "#ffb988"
    },
    {
        "name": "今日未支付订单",
        "value": 1234,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    },
    {
        "name": "本月支付订单",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "本月收藏订单",
        "value": 1333,
        "icon": "ClockCircleOutlined",
        "color": "#ffb988"
    },
    {
        "name": "本月未支付订单",
        "value": 1234,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    }
]

// 动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])


function Home() {
    const userImg = require("../../assets/images/user.jpg")
    // 创建echart响应数据
    const [echartData, setEchartData] = useState({})
    // dom首次渲染完成
    useEffect(() => {
        getData().then(({ data }) => {
            console.log("Raw data from API:", data.data);

            const { tableData, orderData, userData, videoData } = data.data;
            setTableData(tableData);

            // 打印 userData 和 videoData
            console.log("userData:", userData);
            console.log("videoData:", videoData);

            // 对于echarts数据的组装
            const order = orderData
            // x轴的数据
            const xData = order.date
            // series数据组装
            const keyArray = Object.keys(order.data[0])
            console.log(keyArray, '我是keyArray（这是order.data[0]的key）');

            const series = [];
            keyArray.forEach(key => {
                series.push({
                    name: key,
                    data: order.data.map(item => item[key]),
                    type: 'line'
                })
            })
            setEchartData({
                order: {
                    xData,
                    series
                },
                user: {
                    xData: userData.map(item => item.date),
                    series: [
                        {
                            name: "新增用户",
                            data: userData.map(item => item.new),
                            type: "bar"
                        },
                        {
                            name: "活跃用户",
                            data: userData.map(item => item.active),
                            type: "bar"
                        }
                    ]
                },
                video: {
                    series: [
                        {
                            // data:videoData.map(item=>item.value),
                            data: videoData,
                            type: 'pie'
                        }
                    ]
                }

            })
        })

    }, [])

    // 定义table数据
    const [tableData, setTableData] = useState([])
    console.log(tableData, '我是tableData');


    return (
        <Row className='home' >
            <Col span={8}>
                <Card hoverable>
                    <div className='user'>
                        <img src={userImg} alt="" />
                        <div className='userInfo'>
                            <p className='name'>Admin</p>
                            <p className='access'>超级管理员</p>
                        </div>
                    </div>
                    <div className='login-info'>
                        <p>上次登录时间：<span>2025年1月19日</span></p>
                        <p>上次登陆地点：<span>未知</span></p>
                    </div>
                </Card>
                <Card>
                    <Table rowKey={"name"} pagination={false} columns={columns} dataSource={tableData}>

                    </Table>
                </Card>
            </Col>
            <Col span={16}>
                <div className='num'>
                    {
                        countData.map((item, index) => {
                            return (
                                <Card key={index} hoverable>
                                    <div className='icon-box' style={{ backgroundColor: item.color }}>
                                        {iconToElement(item.icon)}
                                    </div>
                                    <div className='detail'>
                                        <p className='num'>{item.value}</p>
                                        <p className='txt'>{item.name}</p>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
                <Card>
                    {echartData.order
                        ? <MyEcharts chartData={echartData.order} style={{ height: '280px' }} />
                        : null}
                </Card>
                <Card>
                    <div className='graph'>
                        {echartData.user && <MyEcharts chartData={echartData.user} style={{ height: '240px', width: '50%' }} />},
                        {echartData.video && <MyEcharts isAxisChart={false} chartData={echartData.video} style={{ height: '240px', width: '50%' }} />},
                    </div>
                </Card>
            </Col>
        </Row>
    )
}

export default Home