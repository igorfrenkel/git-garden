//JSON object with the data
var treeData1 = [
 { 
   id: "42afba9dae229e85606b75b8e4e8d3443edaf237",
   parent: undefined
 },
 {
   id: "3a1d98d866bfc0b372bd7a15c8f07c67319697c6",
   parent: "42afba9dae229e85606b75b8e4e8d3443edaf237" 
 },
 { 
   id: "1a410efbd13591db07496601ebc7a059dd55cfe9",
   parent: "42afba9dae229e85606b75b8e4e8d3443edaf237"
 },
 { 
   id: "123456d866bfc0b372bd7a15c8f07c67319697c6",
   parent: "3a1d98d866bfc0b372bd7a15c8f07c67319697c6"
 }
];

//var treeData = convertGitObject(treeData1);
//function convertGitObject(obj) {
//}

var w = $(window).width();
var h = $(window).height();
var fill = d3.scale.category20();
var vis = d3.select("#viz").append("svg:svg")
                           .attr("width", w)
                           .attr("height", h)
                           .append("svg:g")
                           .attr("transform", "translate(40, 0)"); // shift everything to the right

// Create a tree "canvas"
var tree = d3.layout.tree()
  .size([h*0.8,w*0.8]);

d3.json("scripts/commits.json", function(json) {

  var force = d3.layout.force()
                       .charge(-120)
                       .distance(60)  
                       .gravity(.1)
                       .nodes(json.nodes)
                       .links(json.links)
                       .size([w, h])
                       .start();

  var link = vis.selectAll('line.link')
    .data(json.links)
    .enter().append('svg:line')
    .attr("class", "link")       
    .style('stroke-width', 3)
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

  var node = vis.selectAll("circle.node")
    .data(json.nodes)
    .enter().append("svg:circle")
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 5)
    .on('mouseover', function(d){
      console.log(d);
          var nodeSelection = d3.select(this).style({opacity:'0.8'});
              nodeSelection.select("text").style({opacity:'1.0'});
    })
    .style("fill", function(d) { return fill(d.group); })
    .call(force.drag);

  node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

  force.on("tick", function(e) { 

    var k = .5 * e.alpha; 
    node.each(function(d) { 
      d.x += ((4 + d.group) * 100 - d.x) * k; 
    });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x ; })
      .attr("cy", function(d) { return d.y; });
  });
});
