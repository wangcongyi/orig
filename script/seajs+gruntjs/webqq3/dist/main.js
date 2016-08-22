// JavaScript Document
//A开发
define("main", [ "./drag", "./scale", "./range" ], function(require, exports, module) {
    var oInput = document.getElementById("input1");
    var oDiv1 = document.getElementById("div1");
    var oDiv2 = document.getElementById("div2");
    var oDiv3 = document.getElementById("div3");
    require("./drag").drag(oDiv3);
    oInput.onclick = function() {
        oDiv1.style.display = "block";
        require("./scale").scale(oDiv1, oDiv2);
    };
});

// JavaScript Document
//B开发
define("drag", [], function(require, exports, module) {
    function drag(obj) {
        var disX = 0;
        var disY = 0;
        obj.onmousedown = function(ev) {
            var ev = ev || window.event;
            disX = ev.clientX - obj.offsetLeft;
            disY = ev.clientY - obj.offsetTop;
            document.onmousemove = function(ev) {
                var ev = ev || window.event;
                var L = ev.clientX - disX;
                var T = ev.clientY - disY;
                //L = require('./range.js').range(L , document.documentElement.clientWidth - obj.offsetWidth , 0);
                //T = require('./range.js').range(T , document.documentElement.clientHeight - obj.offsetHeight , 0);
                obj.style.left = L + "px";
                obj.style.top = T + "px";
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        };
    }
    exports.drag = drag;
});

// JavaScript Document
//C开发
define("scale", [ "./range" ], function(require, exports, module) {
    function scale(obj1, obj2) {
        var downX = 0;
        var downY = 0;
        var downW = 0;
        var downH = 0;
        obj2.onmousedown = function(ev) {
            var ev = ev || window.event;
            downX = ev.clientX;
            downY = ev.clientY;
            downW = obj1.offsetWidth;
            downH = obj1.offsetHeight;
            document.onmousemove = function(ev) {
                var ev = ev || window.event;
                var W = ev.clientX - downX + downW;
                var H = ev.clientY - downY + downH;
                W = require("./range").range(W, 500, 100);
                H = require("./range").range(H, 500, 100);
                obj1.style.width = W + "px";
                obj1.style.height = H + "px";
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        };
    }
    exports.scale = scale;
});

// JavaScript Document
define("range", [], function(require, exports, module) {
    function range(val, max, min) {
        if (val > max) {
            return max;
        } else if (val < min) {
            return min;
        } else {
            return val;
        }
    }
    exports.range = range;
});
