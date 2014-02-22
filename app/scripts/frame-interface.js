function Frame(commits, branches, connectors) {
  this.commits = commits;
  this.branches = branches;
  this.connectors = connectors;
}

Frame.prototype.previousFrame = function() {}
Frame.prototype.nextFrame = function() {}