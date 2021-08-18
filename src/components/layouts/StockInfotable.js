import React, { useEffect, useState } from 'react';
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
    text-align: ${props => props.start ? 'start' : 'center'};
`;

const Tbody = styled.tbody`
    /* border: 1px solid white; */
`;

const BodyTr = styled.tr`
    width: 100%;
    &:nth-child(odd) {
        background-color: #F88200;
    }
`;

const Td = styled.td`
    text-align: ${props => props.start ? 'start' : 'center'};
    /* border: 1px solid white; */
`;

const TableButtonContainer = styled.div`
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    border: 2px solid #2A3033;
    border-radius: 8px;
`;

const LeftTableButton = styled.div`
    background-color: #2C3235;
    font-size: 16px;
    font-weight: 600;
    padding: 0 16px;
    cursor: pointer;
`;

const RightTableButton = styled.div`
    font-size: 16px;
    font-weight: 600;
    padding: 0 16px;
    cursor: pointer;
`;

const StockInoTable = ({ basic }) => {
    const tableTitle = [
        '營業收入', '營業成本', '營業利益', '業外收入合計', '稅前淨利', '每股盈餘(元)', '應收帳款',
        '應付帳款', '負債總額', '資產總額', '固定資產', '股東權益總額', '存貨', '折舊', '攤提'
    ]

    const indicateTableTitle = [
        '毛利率', '營益率', '負債比', '本業比率', 'ROE', 'ROA', '付款天數', '收款天數', '營運天數',
        '折舊＋攤提', '折舊與攤提率', '營業現金效益', '本業基期'
    ]

    const [financeReportDisplay, setFinanceReportDisplay] = useState(true)
    const clickRightTableButtonReport = () => {
        setFinanceReportDisplay(true)
    }
    const clickRightTableButtonIndicate = () => {
        setFinanceReportDisplay(false)
    }

    const incomeDisplay = basic.income.slice(-4)
    const balanceDisplay = basic.balance.slice(-4)


    return (
        <>
            <TableButtonContainer>
                <LeftTableButton>＜上一年</LeftTableButton>
                <LeftTableButton>下一年＞</LeftTableButton>
                <ButtonContainer>
                    <RightTableButton onClick={clickRightTableButtonReport}>報表</RightTableButton>
                    <RightTableButton onClick={clickRightTableButtonIndicate}>指標</RightTableButton>
                </ButtonContainer>
            </TableButtonContainer>
            <TableContainer>
                <Thead>
                    <HeadTr>
                        <Th start width={120}>項目(百萬)</Th>
                        <Th>Q1</Th>
                        <Th>Q2</Th>
                        <Th>Q3</Th>
                        <Th>Q4</Th>
                    </HeadTr>
                </Thead>
                {
                    financeReportDisplay ? (
                        <Tbody>
                            <BodyTr>
                                <Td start>{tableTitle[0]}</Td>
                                {
                                    incomeDisplay.map((data, key) => {
                                        return (
                                            <Td>{(data.benefit_total / 100000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[1]}</Td>
                                {
                                    incomeDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.cost_total / 100000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[2]}</Td>
                                {
                                    incomeDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.benefit / 100000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[3]}</Td>
                                {
                                    incomeDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.non_operation_income / 100000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[4]}</Td>
                                {
                                    incomeDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.profit_before_tax / 100000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[5]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.total_assets / 10000000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[6]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.accounts_receivable / 10000000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[7]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.accounts_payable / 10000000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[8]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.total_liabilities / 10000000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[9]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.total_assets / 10000000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[10]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.non_current_assets / 10000000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[11]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.stock_holders_equity / 10000000).toFixed(0)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                        </Tbody>
                    ) : (
                        <Tbody>
                            <BodyTr>
                                <Td start>{indicateTableTitle[0]}</Td>
                                {
                                    incomeDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{((data.benefit_total - data.cost_total) / data.benefit_total * 100).toFixed(0)}%</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{indicateTableTitle[1]}</Td>
                                {
                                    incomeDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.benefit / data.benefit_total * 100).toFixed(0)}%</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{indicateTableTitle[2]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.total_liabilities / data.total_assets * 100).toFixed(0)}%</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                                <BodyTr>
                                    <Td start>{indicateTableTitle[3]}</Td>
                                    {
                                        incomeDisplay.map((data, index) => {
                                            return (
                                                <Td key={index}>{(data.benefit / (data.benefit + data.non_operation_income) * 100).toFixed(0)}%</Td>
                                            )
                                        })
                                    }
                                </BodyTr>
                            {
                                indicateTableTitle.map(data => {
                                    return (
                                        <BodyTr>
                                            <Td start>{data}</Td>
                                        </BodyTr>
                                    )
                                })
                            }
                        </Tbody>
                    )
                }

            </TableContainer >
        </>
    )
};

const mapStateToProps = state => {
    return {
        basic: state.basic
    }
}

export default connect(mapStateToProps,)(StockInoTable);