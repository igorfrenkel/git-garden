function renderGraph(frame, config) {
  _.each(frame.commits, function(commit) {
    //render commit
    console.log('rendering ' + commit.id + ' on column: ' + commit.point.col + ', row: ' + commit.point.row);
  });
  _.each(frame.branches, function(branch) {
    //render branch
    console.log('rendering branch from: ' + branch.p0 + ' to ' + branch.p1);
  });
  _.each(frame.connectors, function(connector) {
    //render connector
    console.log('rendering connector from: ' + connector.p0 + ' to ' + connector.p1);
  });
}

function walkBranch(cur_commit, branchIdx, depth) {
  var p = new CanvasCommit(cur_commit.id, new CanvasPoint(depth-1, branchIdx));
  if(depth == 0 || cur_commit.parent == null) return [p];
  else return [p].concat(walkBranch(cur_commit.parent, branchIdx, depth-1));
}

function walkTree(branches, max_depth) {
  var branchIdx = 0;
  var commits = c_branches = connectors = [];
  _.each(branches, function(branch) {
    commits = commits.concat(walkBranch(branch.head, branchIdx, max_depth));
    branchIdx++;
  });
  return new Frame(commits, c_branches, connectors);
}

var MAX_COLUMNS = 10;
//pass 1 - assign column
var frame = walkTree(branches, MAX_COLUMNS);
//pass 2 - render commits
renderGraph(frame, {
  columns: MAX_COLUMNS,
  rows: 2
});
