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