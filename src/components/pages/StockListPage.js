import React, { useEffect } from 'react';
import { Table } from 'antd';
import DefaultLayout from '../layouts/DefaultLayout';
import { data, StockListColumns } from './StockListData';
import Container from '../common/Container';
import { MenuOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { sortableHandle } from 'react-sortable-hoc';

const StockListPage = () => {

    const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

    return (
        <DefaultLayout noSidebar>
            <Container>
                <Table columns={StockListColumns} dataSource={data} expandable={{
                    expandIcon: () => {
                        return (
                            <div style={{ display: 'flex' }}>
                                <DragHandle />
                                <MinusSquareOutlined />
                            </div>
                        )
                    }
                }}
                    pagination={false}
                />
            </Container>
        </DefaultLayout>
    )
};

export default StockListPage;