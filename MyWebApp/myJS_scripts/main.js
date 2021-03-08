"use strict"; //JS strict mode
window.onload = function () {
//create Leaflet map to attach to map container
var map = L.map('map');

//Tile layers, default to satellite imagery display
var osm = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
var USGS_USImagery = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20,
    attribution: '© <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});
//add imagery to map
USGS_USImagery.addTo(map);

//Credit for dropdown list + popup code: http://jsfiddle.net/nathansnider/avn0ph1p/
var bempSites = L.geoJson(bempSites, {
    onEachFeature: function (feature, layer) //functionality on click on feature
    {
        layer.bindPopup(
            "Site Name: " + feature.properties.site + "<br>" +
            "Established: " + feature.properties.est + "<br>" +
            "Flooding site? " + feature.properties.flooding + "<br>" +
            "Other Disturbances:" + feature.properties.otherDisturbance + "<br>" +
            "Management Interventions: " + feature.properties.management);
    }
}).addTo(map);
map.fitBounds(bempSites.getBounds());

////////////////////////////////////////////////////////////////////////////////////////////
//creating the selector control//
////////////////////////////////////////////////////////////////////////////////////////////

//create Leaflet control for selector
var selector = L.control({
    position: 'topright'
});

//create select element (with id, so it can be populated later)
selector.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'select');
    div.innerHTML = '<select id="site_select"><option>(Select Site)</option></select>';
    return div;
};
selector.addTo(map);

function populateSelect(targetLayer, property, select_id) {
    for (var i in targetLayer._layers) {
        var optionElement = document.createElement("option");
        optionElement.innerHTML = targetLayer._layers[i].feature.properties[property];
        //store layer index in option element's value attribute
        optionElement.value = i;
        document.getElementById(select_id).appendChild(optionElement);
    }
}

//populate site_select element with site IDs for all markers in bempSites
populateSelect(bempSites, "site", "site_select");

////////////////////////////////////////////////////////////////////////////////////////////
//setting up event listeners//
////////////////////////////////////////////////////////////////////////////////////////////

var site_select = L.DomUtil.get("site_select");
L.DomEvent.addListener(site_select, 'change', changeHandler);

//prevent clicks on the selector from propagating through to the map
//(otherwise popups will close immediately after opening)
L.DomEvent.addListener(site_select, 'click', function (e) {
    L.DomEvent.stopPropagation(e);
});

function changeHandler(e) {
    //open popups if the selected option has a numerical value
    if (isNaN(parseInt(e.target.value))) {
        map.closePopup();
    } else {
        bempSites._layers[e.target.value].openPopup()
    }
}

//Click event zooms to a site
bempSites.on('click', function (e) {
    map.setView(e.latlng, 16);
});

var baseMaps = {
    "Open Street Map": osm,
    "USGS Satellite": USGS_USImagery
};
//Add layer control
L.control.layers(baseMaps).addTo(map);
}
//code for graph
var svg = d3.select("svg"),
    margin = { top: 20, right: 50, bottom: 110, left: 40 },
    margin2 = { top: 430, right: 50, bottom: 30, left: 40 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    height2 = +svg.attr("height") - margin2.top - margin2.bottom;

var parseDate = d3.timeParse("%m/%d/%Y");

var x = d3.scaleTime().range([0, width]),
    x2 = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y1 = d3.scaleLinear().range([height, 0]),
    y2 = d3.scaleLinear().range([height2, 0]),
    y3 = d3.scaleLinear().range([height2, 0]);

var xAxis = d3.axisBottom(x),
    xAxis2 = d3.axisBottom(x2),
    yAxis2 = d3.axisRight(y1),
    yAxis = d3.axisLeft(y);

var brush = d3.brushX()
    .extent([[0, 0], [width, height2]])
    .on("brush end", brushed);

var zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

var depth = d3.line()
    .x(function (d) { return x(d.Date); })
    .y(function (d) { return y1(d.Air_Temp); });

var river = d3.line()
    .x(function (d) { return x(d.Date); })
    .y(function (d) { return y(d.Rivercfc); });

var line2 = d3.line()
    .x(function (d) { return x2(d.Date); })
    .y(function (d) { return y2(d.Air_Temp); });

var line4 = d3.line()
    .x(function (d) { return x(d.Date); })
    .y(function (d) { return y3(d.Rivercfc); });

var clip = svg.append("defs").append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0);

var Line_chart = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("clip-path", "url(#clip)");

var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

d3.csv("data/CIMIS_Station_125.csv", type, function (error, data) {
    if (error) throw error;

    x.domain(d3.extent(data, function (d) { return d.Date; }));
    y.domain([0, d3.max(data, function (d) { return Math.max(d.Rivercfc); })]);
    y1.domain([0, d3.max(data, function (d) { return Math.max(d.Air_Temp); })]);
    x2.domain(x.domain());
    y2.domain([0, d3.max(data, function (d) { return Math.max(d.Air_Temp); })]);
    y3.domain([0, d3.max(data, function (d) { return Math.max(d.Rivercfc); })]);

    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));

    focus.append("g")
        .attr("class", "axis axis--y1")
        .attr("transform", "translate( " + width + ", 0 )")
        .call(d3.axisRight(y1));

    Line_chart.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", depth);

    Line_chart.append("path")
        .datum(data)
        .attr("class", "line3")
        .attr("d", river);

    context.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line2);

    context.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    context.append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, x.range());

    svg.append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);

    console.log(data);
});

function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
    var s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));
    Line_chart.select(".line").attr("d", depth);
    Line_chart.select(".line3").attr("d", river);
    focus.select(".axis--x").call(xAxis);
    svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
        .scale(width / (s[1] - s[0]))
        .translate(-s[0], 0));
}

function zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
    var t = d3.event.transform;
    x.domain(t.rescaleX(x2).domain());
    Line_chart.select(".line").attr("d", depth);
    focus.select(".axis--x").call(xAxis);
    context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
}

function type(d) {
    d.Date = parseDate(d.Date);
    d.Air_Temp = +d.Air_Temp;
    return d;
}
