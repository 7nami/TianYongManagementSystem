import { message } from 'antd'
import Mock from 'mockjs'
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        // 先判断用户名是否存在
        // 判断账号和密码是否对应
        if (username === 'admin' && password === 'admin') {
            return (
                {
                    code: 20000,
                    data: {
                        menu: [
                            {
                                path: '/home',
                                name: 'home',
                                label: '首页',
                                icon: 's-home',
                                url: 'home/index'
                            },
                            {
                                path: '/mall',
                                name: 'mall',
                                label: '商品管理',
                                icon: 'video-play',
                                url: 'mall/index'
                            },
                            {
                                path: '/user',
                                name: 'user',
                                label: '用户管理',
                                icon: 'user',
                                url: 'user/index'
                            },
                            {
                                label: '其他',
                                icon: 'location',
                                children: [
                                    {
                                        path: '/page1',
                                        name: 'page1',
                                        label: '页面1',
                                        icon: 'setting',
                                        url: 'other/pageOne'
                                    },
                                    {
                                        path: '/page2',
                                        name: 'page2',
                                        label: '页面2',
                                        icon: 'setting',
                                        url: 'other/pageTwo'
                                    }
                                ]
                            }
                        ],
                        token: Mock.Random.guid(),
                        message: '获取成功'
                    }
                }
            )
        } else if (username === '1234' && password === '1234') {
            return (
                {
                    code: 20000,
                    data: {
                        menu: [
                            {
                                path: '/',
                                name: 'home',
                                label: '首页',
                                icon: 's-home',
                                url: 'home/index'
                            },
                            {
                                path: '/mall',
                                name: 'mall',
                                label: '商品管理',
                                icon: 'video-play',
                                url: 'mall/index'
                            }
                        ],
                        token: Mock.Random.guid(),
                        message: '获取成功'
                    }
                }
            )
        } else {
            return (
                {
                    code: -999,
                    message: '账号或密码错误'
                }
            )
        }
    }
}