import React from 'react';
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

const StockInoTable = () => {
    return (
        <TableContainer>
            <Thead>
                <HeadTr>
                    <Th width={72}>項目(百萬)</Th>
                    <Th>Q1</Th>
                    <Th>Q2</Th>
                    <Th>Q3</Th>
                    <Th>Q4</Th>
                </HeadTr>
            </Thead>
            <Tbody>
                {
                    MockedInfo.map((data, index) => {
                        return (
                            <BodyTr>
                                <Td start>{data.item}</Td>
                                <Td>{data.Q1}</Td>
                                <Td>{data.Q2}</Td>
                                <Td>{data.Q3}</Td>
                                <Td>{data.Q4}</Td>
                            </BodyTr>
                        )
                    })
                }
                <BodyTr>
                    <Td start>營業收入淨額</Td>
                    <Td>8583</Td>
                </BodyTr>
                <BodyTr>
                    <Td start>營業收入淨額</Td>
                </BodyTr>
                <BodyTr>
                    <Td start>營業收入淨額</Td>
                </BodyTr>
                <BodyTr>
                    <Td start>營業收入淨額</Td>
                </BodyTr>
                <BodyTr>
                    <Td start>營業收入淨額</Td>
                </BodyTr>
            </Tbody>
        </TableContainer>
    )
};

export default StockInoTable;