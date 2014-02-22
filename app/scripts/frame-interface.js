function CanvasCommit(id, cp) {
  this.id = id;
  this.point = cp;
}

function CanvasPoint(col, row) {
  this.row = row;
  this.col = col;
}

function CanvasBranch(p0, p1) {
  this.p0 = p0;
  this.p1 = p1;
}

function OffCanvasBranch() {
}

function Frame(commits, branches, connectors) {
  this.commits = commits;
  this.branches = branches;
  this.connectors = connectors;
}

Frame.prototype.previousFrame = function() {}
Frame.prototype.nextFrame = function() {}