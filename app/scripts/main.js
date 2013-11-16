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

var circleDragger = d3.behavior.drag()
    .on("dragstart", function(d){
        draggingNode = d;
        // it's important that we suppress the mouseover event on the node being dragged. Otherwise it will absorb the mouseover event and the underlying node will not detect it
        d3.select(this).attr( 'pointer-events', 'none' );
    })
    .on("drag", function(d) {
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        var node = d3.select(this);
        node.attr( { cx: d.x, cy: d.y } );
        updateTempConnector();
    })
    .on("dragend", function(d){
        draggingNode = null;
        // now restore the mouseover event or we won't be able to drag a 2nd time
        d3.select(this).attr( 'pointer-events', '' );
    })


var wipeAllInactive = function() {
    d3.select("#viz").selectAll(".nodelink")
        .attr("class", "nodelink")

}

var updateTempConnector = function() {
    var data = [];

    wipeAllInactive();

    if ( draggingNode != null && selectedNode != null) {
        // have to flip the source coordinates since we did this for the existing connectors on the original tree
        var node1 = {source: {x: selectedNode.y, y: selectedNode.x},
            target: {x: draggingNode.x, y: draggingNode.y} };

        var node2 = {source: {x: selectedNode.parent.y, y: selectedNode.parent.x},
            target: {x: draggingNode.x, y: draggingNode.y} };

        data = [ node1, node2];


        for(i=0; i< paths[0].length; i++){
            var path = paths[0][i];
            var source = path["__data__"].source.name
            var target = path["__data__"].target.name

//            path = d3.select(path)
//            path.attr("class", "nodelink");

            if((source == selectedNode.name || source == selectedNode.parent.name) &&(target == selectedNode.name || target == selectedNode.parent.name )){
                path = d3.select(path)
                path.attr("class", "nodelink inactive");
                console.log(path);
            }
            else {
                path = d3.select(path)
                path.attr("class", "nodelink");
            }
        }
    }
    var link = vis.selectAll(".templink").data(data);

//    console.log(selectedNode);
//    console.log(selectedNode.parent);





    link.enter().append("path")
        .attr("class", "templink")
        .attr("d", d3.svg.diagonal() )
        .attr('pointer-events', 'none');

    link.attr("d", d3.svg.diagonal() )

    link.exit().remove();
}

// ------------- normal tree drawing code --------
var vis = d3.select("#viz").append("svg").attr("width", 400).attr("height", 300).append("svg:g").attr("transform", "translate(50, 0)")
var tree = d3.layout.tree().size([200,200]);
var nodes = tree.nodes(treeData);
var links = tree.links(nodes);
console.log(links);

var diagonalHorizontal = d3.svg.diagonal().projection( function(d) { return [d.y, d.x]; } );
var paths = vis.selectAll(".nodelink")
    .data(links)
    .enter().append("path")
    .attr("class", "nodelink")
    .attr("d", diagonalHorizontal)
    .attr('pointer-events', 'none');
console.log(paths);

var node = vis.selectAll("g.node")
    .data(nodes)
    .enter().append("g")
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

node.append("circle")
    .attr("r", 5)
    .attr('pointer-events', 'none');

// ------------- trickery to avoid collision detection

// phantom node to give us mouseover in a radius around it
node.append("circle")
    .attr("r", 60)
    .attr("opacity", 0.3) // change this to non-zero to see the target area
    .attr('pointer-events', 'mouseover')
    .on("mouseover", overCircle)
    .on("mouseout", outCircle)

// a new, unconnected node that can be dragged near others to connect it
newNodes = [ {x:300,y:5, name: 'new'} ];
vis.selectAll(".lonely")
    .data(newNodes).enter().append("circle")
    .attr("r", 5)
    .attr("class", "lonely")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .call(circleDragger)