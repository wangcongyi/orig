
// 获取 .element:before的color值

var color = window.getComputedStyle(document.querySelector('.element'), ':before').getPropertyValue('color');






var a = 10;
var b;
a == 10 && (fn1() & fn2());

//  a == undefined || (b = 234);
//  console.log(b);
function fn1() {
    console.log(1)
}
function fn2() {
    console.log(2)
}




function addEvent(obj, ev, fn) {
    obj['bind' + ev] = obj['bind' + ev] || {};
    obj['bind' + ev]['bind' + fn] = obj['bind' + ev]['bind' + fn] || function () {
            fn.call(obj)
        };

    obj.attachEvent('on'+ev,obj['bind' + ev]['bind' + fn])
}
function removeEvent(obj,ev,fn){
    if(obj['bind' + ev]['bind' + fn] ){
        obj.detachEvent('on'+ev,obj['bind' + ev]['bind' + fn])
    }
}

