import React from 'react';
import styled, { css } from 'styled-components';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Header from './Header';
import ClearFix from '../common/ClearFix';

const { Content, Sider } = Layout;

const fixedStyle = css`
    position: fixed;
    z-index: 1;
    background-color: orange;
`;

const PageHeader = styled(Header)`
    ${props => props.fixed && fixedStyle}
`;

const PageSider = styled(Sider)`
    ${props => props.fixed && fixedStyle}

`;

const DefaultLayoutAntd = ({ noSideBar, fixed, fixedSidebar, fixedHeader, children }) => {
    return (
        <Layout>
            <PageHeader fixed />
            {/* <ClearFix height="8vh" /> */}
            <Layout>
                <PageSider className="site-layout-background" >
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
                </PageSider>
                <Layout style={{ padding: '0 24px 24px' }}>
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
        </Layout>
    )
};

export default DefaultLayoutAntd;