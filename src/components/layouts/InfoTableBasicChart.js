import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import c3 from 'c3';
import { connect } from 'react-redux';
import './InfoTableBasicChart.css';
import useResponsive from '../common/useResponsive';

const FundImgContainer = styled.div`
    /* border: 2px solid yellow; */
    height: 100%;
    width: 68%;
    margin-right: 16px;
    display: flex;
    flex-wrap: wrap;
`;

const FundImgBorder = styled.div`
    /* border: 2px solid green; */
    background-color: #2C2C2C;
    box-shadow: 0px 0px 4px grey;
    border-radius: 2px;
    width: ${props => props.width}%;
    width: 46.4%;
    height: 30%;
    margin: ${props => props.margin};
    margin: 12px;
    padding-top: 4px;
    visibility: ${props => props.visibility};
    fill: ${props => props.fill};
`;

const InfoTableBasicChart = ({ basic, incomeDisplay1, balanceDisplay1, cashFlowDisplay1 }) => {
    // const incomeDisplay = basic && basic.income && basic.income.slice(-4) // 損益表
    // const balanceDisplay = basic && basic.balance && basic.balance.slice(-4) // 資產負債表
    // const cashFlowDisplay = basic && basic.cashFlow && basic.cashFlow.slice(-4) // 現金流量表
    // const incomeDisplay = incomeDisplay1.slice(-4)
    // const balanceDisplay = balanceDisplay1.slice(-4)
    // const cashFlowDisplay = cashFlowDisplay1.slice(-4)
    const [incomeDisplay, setIncomeDisplay] = useState([])
    const [balanceDisplay, setBalanceDisplay] = useState([])
    const [cashFlowDisplay, setCashFlowDisplay] = useState([])
    useEffect(() => {
        setIncomeDisplay(incomeDisplay1.slice(-4))
        setBalanceDisplay(balanceDisplay1.slice(-4))
        setCashFlowDisplay(cashFlowDisplay1.slice(-4))
    }, [basic])

    const incomeGrossMarginChart = () => {
        const grossMargin = ['毛利率']
        const operating_income = ['營業收入']
        incomeDisplay.map(data => {
            operating_income.push(parseInt((data.benefit_total / 1000000).toFixed(0)))
            grossMargin.push(parseInt(((data.benefit_total - data.cost_total) / data.benefit_total * 100).toFixed(0)))
        })

        c3.generate({
            bindto: '#operatingIncome_grossMargin_chart',
            padding: {
                top: 30,
            },
            data: {
                columns: [
                    operating_income,
                    grossMargin,
                ],
                axes: {
                    '毛利率': 'y2'
                },
                types: {
                    '毛利率': 'line',
                    '營業收入': 'bar',
                }
            },
            color: {
                pattern: ['#FF7F0F', '#0B83DD']
            },
            legend: {
                show: true,
                position: 'inset',
                inset: {
                    anchor: 'top-right',
                    x: 10,
                    y: -40,
                    step: 1
                }
            },
            axis: {
                x: {
                    type: 'category',
                    tick: {
                        fit: true
                    },
                    categories: ['Q1', 'Q2', 'Q3', 'Q4']
                },
                y: {
                    show: true,
                    tick: {
                        count: 5,
                        format: d3.format('.0f')
                    },
                    label: {
                        text: '營業收入(百萬)',
                        position: 'middle',
                    },
                },
                y2: {
                    show: true,
                    tick: {
                        count: 5,
                        format: d3.format('.0f')
                    },
                    label: {
                        text: '毛利率(%)',
                        position: 'outer-middle',
                    }
                }
            },
            tooltip: {
                show: true,
                format: {
                    title: (d) => { return `Q${d + 1}` },
                    name: (name) => {
                        return name + ':'
                    },
                    value: (value) => {
                        return value + '%'
                    },
                },
            },
            grid: {
                y: {
                    show: true
                },
            }
        })
    }

    const epsNoneIndustryRatioChart = () => {
        const eps = ['每股盈餘']
        const nonIndustryRatio = ['業外比率'] // 業外損益 / 稅前淨利
        const net_income = []
        const common_stock = []
        incomeDisplay.map(data => {
            net_income.push(data.net_income)
            nonIndustryRatio.push(parseInt(data.non_operation_income / data.profit_before_tax * 100))
        })
        balanceDisplay.map(data => {
            common_stock.push(data.common_stock)
        })
        net_income.map((num, idx) => {
            const eps_array = parseFloat((num / common_stock[idx]).toFixed(2))
            eps.push(eps_array)
        })

        c3.generate({
            bindto: '#eps_nonIndustryRatio_chart',
            padding: {
                top: 30,
            },
            data: {
                columns: [eps, nonIndustryRatio],
                axes: {
                    '業外比率': 'y2',
                },
                types: {
                    '業外比率': 'line',
                    '每股盈餘': 'bar'
                }
            },
            color: {
                pattern: ['pink', 'gold']
            },
            legend: {
                show: true,
                position: 'inset',
                inset: {
                    anchor: 'top-right',
                    x: 10,
                    y: -40,
                    step: 1
                }
            },
            axis: {
                x: {
                    type: 'category',
                    tick: {
                        fit: true
                    },
                    categories: ['Q1', 'Q2', 'Q3', 'Q4']
                },
                y: {
                    show: true,
                    tick: {
                        count: 5,
                        format: d3.format('.1f')
                    },
                    label: {
                        text: '每股盈餘(元)',
                        position: 'middle',
                    },
                },
                y2: {
                    show: true,
                    tick: {
                        count: 5,
                        format: d3.format('.0f')
                    },
                    label: {
                        text: '業外比率(%)',
                        position: 'outer-middle'
                    }
                }
            },
            tooltip: {
                show: true,
                format: {
                    title: d => { return `Q${d + 1}` },
                    name: name => {
                        return name + ':'
                    },
                    value: value => {
                        return value + '%'
                    }
                }
            },
            grid: {
                y: {
                    show: true
                }
            }
        })
    }

    const receivableInventoryChart = () => {
        const receivable = ['應收週轉天數']
        const inventory = ['存貨週轉天數']
        const benefit_total = []
        const accounts_receivable = []
        const cost_total = []
        const inventory_balance = []
        incomeDisplay.map(data => {
            benefit_total.push(data.benefit_total)
            cost_total.push(data.cost_total)
        })
        balanceDisplay.map(data => {
            accounts_receivable.push(data.accounts_receivable)
            inventory_balance.push(data.inventory)
        })
        benefit_total.map((num, idx) => {
            receivable.push(parseFloat((num / accounts_receivable[idx]).toFixed(2)))
        })
        cost_total.map((num, idx) => {
            inventory.push(parseFloat((num / inventory_balance[idx]).toFixed(2)))
        })

        const chart = c3.generate({
            bindto: '#receivable_inventory_chart',
            padding: {
                top: 30
            },
            data: {
                columns: [receivable, inventory],
                axes: {
                    '存貨週轉天數': 'y2'
                },
                types: {
                    '應收週轉天數': 'line',
                    '存貨週轉天數': 'line'
                }
            },
            color: {
                pattern: ['red', 'white']
            },
            legend: {
                show: true,
                position: 'inset',
                inset: {
                    anchor: 'top-right',
                    x: -10,
                    y: -40,
                    step: 1
                }
            },
            axis: {
                x: {
                    type: 'category',
                    tick: {
                        fit: true,
                    },
                    categories: ['Q1', 'Q2', 'Q3', 'Q4']
                },
                y: {
                    show: true,
                    tick: {
                        count: 5,
                        format: d3.format('.2f')
                    },
                    label: {
                        text: '應收週轉天數(天數)',
                        position: 'middle'
                    },
                },
                y2: {
                    show: true,
                    tick: {
                        count: 5,
                        format: d3.format('.2f')
                    },
                    label: {
                        text: '存貨週轉天數(天數)',
                        position: 'outer-middle'
                    }
                },
            },
            tooltip: {
                show: true,
                format: {
                    title: d => { return `Q${d + 1}` },
                    name: name => {
                        return name + ':'
                    },
                    value: value => {
                        return value + '天'
                    }
                }
            },
            grid: {
                'y': {
                    show: true
                },
            }
        })
        return chart
    }

    const operatingDebtratioChart = () => {
        const operatingCashflow = ['營運現金流']
        const debtRatio = ['負債比']
        const cashflowOperating = []
        const netIncome = []
        cashFlowDisplay.map(data => {
            cashflowOperating.push(data.cashFlow_operating)
        })
        incomeDisplay.map(data => {
            netIncome.push(data.net_income)
        })
        cashflowOperating.map((num, idx) => {
            operatingCashflow.push(parseFloat((num / netIncome[idx]).toFixed(2)))
        })
        balanceDisplay.map(data => {
            debtRatio.push(parseInt(data.total_liabilities / data.total_assets * 100))
        })

        c3.generate({
            bindto: '#operatingCashFlow_debtRatio_chart',
            padding: {
                top: 30
            },
            data: {
                columns: [operatingCashflow, debtRatio],
                axes: {
                    '負債比': 'y2'
                },
                types: {
                    '負債比': 'line',
                    '營運現金流': 'bar',
                }
            },
            color: {
                pattern: ['#8E4F4F', '#78C4D4']
            },
            legend: {
                show: true,
                position: 'inset',
                inset: {
                    anchor: 'top-right',
                    x: 10,
                    y: -40,
                    step: 1
                }
            },
            axis: {
                x: {
                    type: 'category',
                    tick: {
                        fit: true
                    },
                    categories: ['Q1', 'Q2', 'Q3', 'Q4']
                },
                y: {
                    show: true,
                    tick: {
                        count: 5,
                        format: d3.format('.2f')
                    },
                    label: {
                        text: '營運現金流(單位)',
                        position: 'middle'
                    }
                },
                y2: {
                    show: true,
                    tick: {
                        count: 5,
                        format: d3.format('.0f')
                    },
                    label: {
                        text: '負債比(%)',
                        position: 'outer-middle'
                    }
                }
            },
            tooltip: {
                show: true,
                format: {
                    title: (d) => { return `Q${d + 1}` },
                    name: (name) => {
                        return name + ':'
                    },
                    value: (value) => {
                        return value + '%'
                    },
                },
            },
            grid: {
                y: {
                    show: true
                }
            }
        })
    }

    incomeGrossMarginChart()
    epsNoneIndustryRatioChart()
    receivableInventoryChart()
    operatingDebtratioChart()

    const chartRef = useRef();

    // chart reponsive
    const { screenType } = useResponsive();
    const [leftChartDisplay, setLeftChartDisplay] = useState('visible')
    const [leftChartFill, setLeftChartFill] = useState()
    const [chartWidth, setChartWidth] = useState(46.6);
    const [chartMargin, setChartMargin] = useState();
    // const 
    useEffect(() => {
        if (screenType === 'DESKTOP') {
            setChartWidth(46.6)
            setChartMargin('12px')
            // setLeftChartDisplay('visible')
            // set
        } else if (screenType === 'TABLET') {
            // d3.select('#capitalExpenture_depreciation_chart').attr('opacity', 0)
            setChartWidth(80)
            setChartMargin('12px auto')
            // setLeftChartDisplay('hidden')
            // setLeftChartFill('none')

        } else {
            // d3.select('#capitalExpenture_depreciation_chart').attr('opacity', 0)
            // d3.select('#operatingCashFlow_debtRatio_chart').attr('opacity', 0)
            setChartWidth(80)
            setChartMargin('12px auto')
            // setLeftChartDisplay('hidden')
            // setLeftChartFill('none')
        }
    }, [screenType])

    return (
        <FundImgContainer>
            <FundImgBorder id='operatingIncome_grossMargin_chart' ref={chartRef} className='svgWhite' width={chartWidth} margin={chartMargin} visibility={leftChartDisplay}>
                {/* 營業收入與毛利率 */}
            </FundImgBorder>
            <FundImgBorder id='eps_nonIndustryRatio_chart' ref={chartRef} className='svgWhite' width={chartWidth} margin={chartMargin}>
                {/* 每股盈餘與業外比率 */}
                {/* <InfoTableChart /> */}
            </FundImgBorder>
            <FundImgBorder id='receivable_inventory_chart' ref={chartRef} className='svgWhite' width={chartWidth} margin={chartMargin} visibility={leftChartDisplay}>
                {/* 應收週轉天數與存貨週轉天數 */}
            </FundImgBorder>
            <FundImgBorder id='capitalExpenture_depreciation_chart'>
                資本支出與折舊率
            </FundImgBorder>
            <FundImgBorder id='operatingCashFlow_debtRatio_chart' ref={chartRef} className='svgWhite' width={chartWidth} margin={chartMargin} visibility={leftChartDisplay}>
                {/* 營運現金流與負債比 */}
            </FundImgBorder>
            <FundImgBorder id='chart1'>
                營運現金流 / 本期損益
            </FundImgBorder>
        </FundImgContainer>
    )
};

const mapStateToProps = state => ({
    basic: state.basic,
    incomeDisplay1: state.basic.income,//.slice(-4),
    balanceDisplay1: state.basic.balance,//.slice(-4),
    cashFlowDisplay1: state.basic.cashFlow,//.slice(-4),
})

export default connect(mapStateToProps,)(InfoTableBasicChart);