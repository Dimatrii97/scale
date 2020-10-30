import $ from "jquery";
let max = 60;  
var checkScrollSpeed = (function (settings) {
  settings = settings || {};
  var lastPos,
    newPos,
    timer,
    delta,
    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();

  return function () {
    newPos = window.scrollY;
    if (lastPos != null) {
      // && newPos < maxScroll
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
})();

function debounce(cl, time) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        cl.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, time);
    };
}

function throttle(cl, time) {
  let flag = false;
  return function () {
    if (flag) {
      return
    }
    flag = true;
    let args = arguments;
    setTimeout(()=>{flag = false}, time);
    cl.apply(this, args);
  }
}


let setSkew = throttle(
  function (speed) {
    $(".img-item").css("transform", `skewY(${speed/15}deg)`);
  }, 50
)

let setBack =  debounce(function () {
  $(".img-item").css("transform", `skewY(0deg)`);
}, 90)

$(window).on("scroll", () => {
  
  let speed =  checkScrollSpeed();
 
  if(speed > max) speed = max;
  if(speed < -max) speed = -max;
  console.log(speed);
 setSkew(speed)
 setBack();
});





