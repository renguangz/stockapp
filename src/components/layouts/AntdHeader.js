import React from 'react'
import { Input, Layout, Menu } from 'antd';

const { Header } = Layout;
const { Search } = Input;

function AntdHeader() {
    return (
        <div>
            <Header className="header">
                <div className="logo" />
                <div style={{ display: 'flex' }}>

                    <Search placeholder="input search text" enterButton style={{ width: '350px' }} />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">首頁</Menu.Item>
                        <Menu.Item key="2">我的清單</Menu.Item>
                        <Menu.Item key="3">個股資訊</Menu.Item>
                        <Menu.Item key="4">個股新聞</Menu.Item>
                    </Menu>
                </div>
            </Header>
        </div>
    )
}

export default AntdHeader
