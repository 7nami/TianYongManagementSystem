import React from 'react'
import "./login.css"
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { getMenu } from '../../api'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    // 判断 在登陆状态下 需要跳转到home
    if (localStorage.getItem('token')) {
        return <Navigate to='/home' replace/>
    }

    const handleSubmit = (val) => {
        console.log('表单提交内容: ', val);
        if (!val.password || !val.username) {
            return message.open({
                type: 'warning',
                content: '请输入账号密码'
            })
        }
        getMenu(val).then(({ data }) => {
            console.log(data);
            localStorage.setItem('token', data.data.token)
            navigate('/home')
        })
    }


    return (
        <Form className='login-container' onFinish={handleSubmit}>
            <div className='login_title'>系统登陆</div>
            <Form.Item
                label='账号'
                name='username'
                rules={[
                    {
                        required: true,
                        message: '请输入账号',
                    },
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder='请输入账号' />
            </Form.Item>
            <Form.Item
                label='密码'
                name='password'
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder='请输入密码' />
            </Form.Item>
            <Form.Item className='login-button'>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    登陆
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login