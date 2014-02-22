function renderGraph(points, config) {
  _.each(points, function(p){
    console.log('rendering ' + p.id + ' on column: ' + p.col + ', row: ' + p.row);
  });
}

function walkBranch(cur_commit, branchIdx, depth) {
  var p = new CanvasCommit(cur_commit.id, depth-1, branchIdx);
  if(depth == 0 || cur_commit.parent == null) {
    return [p];
  }
  else {
    return [p].concat(walkBranch(cur_commit.parent, branchIdx, depth-1));
  }
}

function walkTree(branches, max_depth) {
  var branchIdx = 0;
  var result = [];
  _.each(branches, function(branch) {
    result = result.concat(walkBranch(branch.head, branchIdx, max_depth));
    branchIdx++;
  });
  return result;
}

function CanvasCommit(id, col, row) {
  this.id = id;
  this.col = col;
  this.row = row;
}

var MAX_COLUMNS = 10;
//pass 1 - assign column
var fooResults = walkTree(branches, MAX_COLUMNS);
//pass 2 - render commits
renderGraph(fooResults, {
  columns: MAX_COLUMNS,
  rows: 2
});
