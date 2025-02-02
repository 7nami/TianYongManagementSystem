import React from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { Button, Layout, Avatar, Dropdown } from 'antd';
// import CommonAside from "../components/commonAside";
import './index.css'
import { useDispatch } from 'react-redux';
import { collapseMenu } from "../../store/reducers/tab";
import { useNavigate } from 'react-router-dom';

// header区域解构出来
const { Header, Sider, Content } = Layout;



const CommonHeader = ({ collapsed }) => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        // window.location.href = '/login'
        navigate('/login')
    }

    // 头像下拉菜单
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" >
                    个人中心
                </a>
            ),
            icon: <UserOutlined />,
        },
        {
            key: '2',
            label: (
                <a onClick={() => logout()} target="_blank" rel="noopener noreferrer" >
                    退出
                </a>
            ),
            icon: <SmileOutlined />,
        }
    ];

    // 创建dispatch
    const dispatch = useDispatch()

    // 定义展开收起按钮的方法
    const setCollapsed = () => {
        console.log(collapsed);
        dispatch(collapseMenu())
    }


    return (
        <Header className='header-container'>
            <Button
                type="text"
                icon={<MenuFoldOutlined />}
                // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                // onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor: 'white',
                }}
                onClick={() => setCollapsed()}
            />
            <Dropdown
                menu={{ items }}
            >
                <Avatar size={36} src={<img src={require("../../assets/images/user.jpg")} />} />

            </Dropdown>

        </Header>
    )
}

export default CommonHeader