var paper = Snap('#svg');


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
var c1 = new Commit(null, 'd8f48d2be4a4a5e4e1a8586ad053352895d549dd');
var c2 = new Commit(c1, '82afc861db40832ac700c2c7c80badf244882ff4');
var c3 = new Commit(c2, '36c3a190c217a36cabab42c73c77104cf25182da');
var d1 = new Commit(c2, 'fdac3c051441f7762d84087c8ebdf9a64cbac272');
var d2 = new Commit(d1, '6a41c66e604cdacc10d0dc6c82f39e47270dcd10');
var d3 = new Commit(d2, '7d58272908d9fa48b5a87453523f9516d37df5d5');
var master_head = c3;

var master = new Branch(master_head);
var feature1 = new Branch(d3);
var branches = [master, feature1];

var cur_x = 750;

function draw_commit(commit) {
  var c1 = paper.circle(commit.x, commit.y, 14),
      c2 = paper.circle(commit.x, commit.y, 10);
  c1.attr({
    fill: '#932d70'
  });
  c2.attr({
    fill: '#932d70',
    stroke: '#FFF',
    strokeWidth: (2) + 'px'
  });
  paper.text(commit.x-15, commit.y+25, commit.id.substr(0,6));
  commit.drawn = true;
}

function draw_connector(commit1, commit2) {
  var connector = paper.path("M" + commit1.x +"," + commit1.y + " " + commit2.x + "," + commit2.y);
  connector.attr({
    fill: '#dedede',
    stroke: '#4182c4',
    strokeWidth: '2px',
    opacity: 0.5
  });
}

function move_pen() {
  cur_x -= 100;
}

function render(commit, y) {
  commit.x = cur_x;
  commit.y = y;
  draw_commit(commit);
  move_pen();
  
  if(commit.parent && commit.parent.drawn) {
    draw_connector(commit.parent, commit);
  }
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

function renderGraph(points, config) {
  _.each(points, function(p){
    console.log('rendering ' + p.id + ' on column: ' + p.col + ', row: ' + p.row);
  });
}

function walkBranch(head, max_depth) {
  var result = [];
  return result;
}

function walkTree(branches, max_depth) {
  var branchIdx = 0;
  var result = [];
  _.each(branches, function(branch) {
    result.concat(result, walkBranch(branch.head, max_depth);
    branchIdx++;
  });
}

function Point(id, x, y) {
  this.id = id;
  this.x = null;
  this.y = null;
}

(function(){
  var MAX_COLUMNS = 10;
  //pass 1 - assign column
  var fooResults = walkTree(branches, MAX_COLUMNS);
  //pass 2 - render commits
  renderGraph(fooResults, {
    columns: MAX_COLUMNS,
    rows: 2
  });
})();
