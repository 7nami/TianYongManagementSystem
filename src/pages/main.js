import React from "react";
import { Outlet } from "react-router-dom";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import { useSelector } from "react-redux";


const { Header, Sider, Content } = Layout;

const Main = () => {
    // const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    // 获取展开收起的状态
    const collapsed = useSelector(state => state.tab.isCollapse)
    return (
        <Layout className="main-container">
            <CommonAside collapsed={collapsed}></CommonAside>
            <Layout>
                <CommonHeader collapsed={collapsed}></CommonHeader>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {/* Content
                    <div id="app">
                        <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p>  <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p>  <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p>  <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p>  <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p>
                        <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p> <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p> <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p> <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p> <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p> <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p> <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p> <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p> <p>这是测试段落 1。</p>
                        <p>这是测试段落 2。</p>
                        <p>这是测试段落 3。</p>
                        <p>这是测试段落 4。</p>
                        <p>这是测试段落 5。</p>
                        <p>这是测试段落 6。</p>
                    </div> */}
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    );

}

export default Main;