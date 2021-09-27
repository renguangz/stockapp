import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import useResponsive from '../common/useResponsive';

const TableContainer = styled.table`
    /* border: 1px solid white; */
    height: 94%;
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

const TableTitleContainer = styled.div`
    /* border: 1px solid white; */
    margin-right: 4px;
`;

const TableTitle = styled.h2`
    color: white;
    font-size: ${props => props.fontSize}px;
    margin: auto;
`;

const ButtonContainer = styled.div`
    display: flex;
    border: 2px solid #2A3033;
    border-radius: 8px;
`;

const RightTableButton = styled.div`
    background-color: #2C3235;
    font-size: ${props => props.fontSize}px;
    /* font-size: 16px; */
    font-weight: 600;
    padding: 0 12px;
    cursor: pointer;
`;

const LeftTableButton = styled.div`
    /* border: 1px solid red; */
    border-radius: 4px;
    /* font-size: 16px; */
    font-size: ${props => props.fontSize}px;
    font-weight: 600;
    padding: 0 16px;
    cursor: pointer;
    background-color: ${props => props.bgc};
`;

const StockInfoTable = ({ basic, incomeDisplay1, balanceDisplay1, cashFlowDisplay1 }) => {

    const tableTitle = [
        '營業收入', '營業成本', '營業利益', '業外損益', '稅前淨利', '應收帳款', '應付帳款',
        '負債總額', '資產總額', '固定資產', '股東權益總額', '存貨', '折舊', '攤提', '每股盈餘(元)'
    ]

    const indicateTableTitle = [
        '毛利率', '營益率', '負債比', '本業比率', 'ROE', 'ROA', '付款天數', '收款天數', '營運天數',
        '折舊＋攤提', '折舊與攤提率', '營業現金效益', '本業基期'
    ]

    const [financeReportDisplay, setFinanceReportDisplay] = useState(true)
    const [financeFocus, setFinanceFocus] = useState('#2C3235');
    const [indicateFocus, setIndicateFocus] = useState('transparent');
    const clickLeftTableButtonReport = () => {
        setFinanceReportDisplay(true)
        setFinanceFocus('#2C3235')
        setIndicateFocus('transparent')
    }
    const clickLeftTableButtonIndicate = () => {
        setFinanceReportDisplay(false)
        setIndicateFocus('#2C3235')
        setFinanceFocus('transparent')
    }

    // const incomeDisplay = basic && basic.income && basic.income.slice(-4)
    // const balanceDisplay = basic && basic.balance && basic.balance.slice(-4)
    // const cashFlowDisplay = basic && basic.cashFlow && basic.cashFlow.slice(-4)
    const incomeDisplay = incomeDisplay1.slice(-4)
    const balanceDisplay = balanceDisplay1.slice(-4)
    const cashFlowDisplay = cashFlowDisplay1.slice(-4)

    // eps
    const eps = []
    const net_income = []
    const common_stock = []
    const total_assets = []
    const accounts_payable = []
    const cost_total = []

    // ROE
    const roe = []
    const total_equity = []
    // ROA
    const roa = []
    // 付款天數
    const prepaid = []

    console.log(incomeDisplay, balanceDisplay)
    incomeDisplay.map(data => {
        net_income.push(data.net_income)
        cost_total.push(data.cost_total)
    })
    balanceDisplay.map(data => {
        common_stock.push(data.common_stock)
        total_assets.push(data.total_assets)
        total_equity.push(data.common_stock + data.capital_reserve + data.re)
        accounts_payable.push(data.accounts_payable)
    })
    net_income.map((num, idx) => {
        eps.push(parseFloat((num / common_stock[idx]).toFixed(2)))
        roa.push((num / total_assets[idx] * 100).toFixed(1))
        roe.push((num / total_equity[idx] * 100).toFixed(1))

        prepaid.push(365 / cost_total[idx] / accounts_payable[idx])
    })

    const { screenType } = useResponsive();

    const [titleFontSize, setTitleFontSize] = useState();
    const [fontSize, setFontSize] = useState();
    useEffect(() => {
        if (screenType === 'DESKTOP') {
            setTitleFontSize(20)
            setFontSize(16)
        } else if (screenType === 'TABLET') {
            setTitleFontSize(14)
            setFontSize(14)
        } else {
            setTitleFontSize(12)
            setFontSize(12)
        }
    }, [screenType])

    return (
        <>
            <TableButtonContainer>
                <TableTitleContainer>
                    <TableTitle fontSize={titleFontSize}>109年</TableTitle>
                </TableTitleContainer>
                <ButtonContainer>
                    <LeftTableButton fontSize={fontSize} bgc={financeFocus} onClick={clickLeftTableButtonReport}>報表</LeftTableButton>
                    <LeftTableButton fontSize={fontSize} bgc={indicateFocus} onClick={clickLeftTableButtonIndicate}>指標</LeftTableButton>
                </ButtonContainer>
                {/* <RightTableButton fontSize={fontSize}>＜上一年</RightTableButton>
                <RightTableButton fontSize={fontSize}>下一年＞</RightTableButton> */}
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
                                    incomeDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.benefit_total / 100000).toFixed(0)}</Td>
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
                                <Td start>{tableTitle[14]}</Td>
                                {
                                    eps.map((data, index) => {
                                        return (
                                            <Td key={index}>{data}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[5]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.accounts_receivable / 10000000).toFixed(2)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[6]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.accounts_payable / 10000000).toFixed(2)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[7]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.total_liabilities / 10000000).toFixed(2)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[8]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.total_assets / 10000000).toFixed(2)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[9]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.non_current_assets / 10000000).toFixed(2)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[10]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.stock_holders_equity / 10000000).toFixed(2)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[11]}</Td>
                                {
                                    balanceDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.inventory / 1000000).toFixed(2)}</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{tableTitle[12]}</Td>
                                {
                                    cashFlowDisplay.map((data, index) => {
                                        return (
                                            <Td key={index}>{(data.depreciation_expense / 1000000).toFixed(2)}</Td>
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
                            <BodyTr>
                                <Td start>{indicateTableTitle[4]}</Td>
                                {
                                    roe.map((data, index) => {
                                        return (
                                            <Td key={index}>{data}%</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{indicateTableTitle[5]}</Td>
                                {
                                    roa.map((data, index) => {
                                        return (
                                            <Td key={index}>{data}%</Td>
                                        )
                                    })
                                }
                            </BodyTr>
                            <BodyTr>
                                <Td start>{indicateTableTitle[6]}</Td>
                                {
                                    roa.map((data, index) => {
                                        return (
                                            <Td key={index}>{data}%</Td>
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
        basic: state.basic,
        incomeDisplay1: state.basic.income,//.slice(-4),
        balanceDisplay1: state.basic.balance,//.slice(-4),
        cashFlowDisplay1: state.basic.cashFlow,//.slice(-4),
    }
}

export default connect(mapStateToProps,)(StockInfoTable);