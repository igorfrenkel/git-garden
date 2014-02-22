var paper = Snap('#svg');
/*
var g1 = paper.g(c1, c2);

window.setInterval(function(){

  c1.animate({r: 22 },
             250,
             );
             
c2.animate({r: 20 },
             250,
             mina.elastic);
}, 500);
*/

function draw_base(scale) {
  var y1 = 50;
  var line_width = 4 * scale + 'px';
  var line1 = paper.line(0, y1, 1000, y1);
  line1.attr({
    stroke: '#4182c4',
    strokeWidth: line_width
  });
  y2 = y1 + 150 * scale;
/*  var line2 = paper.line(200,y2,1000,y2);
  line2.attr({
    stroke: '#4182c4',
    strokeWidth: line_width,
    opacity: 0.5
  });
  var connector = paper.path("M100," + y1 + " C200,125 150,175 200," + y2);
  connector.attr({
    fill: '#dedede',
    stroke: '#4182c4',
    strokeWidth: line_width,
    opacity: 0.5
  });*/
  /* <path d="M29,109 C136,193 148,268 196,269 Z" /> */

/*  var c1 = paper.circle(100, 50, 14 * scale),
      c2 = paper.circle(100, 50, 10 * scale);
  c1.attr({
    fill: '#932d70'
  });
  c2.attr({
    fill: '#932d70',
    stroke: '#FFF',
    strokeWidth: (2 * scale) + 'px'
  });*/
}

//draw_base(1);

function Branch(head) {
  this.head = head;
}

function Commit(parent, id) {
  this.parent = parent;
  this.id = id;
  this.x = null;
  this.y = null;
  this.drawn = false;
}

var scale = 1;
var c1 = new Commit(null, 'c1');
var c2 = new Commit(c1, 'c2');
var c3 = new Commit(c2, 'c3');
var d1 = new Commit(c2, 'd1');
var d2 = new Commit(d1, 'd2');
var d3 = new Commit(d2, 'd3');
var master_head = c3;

var master = new Branch(master_head);
var feature1 = new Branch(d3);
var branches = [master, feature1];

var cur_x = 750;

function draw_commit(y) {
  var c1 = paper.circle(cur_x, y, 14),
      c2 = paper.circle(cur_x, y, 10);
  c1.attr({
    fill: '#932d70'
  });
  c2.attr({
    fill: '#932d70',
    stroke: '#FFF',
    strokeWidth: (2) + 'px'
  });
  var old_x = cur_x;
  cur_x -= 100;
  return {
    x: old_x,
    y: y
  };
}

function draw_connector(commit1, commit2) {
  
  /*var connector = paper.path("M" + commit1.x +"," + commit1.y + " C200,125 150,175 " + commit2.x + "," + commit2.y);
*/  
  var connector = paper.path("M" + commit1.x +"," + commit1.y + " " + commit2.x + "," + commit2.y);
  
  connector.attr({
    fill: '#dedede',
    stroke: '#4182c4',
    strokeWidth: '2px',
    opacity: 0.5
  });
}

function render(commit, y) {
  //draw right most commit
  coords = draw_commit(y);
  commit.drawn = true;
  commit.x = coords.x;
  commit.y = coords.y;
  if(commit.parent && commit.parent.drawn) {
    draw_connector(commit.parent, commit);
  }
  // if commit has parent
  //   render parent
  else if(commit.parent != null) {
    render(commit.parent, y);
    draw_branch(commit, commit.parent);
  }
}

function draw_branch(beginning, end) {
  var y1 = 50;
  var line_width = 4 * scale + 'px';
  var line1 = paper.line(beginning.x, beginning.y, end.x, end.y);
  line1.attr({
    stroke: '#4182c4',
    strokeWidth: line_width
  });
  y2 = y1 + 150 * scale;
}

var head = master.head;
render(master.head, 50);

cur_x = 750;
head = feature1.head;
render(feature1.head, 200);
