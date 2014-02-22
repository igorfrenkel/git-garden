
var vis = d3.select("#viz").append("svg:svg")
                           .attr("width", 400)
                           .attr("height", 400)
                           .append("svg:g")
                           .attr("transform", "translate(0, 0)"); // shift everything to the right


var treeData = {
    "name" : "A",
    "children" : [
        {"name" : "A1", "children": [{
            "name": 'B1',
            "children": [
                {name: 'C1'}
            ]
        }]},
        {"name" : "A2",
        "children": [{name: 'D1'}] }] };
var selectedNode = null;
var draggingNode = null;

// ------------- moving -------------------------------
var overCircle = function(d) {
    console.log(d);
    selectedNode = d;
    updateTempConnector();
}
var outCircle = function(d) {
    selectedNode = null;
    updateTempConnector();
}

var nodeSelected = function(node) {
  d3.selectAll(".node")
    .attr("class", "node")
    .attr("r", 5);

  d3.select(this)
    .attr("class", "node active")
    .attr("r", 7);
};

var circleDragger = d3.behavior.drag()
    .on("dragstart", function(d){
      console.log(d.x, d.y)
        var node = d3.select(this);
        console.log(node.attr("cx"), node.attr("cy"));
        node.attr( { cx: d.x, cy: d.y } );

        draggingNode = d;
        // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it
        d3.select(this).attr( 'pointer-events', 'none' );

    })
    .on("drag", function(d) {
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        var node = d3.select(this);
        node.attr( { cx: d.x, cy: d.y } );
        // updateTempConnector();
    })
    .on("dragend", function(d){
        draggingNode = null;
        // now restore the mouseover event or we won't be able to drag a 2nd time
        d3.select(this).attr( 'pointer-events', '' );
    });

var tree = d3.layout.tree().size([200,200]);
var nodes = tree.nodes(treeData);
var links = tree.links(nodes);

var diagonalHorizontal = d3.svg.diagonal().projection( function(d) { return [d.y, d.x]; } );
var paths = vis.selectAll(".nodelink")
    .data(links)
    .enter().append("path")
    .attr("class", "nodelink")
    .attr("d", diagonalHorizontal)
    .attr('pointer-events', 'none');

var node = vis.selectAll("g.node")
    .data(nodes)
    .enter().append("g")
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

node.append("circle")
    .attr("r", 5)
    .attr("class", "node")
    .attr('pointer-events', "click")
    // .on("click", nodeSelected)
    .call(circleDragger);

