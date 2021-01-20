(function(d3) {
    'use strict';

    const svg = d3.select('#svgMain');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = data => {

        const xValue = d => d.date;

        const yValue = d => d.infected;

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
            // .tickSize(-innerHeight)
            .tickPadding(-500);

        const yAxis = d3.axisLeft(yScale)
            .ticks(0)
            // .tickSize(-innerWidth) // Horizontal lines
            .tickPadding(10);

        const yAxisG = g.append('g').call(yAxis);
        yAxisG.selectAll('.domain').remove();

        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`);

        xAxisG.select('.domain').remove();

        const lineGenerator = d3.line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(d3.curveBasis);

        g.append('path')
            .attr('class', 'line-path2')
            .attr('d', lineGenerator(data));

        g.selectAll('circle').data(data)
            .enter().append('circle')
            .attr('class', 'data-circle')
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', 10)
    };

    d3.csv('static/js/data.csv')
        .then(data => {
            console.log(data)
            data.forEach(d => {
                d.infected = +d.infected;
                d.deaths = +d.deaths;
                d.deathsTotal = +d.deathsTotal;
                d.date = new Date(d.date);
                // Fri Mar 20 2015 22:00:00 GMT+0100 (Central European Standard Time)
            });
            render(data);
        });

}(d3));

// https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHNlbGVjdCxcbiAgY3N2LFxuICBzY2FsZUxpbmVhcixcbiAgc2NhbGVUaW1lLFxuICBleHRlbnQsXG4gIGF4aXNMZWZ0LFxuICBheGlzQm90dG9tLFxuICBsaW5lLFxuICBjdXJ2ZUJhc2lzXG59IGZyb20gJ2QzJztcblxuY29uc3Qgc3ZnID0gc2VsZWN0KCdzdmcnKTtcblxuY29uc3Qgd2lkdGggPSArc3ZnLmF0dHIoJ3dpZHRoJyk7XG5jb25zdCBoZWlnaHQgPSArc3ZnLmF0dHIoJ2hlaWdodCcpO1xuXG5jb25zdCByZW5kZXIgPSBkYXRhID0+IHtcbiAgY29uc3QgdGl0bGUgPSAnQSBXZWVrIGluIFNhbiBGcmFuY2lzY28nO1xuICBcbiAgY29uc3QgeFZhbHVlID0gZCA9PiBkLnRpbWVzdGFtcDtcbiAgY29uc3QgeEF4aXNMYWJlbCA9ICdUaW1lJztcbiAgXG4gIGNvbnN0IHlWYWx1ZSA9IGQgPT4gZC50ZW1wZXJhdHVyZTtcbiAgY29uc3QgY2lyY2xlUmFkaXVzID0gNjtcbiAgY29uc3QgeUF4aXNMYWJlbCA9ICdUZW1wZXJhdHVyZSc7XG4gIFxuICBjb25zdCBtYXJnaW4gPSB7IHRvcDogNjAsIHJpZ2h0OiA0MCwgYm90dG9tOiA4OCwgbGVmdDogMTA1IH07XG4gIGNvbnN0IGlubmVyV2lkdGggPSB3aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBjb25zdCBpbm5lckhlaWdodCA9IGhlaWdodCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuICBcbiAgY29uc3QgeFNjYWxlID0gc2NhbGVUaW1lKClcbiAgICAuZG9tYWluKGV4dGVudChkYXRhLCB4VmFsdWUpKVxuICAgIC5yYW5nZShbMCwgaW5uZXJXaWR0aF0pXG4gICAgLm5pY2UoKTtcbiAgXG4gIGNvbnN0IHlTY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKGV4dGVudChkYXRhLCB5VmFsdWUpKVxuICAgIC5yYW5nZShbaW5uZXJIZWlnaHQsIDBdKVxuICAgIC5uaWNlKCk7XG4gIFxuICBjb25zdCBnID0gc3ZnLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sJHttYXJnaW4udG9wfSlgKTtcbiAgXG4gIGNvbnN0IHhBeGlzID0gYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgLnRpY2tTaXplKC1pbm5lckhlaWdodClcbiAgICAudGlja1BhZGRpbmcoMTUpO1xuICBcbiAgY29uc3QgeUF4aXMgPSBheGlzTGVmdCh5U2NhbGUpXG4gICAgLnRpY2tTaXplKC1pbm5lcldpZHRoKVxuICAgIC50aWNrUGFkZGluZygxMCk7XG4gIFxuICBjb25zdCB5QXhpc0cgPSBnLmFwcGVuZCgnZycpLmNhbGwoeUF4aXMpO1xuICB5QXhpc0cuc2VsZWN0QWxsKCcuZG9tYWluJykucmVtb3ZlKCk7XG4gIFxueUF4aXNHLmFwcGVuZCgndGV4dCcpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMtbGFiZWwnKVxuICAgIC5hdHRyKCd5JywgLTYwKVxuICAgIC5hdHRyKCd4JywgLWlubmVySGVpZ2h0IC8gMilcbiAgICAuYXR0cignZmlsbCcsICdibGFjaycpXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGByb3RhdGUoLTkwKWApXG4gICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgLnRleHQoeUF4aXNMYWJlbCk7XG5cbmNvbnN0IHhBeGlzRyA9IGcuYXBwZW5kKCdnJykuY2FsbCh4QXhpcylcbiAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwke2lubmVySGVpZ2h0fSlgKTtcblxueEF4aXNHLnNlbGVjdCgnLmRvbWFpbicpLnJlbW92ZSgpO1xuXG54QXhpc0cuYXBwZW5kKCd0ZXh0JylcbiAgICAuYXR0cignY2xhc3MnLCAnYXhpcy1sYWJlbCcpXG4gICAgLmF0dHIoJ3knLCA4MClcbiAgICAuYXR0cigneCcsIGlubmVyV2lkdGggLyAyKVxuICAgIC5hdHRyKCdmaWxsJywgJ2JsYWNrJylcbiAgICAudGV4dCh4QXhpc0xhYmVsKTtcblxuY29uc3QgbGluZUdlbmVyYXRvciA9IGxpbmUoKVxuICAueChkID0+IHhTY2FsZSh4VmFsdWUoZCkpKVxuICAueShkID0+IHlTY2FsZSh5VmFsdWUoZCkpKVxuICAuY3VydmUoY3VydmVCYXNpcyk7XG5cbmcuYXBwZW5kKCdwYXRoJylcbiAgICAuYXR0cignY2xhc3MnLCAnbGluZS1wYXRoJylcbiAgICAuYXR0cignZCcsIGxpbmVHZW5lcmF0b3IoZGF0YSkpO1xufTtcblxuY3N2KCdodHRwczovL3Zpemh1Yi5jb20vY3VycmFuL2RhdGFzZXRzL3RlbXBlcmF0dXJlLWluLXNhbi1mcmFuY2lzY28uY3N2JylcbiAgLnRoZW4oZGF0YSA9PiB7XG4gICAgZGF0YS5mb3JFYWNoKGQgPT4ge1xuICAgICAgZC50ZW1wZXJhdHVyZSA9ICtkLnRlbXBlcmF0dXJlO1xuICAgICAgZC50aW1lc3RhbXAgPSBuZXcgRGF0ZShkLnRpbWVzdGFtcCk7XG4gICAgfSk7XG4gICAgcmVuZGVyKGRhdGEpO1xuICB9KTsiXSwibmFtZXMiOlsic2VsZWN0Iiwic2NhbGVUaW1lIiwiZXh0ZW50Iiwic2NhbGVMaW5lYXIiLCJheGlzQm90dG9tIiwiYXhpc0xlZnQiLCJsaW5lIiwiY3VydmVCYXNpcyIsImNzdiJdLCJtYXBwaW5ncyI6Ijs7O0VBWUEsTUFBTSxHQUFHLEdBQUdBLFNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQjtFQUNBLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztFQUNqQyxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkM7RUFDQSxNQUFNLE1BQU0sR0FBRyxJQUFJLElBQUk7RUFFdkI7RUFDQSxFQUFFLE1BQU0sTUFBTSxHQUFHLENB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