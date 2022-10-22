export function snap(num) {
  const maxVal = 100;
  const minVal = 0;
  if (num > maxVal) {
    return maxVal;
  } else if (num < minVal) {
    return minVal;
  } else {
    return num;
  }
}

export function Background(ref) {
  var x_default = 30;
  var y_default = 30;
  var _mouseX = null;
  var _mouseY = null;

  function parallax(e) {
    // console.log("parallax");

    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;

    if (e != null) {
      _mouseX = e.clientX;
      _mouseY = e.clientY;
    }

    let _depth1 = `${snap(x_default - (_mouseX - _w) * 0.06)}% ${snap(
      y_default - (_mouseY - _h) * 0.06
    )}%`;

    let _depth2 = `${snap(x_default - (_mouseX - _w) * 0.05)}% ${snap(
      y_default - (_mouseY - _h) * 0.05
    )}%`;

    let _depth3 = `${snap(x_default - (_mouseX - _w) * 0.04)}% ${snap(
      y_default - (_mouseY - _h) * 0.04
    )}%`;

    let _depth4 = `${snap(x_default - (_mouseX - _w) * 0.03)}% ${snap(
      y_default - (_mouseY - _h) * 0.03
    )}%`;

    let _depth5 = `${snap(x_default - (_mouseX - _w) * 0.02)}% ${snap(
      y_default - (_mouseY - _h) * 0.02
    )}%`;

    let _depth6 = `${snap(x_default - (_mouseX - _w) * 0.01)}% ${snap(
      y_default - (_mouseY - _h) * 0.01
    )}%`;

    let x = `${_depth6}, ${_depth5}, ${_depth4}, ${_depth3}, ${_depth2}, ${_depth1}`;
    try {
      ref.current.style.backgroundPosition = x;
    } catch (e) {}
    //continue from here
  }

  function scrollHandler() {
    const minScroll = window.innerHeight;
    const maxScroll = document.body.clientHeight - minScroll;

    const determinePercentage = (scroll) => {
      return Math.floor((actualScroll * 100) / maxScroll);
    };

    const actualScroll = Math.floor(window.scrollY);
    const actualPercentage = determinePercentage(actualScroll);
    if (x_default > 90) {
      x_default = 90;
    } else {
      x_default = actualPercentage;
      parallax(null);
    }
  }

  // console.log("started");
  document.addEventListener("mousemove", parallax);
  document.addEventListener("scroll", scrollHandler);

  return () => {
    document.removeEventListener("mousemove", parallax);
    document.removeEventListener("scroll", scrollHandler);
  };
}
