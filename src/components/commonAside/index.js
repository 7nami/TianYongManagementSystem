import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import * as Icon from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import MenuConfig from "../../config"
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

// 动态获取icon
const iconToElement = (name) => React.createElement(Icon[name])

// 处理菜单数据
const items = MenuConfig.map((icon) => {
    // 没有子菜单
    const child = {
        key: icon.path,
        icon: iconToElement(icon.icon),
        label: icon.label,
    }

    // 有子菜单
    if (icon.children) {
        child.children = icon.children.map(item => {
            return {
                key: item.path,
                label: item.label,
            }
        })
    }
    return child
})



const CommonAside = ({ collapsed }) => {
    // 用navigate hook；返回的是一个跳转函数
    const navigate = useNavigate();

    // 点击菜单
    const selectMenu = (e) => {
        console.log(e.key, "我是selectMenu的e.key");
        navigate(e.key)
    }

    console.log(collapsed, "commonAside");

    return (
        <Sider trigger={null} collapsed={collapsed}>

            <h3 className="app-name">{collapsed ? '后台' : '天用后台管理系统'}</h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
                style={{ height: '100%' }}
                onClick={selectMenu}
            />
        </Sider>
    )
}

export default CommonAside