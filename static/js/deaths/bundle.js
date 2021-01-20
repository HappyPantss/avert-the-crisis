(function(d3) {
    'use strict';

    const svg = d3.select('#svgMain');

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
            .tickSize(-innerHeight)
            .tickPadding(-490);

        const yAxis = d3.axisLeft(yScale)
            .ticks(0)
            .tickSize(-innerWidth) // Horizontal lines
            .tickPadding(10);

        const yAxisG = g.append('g').call(yAxis);
        yAxisG.selectAll('.domain').remove();

        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`);

        xAxisG.selectAll('.domain').remove();

        const lineGenerator = d3.line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(d3.curveBasis);

        g.append('path')
            .attr('class', 'line-path')
            .attr('d', lineGenerator(data));

        g.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('fill', '#175E79')
            .on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut)
            .append('title')
            .text((i) => {
                return "Aantal: " + yValue(i) + " - " + "Datum: " + formatDate(xValue(i));
            })

        function handleMouseOver(d, i) {
            d3.select(this)
                .transition()
                .attr('fill', 'white');
        }

        function handleMouseOut() {
            d3.select(this)
                .transition()
                .attr('fill', '#175E79');
        }

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [day, month, year].join('-');

            // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
        };
    };

    d3.csv('./static/data/data.csv')
        .then(data => {
            console.log(data)
            data.forEach(d => {
                d.deaths = +d.deaths;
                d.date = new Date(d.date);
            });
            render(data);
        });

}(d3));