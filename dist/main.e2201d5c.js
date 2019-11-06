// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var canvas = document.querySelector('#canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight - 50;
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.strokeStyle = 'black';
ctx.lineCap = 'round';
ctx.lineWidth = '3';
var drawing1 = true;
var drawing2;
var rubber1;
var rubber2;
var t = 1.5; //防止手机端滑动

function preventBehavior(e) {
  e.preventDefault();
}

;
document.addEventListener("touchmove", preventBehavior, {
  passive: false
}, false); //画线

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1 - 50);
  ctx.lineTo(x2, y2 - 50);
  ctx.stroke();
} //选色盘


var $button = document.querySelector('#button');
var colorPreview = document.querySelector('#color-preview');
var colorRight = document.querySelector('#color-right');
var colorWrapper = true;
$button.addEventListener('click', function (e) {
  if (colorWrapper) {
    $button.style.transform = 'rotate(180deg)';
    colorPreview.style.display = 'none';
    colorRight.style.cssText = "border-top-left-radius:50% 5%;border-top-right-radius: 50% 5%;border-bottom-right-radius: 50% 5%;border-bottom-left-radius: 50% 5%;left:0";
    setTimeout(function () {
      colorWrapper = false;
    });
  }

  if (colorWrapper === false) {
    $button.style.transform = 'rotate(0deg)';
    colorRight.style.cssText = 'left:100;border-top-right-radius:100% 10%;border - bottom - right - radius: 100 % 10 %';
    colorPreview.style.display = 'flex';
    colorWrapper = true;
  }
}); //选色

function color(x1, x2, x3, x4, x5, x6, x7, x8) {
  $("#".concat(x1)).addClass('active');
  $("#".concat(x2)).removeClass('active');
  $("#".concat(x3)).removeClass('active');
  $("#".concat(x4)).removeClass('active');
  $("#".concat(x5)).removeClass('active');
  $("#".concat(x6)).removeClass('active');
  $("#".concat(x7)).removeClass('active');
  $("#".concat(x8)).removeClass('active');
}

var colorArray = ['black', 'red', 'yellow', 'pink', 'green', 'blue', 'grey', 'brown'];
colorArray.forEach(function (newColor, i) {
  $("#".concat(newColor)).on('click', function () {
    var newArray = colorArray.slice(0);
    newArray.splice(i, 1);
    color(newColor, newArray[0], newArray[1], newArray[2], newArray[3], newArray[4], newArray[5], newArray[6]);
    ctx.strokeStyle = newColor;
    ctx.fillStyle = newColor;
  });
}); //线宽

var lineWidthMap = [{
  value: '1',
  lineWidth: '3',
  t: 2
}, {
  value: '2',
  lineWidth: '5',
  t: 2.5
}, {
  value: '3',
  lineWidth: '7',
  t: 3.5
}, {
  value: '4',
  lineWidth: '10',
  t: 5
}];
lineWidth.addEventListener('input', function (e) {
  for (var i = 0; i < lineWidthMap.length; i++) {
    if (e.target.value === lineWidthMap[i].value) {
      ctx.lineWidth = lineWidthMap[i].lineWidth;
      t = lineWidthMap[i].t;
    }
  }
}); //笔

var pen = document.querySelector('#pen');
pen.addEventListener('click', function () {
  pen.classList.add('active2');
  eraser.classList.remove('active2');
  drawing1 = true;
  rubber1 = false;
  rubber2 = false;
}); //橡皮

var eraser = document.querySelector('#eraser');
eraser.addEventListener('click', function () {
  eraser.classList.add('active2');
  pen.classList.remove('active2');
  drawing1 = false;
  rubber1 = true;
});
var lastX;
var lastY; //兼容移动端

var DownOrStart = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
var MouseOrTouch = 'ontouchmove' in window ? 'touchmove' : 'mousemove';
var UpOrEnd = 'ontouchend' in window ? 'touchend' : 'mouseup';
var X;
var Y;
var $eraser = document.querySelector('#eraser-wrapper');
var restore = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
canvas.addEventListener(DownOrStart, function (e) {
  if (drawing1) {
    drawing2 = true;
    X = e.clientX || e.targetTouches[0].clientX;
    Y = e.clientY || e.targetTouches[0].clientY;
    lastX = X;
    lastY = Y;
  }

  if (rubber1) {
    rubber2 = true;
    X = e.clientX || e.targetTouches[0].clientX;
    Y = e.clientY || e.targetTouches[0].clientY;
    $eraser.style.display = 'block';
    $eraser.style.left = X - 110 + 'px';
    $eraser.style.top = Y - 58 + 'px';
    ctx.clearRect(X - 10, Y - 61, 20, 20);
  }
});
var ClickSave = 'ontouchmove' in window ? true : false;
var H;
canvas.addEventListener(MouseOrTouch, function (e) {
  if (ClickSave === true) {
    H = false;
  }

  if (drawing2) {
    X = e.clientX || e.targetTouches[0].clientX;
    Y = e.clientY || e.targetTouches[0].clientY;
    drawLine(lastX, lastY, X, Y);
    lastX = X;
    lastY = Y;
  }

  if (rubber2) {
    X = e.clientX || e.targetTouches[0].clientX;
    Y = e.clientY || e.targetTouches[0].clientY;
    $eraser.style.display = 'block';
    $eraser.style.left = X - 110 + 'px';
    $eraser.style.top = Y - 58 + 'px';
    ctx.clearRect(X - 10, Y - 61, 20, 20);
  }
});
$eraser.addEventListener(UpOrEnd, function (e) {
  rubber2 = false;
  $eraser.style.display = 'none';

  if (restore.length > 0) {
    redo.style.color = 'black';
  }

  if (ClickSave === false) {
    setTimeout(function () {
      restore[restore.length] = ctx.getImageData(0, 0, canvas.width, canvas.height);
    });
  }

  if (ClickSave === true && H === false) {
    setTimeout(function () {
      restore[restore.length] = ctx.getImageData(0, 0, canvas.width, canvas.height);
      H = true;
    });
  }
});
canvas.addEventListener('click', function (e) {
  if (drawing1) {
    var _X = e.clientX || e.targetTouches[0].clientX;

    var _Y = e.clientY || e.targetTouches[0].clientY;

    ctx.beginPath();
    ctx.arc(_X, _Y - 50, t, 0, 2 * Math.PI);
    ctx.fill();
  }

  if (ClickSave === true) {
    setTimeout(function () {
      restore[restore.length] = ctx.getImageData(0, 0, canvas.width, canvas.height);
    });
  }
});
canvas.addEventListener(UpOrEnd, function (e) {
  drawing2 = false;
  $eraser.style.display = 'none';

  if (restore.length > 0) {
    redo.style.color = 'black';
  }

  if (ClickSave === false) {
    setTimeout(function () {
      restore[restore.length] = ctx.getImageData(0, 0, canvas.width, canvas.height);
    });
  }

  if (ClickSave === true && H === false) {
    setTimeout(function () {
      restore[restore.length] = ctx.getImageData(0, 0, canvas.width, canvas.height);
      H = true;
    });
  }
}); //撤回

redo.addEventListener('click', function (e) {
  if (restore.length > 1) {
    ctx.putImageData(restore[restore.length - 2], 0, 0);
    restore.length--;
  }

  if (restore.length <= 1) {
    redo.style.color = 'grey';
  }
}); //清除

clear.addEventListener('click', function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  restore.length = 1;
  redo.style.color = 'grey';
}); //保存

save.addEventListener('click', function () {
  var url = canvas.toDataURL("image/png");
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = '我的作品';
  a.target = '_blank';
  a.click();
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.e2201d5c.js.map