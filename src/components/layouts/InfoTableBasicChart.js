import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import c3 from 'c3';
import { connect } from 'react-redux';
// import InfoTableChart from '../charts/InfoTableChart';
import { fetchStock, fetchIdName, clickSearch, fetchBasicIncome } from '../../redux';
import './InfoTableBasicChart.css';

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
    width: 46.4%;
    height: 30%;
    margin: 12px;
    padding-top: 4px;
`;

const InfoTableBasicChart = ({ basic, fetchBasicIncome }) => {

    // 營業收入: benefit_total, 毛利率: (benefit_total - cost_total) / benefit_total * 100
    const incomeDisplay = basic.income.slice(-4)
    const grossMargin = ['毛利率'] // 毛利率array
    const operating_income = ['營業收入'] // 營業收入 array
    incomeDisplay.map(data => {
        operating_income.push(parseInt((data.benefit_total / 1000000).toFixed(0)))
        grossMargin.push(parseInt(((data.benefit_total - data.cost_total) / data.benefit_total * 100).toFixed(0)))
    })

    useEffect(() => {
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
                    step: 2
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
    }, [])

    return (
        <FundImgContainer>
            <FundImgBorder id='operatingIncome_grossMargin_chart'>
                {/* 營業收入與毛利率 */}
            </FundImgBorder>
            <FundImgBorder id='eps_nonIndustryRatio_chart'>
                每股盈餘與業外比率
                {/* <InfoTableChart /> */}
            </FundImgBorder>
            <FundImgBorder>
                應收週轉天數與存貨週轉天數
            </FundImgBorder>
            <FundImgBorder>
                資本支出與折舊率
            </FundImgBorder>
            <FundImgBorder>
                營運現金流與負債比
            </FundImgBorder>
            <FundImgBorder>
                (營運現金流 / 本期損益) > 1
            </FundImgBorder>
        </FundImgContainer>
    )
};

const mapStateToProps = state => {
    return {
        basic: state.basic
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBasicIncome: (stockid) => dispatch(fetchBasicIncome(stockid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoTableBasicChart);