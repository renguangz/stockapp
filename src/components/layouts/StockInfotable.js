import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MockedInfo } from '../common/mocked_data/StockInfoTableMocked';

const TableContainer = styled.table`
    height: 100%;
    width: 100%;
    border-collapse: collapse;
    /* border-spacing: 0px 8px; */
    /* border: 2px solid green; */
    color: white;
`;

const Thead = styled.thead`
`;

const HeadTr = styled.tr`
    /* border: 2px solid yellow; */
    width: 100%;
    height: 10%;
`;

const Th = styled.th`
    width: ${props => props.width || '50'}px;
    /* border: 1px solid white; */
`;

const Tbody = styled.tbody`
    /* border: 1px solid white; */
`;

const BodyTr = styled.tr`
    width: 100%;
    /* height: 90%; */
    &:nth-child(odd) {
        background-color: #F88200;
    }
`;

const Td = styled.td`
    text-align: ${props => props.start ? 'start' : 'center'};
    /* border: 1px solid white; */
`;

const Col1 = () => {
    const tableTitle = [
        '營業收入淨額', '營業成本', '營業利益', '業外收入合計', '稅前淨利', '本期稅後淨利', '每股盈餘(元)', '應收帳款', '存貨',
        '應付帳款', '負債總額', '固定資產', '長期投資', '折舊', '攤提', '股東權益總額'
    ]
    return (
        <>
            {
                tableTitle.map((title, index) => {
                    return (
                        <BodyTr key={index}>
                            <Td start>{title}</Td>
                        </BodyTr>
                    )
                })
            }
        </>
    )
}

// const TableBasic = ({ basic }) => {
//     console.log(basic)
// }


const StockInoTable = ({ basic }) => {
    return (
        <TableContainer>
            <Thead>
                <HeadTr>
                    <Th width={120}>項目(百萬)</Th>
                    <Th>Q1</Th>
                    <Th>Q2</Th>
                    <Th>Q3</Th>
                    <Th>Q4</Th>
                    <Th>Q4</Th>
                    <Th>Q4</Th>
                    <Th>Q4</Th>
                </HeadTr>
            </Thead>
            <Tbody>
                <Col1 />
                {/* {
                    basic.income.map((data, key) => {
                        // console.log(data.date)
                        return (
                            <BodyTr>
                                <Td>{data.benefit}</Td>
                                <Td>{data.benefit_total}</Td>
                                <Td>{data.cost_total}</Td>
                                <Td>1</Td>
                                <Td>2</Td>
                                <Td>3</Td>
                            </BodyTr>
                        )
                    })
                } */}
            </Tbody>
        </TableContainer>
    )
};

const mapStateToProps = state => {
    return {
        basic: state.basic
    }
}

export default connect(mapStateToProps,)(StockInoTable);