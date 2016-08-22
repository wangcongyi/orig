// JavaScript Document
define("range-debug", [], function(require, exports, module) {
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