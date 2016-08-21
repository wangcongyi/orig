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