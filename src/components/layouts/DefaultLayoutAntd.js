import React from 'react';
import styled from 'styled-components';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Header from './Header';

const { Content, Sider } = Layout;

const StyledLayout = styled(Layout)`
    height: 100vh;
`;

const DefaultLayoutAntd = ({ children }) => {
    return (
        <StyledLayout>
            <Header />
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item icon={<UserOutlined />} key="1">基本</Menu.Item>
                        <Menu.Item icon={<UserOutlined />} key="2">技術</Menu.Item>
                        <Menu.Item icon={<UserOutlined />} key="3">籌碼</Menu.Item>
                        <Menu.Item icon={<UserOutlined />} key="4">新聞</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </StyledLayout>
    )
};

export default DefaultLayoutAntd;