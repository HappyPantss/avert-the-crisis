(function(d3) {
    'use strict';

    const svg = d3.select('#yMain');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = data => {

        const xValue = d => d.date;

        const yValue = d => d.deaths;

        const margin = { top: 150, right: 50, bottom: 300, left: 200 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleTime()
            .domain(d3.extent(data, xValue))
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, yValue))
            .range([innerHeight, 0])
            .nice();

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xAxis = d3.axisBottom(xScale)
            .ticks(0)
            .tickSize(-innerHeight)
            .tickPadding(-500);

        const yAxis = d3.axisLeft(yScale)
            .ticks(6)
            .tickSize(-innerWidth) // Horizontal lines
            .tickPadding(10);

        const yAxisG = g.append('g').call(yAxis);
        yAxisG.selectAll('.domain').remove();

        yAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', -60)
            .attr('x', -innerHeight / 2)
            .attr('fill', 'black')
            .attr('transform', `rotate(-90)`)
            .attr('text-anchor', 'middle');
        // .text(yAxisLabel);

        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`);

        xAxisG.select('.domain').remove();
    };

    d3.csv('./static/data/data.csv')
        .then(data => {
            console.log(data)
            data.forEach(d => {
                d.deaths = +d.deaths;
                d.date = new Date(d.date);
                // Fri Mar 20 2015 22:00:00 GMT+0100 (Central European Standard Time)
            });
            render(data);
        });

}(d3));