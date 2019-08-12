queue()
    .defer(d3.csv, "data/world-happiness-report-2019.csv")
    .await(makeGraphs);

function makeGraphs (error, happinessData) {
    var ndx = crossfilter(happinessData);
    
    show_social_support(ndx);
    
    dc.renderAll();
}

function show_social_support (ndx) {
    var dim = ndx.dimension(dc.pluck ('Social support'));
    var group = dim.group();

    dc.rowChart("#countries_happiness")
        .width(500)
        .height(300)
        .dimension(dim)
        .group(group)
        .xAxisLabel("scale")
        .yAxisLabel("Country")
        .y(d3.scale.ordinal().domain(["Finland", "Denmark", "Norway", "Iceland", "Netherlands", "Switzerland", "Sweden", "New Zealand", "Canada", "Austria", "Australia", "Costa Rica",]))
        .elasticX(true);
}