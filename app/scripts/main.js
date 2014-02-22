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
    result.concat(result, walkBranch(branch.head, max_depth));
    branchIdx++;
  });
}

function Point(id, x, y) {
  this.id = id;
  this.x = null;
  this.y = null;
}

var MAX_COLUMNS = 10;
//pass 1 - assign column
var fooResults = walkTree(branches, MAX_COLUMNS);
//pass 2 - render commits
renderGraph(fooResults, {
  columns: MAX_COLUMNS,
  rows: 2
});
