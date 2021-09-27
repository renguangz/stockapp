import * as d3 from 'd3';

export const drawSmallChart = (height, width, svgRef, data, stopColor, stopColor2, strokeColor, areaGradientChart) => {

    const smallSvg = d3.select(svgRef.current).attr('height', height).attr('width', width)

    const margin = { top: 0, left: 0, bottom: 0, right: 0 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const smallG = smallSvg.append('g').attr('width', innerWidth).attr('height', innerHeight)

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([0, innerWidth])
    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.close) * 0.9, d3.max(data, d => d.close) * 1.1])
        .range([innerHeight, 0])

    const xAxis = d3.axisBottom(xScale).tickSize(0)
    const yAxis = d3.axisRight(yScale).tickSize(0)
    const xAxisG = smallG.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`)
    const yAxisG = smallG.append('g').call(yAxis).attr('transform', `translate(${innerWidth}, 0)`)

    const path = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.close))
    const area = d3.area()
        .x(d => xScale(d.date))
        .y0(innerHeight)
        .y1(d => yScale(d.close))

    // area gradient
    const areaGradient = smallG.append('defs')
        .append('linearGradient')
        .attr('id', areaGradientChart)
        .attr('x1', '0%')
        .attr('x2', '0%')
        .attr('y1', '0%')
        .attr('y2', '100%')
    areaGradient.append('stop')
        .attr('offset', '0%')
        // .attr("stop-color", "#21825C")
        .attr("stop-color", stopColor)
        .attr("stop-opacity", 0.8);
    areaGradient.append("stop")
        .attr("offset", "80%")
        .attr("stop-color", stopColor2)
        .attr("stop-opacity", 0.5);

    smallG.append('path')
        .datum(data)
        .attr('transfrom', `translate(${xScale.bandwidth()}, 0)`)
        .attr('fill', 'none')
        .attr('stroke', strokeColor)
        .attr('stroke-width', 2)
        .attr('d', d => path(d))
    smallG.append('path')
        .datum(data)
        // .attr('id', 'area-gradient')
        .style('fill', `url(#${areaGradientChart})`)
        // .attr('stroke', 'none')
        // .attr('fill', '#E8F0FB')
        // .attr('opacity', 1)
        .attr('d', area)
}