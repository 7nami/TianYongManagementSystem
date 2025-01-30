import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber } from 'antd'
import './user.css'
import { getUser, addUser, editUser } from "../../api"

function User() {
    const [listData, setListData] = useState({
        name: '',
    });

    const [tableData, setTableData] = useState([])
    // 0新增，1编辑
    const [modalType, setModalType] = useState(0)
    // 模态框打开状态
    const [isModalOpen, setIsModalOpen] = useState(false)
    // 表单实例
    const [form] = Form.useForm()
    // 新增\编辑
    const handleClick = (type, rowData) => {
        setIsModalOpen(!isModalOpen);
        console.log('新增');
        if (type === 'add') {
            setModalType(0)
        } else {
            setModalType(1)
        }
    }
    // 提交
    const handleFinish = (e) => {
        console.log("搜索表单提交的值：", e);
        const keyword = e.keyword?.toLowerCase().trim();

        if (!keyword) {
            getTableData()
            return;
        }

        const filteredData = tableData.filter((user) => {
            return (
                user.name.toLowerCase().includes(keyword) ||
                user.username.toLowerCase().includes(keyword) ||
                user.email.toLowerCase().includes(keyword) ||
                user.phone.includes(keyword) ||  // 可能是数字
                user.website.toLowerCase().includes(keyword) ||
                user.company?.name.toLowerCase().includes(keyword) || // 可能没有 company
                user.address?.city.toLowerCase().includes(keyword)   // 可能没有 address
            )
        })
        setTableData(filteredData);
    }
    // 删除
    const handleDelete = (type, rowData) => {
        console.log('删除');
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'DELETE',
        }).then(() => {
            console.log('删除成功');
            getTableData();
        }).catch(err => {
            console.error('删除失败：', err);
        });
    }

    const getTableData = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(json => {
                console.log(json, '我是userjson');
                const processedData = json.map((item) => (
                    {
                        ...item,
                        age: parseInt(item.phone.slice(0, 2), 10) || 18,
                    }
                ));
                setTableData(processedData);
            })
            .catch(error => console.error('获取数据失败：', error));
    }

    useEffect(() => {
        getTableData();
    }, []);

    // 弹窗确定的事件
    const handleOk = () => {
        // setIsModalOpen(false)
        // 表单校验
        form.validateFields().then((values) => {
            console.log("表单校验：", values);
            // 根据当前状态调用接口
            if (modalType) {
                // 编辑
                fetch('https://jsonplaceholder.typicode.com/posts/1', {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                }).then(res => res.json())
                    .then((json) => {
                        console.log("编辑(更新资源)json:", json);
                        handleCancel();
                        getTableData();
                    })
                    .catch(err => console.error('编辑失败：', err));

            } else {
                // 新增
                fetch('https://jsonplaceholder.typicode.com/users', {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log("添加(创建资源)json:", json);
                        handleCancel();
                        getTableData();
                    })
                    .catch((error) => console.error('新增失败：', error));

            }
        }
        )

    }
    // 弹窗取消
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const columns = [
        {
            title: '名字',
            dataIndex: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            render: (age) =>
                age > 6 ? (
                    <span style={{ color: 'red' }}>{age}</span>
                ) : (
                    <span style={{ color: 'green' }}>{age}</span>
                )
        },
        {
            title: '地址',
            dataIndex: 'address',
            render: (_, rowData) => rowData.address?.city || '暂无城市', // 通过 record 获取 address.city
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '操作',
            render: (rowData) => {
                return (
                    <div className='flex-box'>
                        <Button style={{ marginRight: '5px' }} type='primary' onClick={() => handleClick('edit', rowData)}>编辑</Button>
                        <Popconfirm description="该操作将删除此项" cancelText="取消" okText="确认" title='确定删除吗？' onConfirm={() => handleDelete('delete', rowData)}>
                            <Button danger ghost type='default' >删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]

    /*     useEffect(() => {
            // 空数组代表首次加载 ；调用后端接口获取用户列表数据
            getTableData()
        }, []) */


    return (
        <div className='user'>
            <div className='flex-box space-between'>
                <Button type="primary" onClick={() => handleClick('add')}>新增</Button>
                <Form layout='inline' onFinish={handleFinish}>
                    <Form.Item name='keyword'>
                        <Input placeholder='请输入用户名'></Input>
                    </Form.Item>
                    <Form.Item  >
                        <Button htmlType='submit' type='primary'>搜索</Button>
                    </Form.Item>


                </Form>
            </div>
            <Table columns={columns} dataSource={tableData} rowKey={'id'}></Table>
            <Modal cancelText="取消" okText="确定" onOk={handleOk} onCancel={handleCancel} open={isModalOpen} title={modalType ? "编辑" : "新增"}>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} labelAlign='left' form={form}>
                    <Form.Item label='名字' name='name' rules={[{
                        required: true,
                        message: '请输入名字'
                    }]}>
                        <Input placeholder='请输入名字'></Input>
                    </Form.Item>
                    <Form.Item label='年龄' name='age'
                        rules={[{
                            required: true,
                            message: '请输入年龄'
                        },
                        {
                            type: 'number',
                            message: '请输入数字类型'
                        }]}>
                        <InputNumber placeholder='请输入年龄'></InputNumber>
                    </Form.Item>
                    <Form.Item label='地址' name='address'>
                        <Input placeholder='请输入地址'></Input>
                    </Form.Item>
                    <Form.Item label='手机号' name='phone'>
                        <Input placeholder='请输入手机号'></Input>
                    </Form.Item>
                    <Form.Item label='邮箱' name='email'
                        rules={[{
                            type: 'email',
                            message: '请输入正确的邮箱格式'
                        }]}
                    >
                        <Input placeholder='请输入邮箱'></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default User