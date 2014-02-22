var indicator = document.querySelector("#indicator");

var moveInProgress = false;
function setMovementInProgress() {
  moveInProgress = true;
  setTimeout(function() { moveInProgress = false; }, 500);
}

LeapManager.init({
  maxCursors:5,
  gestureScope:this,
  gestureCallback:function(e){
    if(e.type === "swipe" && !moveInProgress) {
      console.log(e.state);
      if (e.direction[0] > 0) {
        setMovementInProgress();
        move_viewport_right();
        console.log("swipe right");
      }
      else {
        setMovementInProgress();
        move_viewport_left();
        console.log("swipe left"); 
      }
    }
  }
});