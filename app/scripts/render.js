var paper = Snap('#svg');

var curr_left = 800;
function move_viewport_left() {
  curr_left+=150;
  $('#viewport').animate({scrollLeft: curr_left});
}

function move_viewport_right() {
  curr_left-=150;
  $('#viewport').animate({scrollLeft: curr_left});
}

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
var c4 = new Commit(c3, '42afba9dae229e85606b75b8e4e8d3443edaf237');
var c5 = new Commit(c4, '3a1d98d866bfc0b372bd7a15c8f07c67319697c6');
var c6 = new Commit(c5, '2e8f05f3d4644f7b6b34db5a7a984bce4a6eac06');
var c7 = new Commit(c6, '42e4a72ae4a548d0f6b2df069126cd8fd5b62963');
var c8 = new Commit(c7, '923ec71da5063575b9253c55a1a4c95df0551520');
var c9 = new Commit(c8, '4c0ead4379103cd790b7886e121dfe76b09781b5');
var d1 = new Commit(c2, 'fdac3c051441f7762d84087c8ebdf9a64cbac272');
var d2 = new Commit(d1, '6a41c66e604cdacc10d0dc6c82f39e47270dcd10');
var d3 = new Commit(d2, '7d58272908d9fa48b5a87453523f9516d37df5d5');

var master_head = c9;
var master = new Branch(master_head);
var feature1 = new Branch(d3);
var branches = [master, feature1];

function Canvas() {
  this.reset_commits();
}
Canvas.prototype.reset_commits = function() {
  function reset(commit) {
    commit.drawn = false;
    if (commit.parent != null) reset(commit.parent);
  }
  for(var i=0; i < branches.length; i++)
    reset(branches[i].head);
}
Canvas.prototype.paint_at = function(orig_x) {
  var cur_x = orig_x;

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

  var head = master.head;
  render(master.head, 50);

  cur_x = orig_x;
  head = feature1.head;
  render(feature1.head, 200);
}

function PaintAt(x) {
  $('#svg').empty();
  new Canvas().paint_at(x);
}

PaintAt(900);
