
// 获取伪类样式ֵ

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

var num = 1;
$(btn2).click(function () {
    num == 8 && (num = 0);
    $(Ul).animate({
        left: -450 * num
    }, 1000);
    num++;
});
$(btn1).click(function () {
    if(num==1){
        $(Ul).animate({
            left:-450*7
        },1000);
        num = 8
    }else{
        $(Ul).animate({
            left:Ul.offsetLeft+450
        },1000);
        num --;
    }

});


//    var a = 1;
//
//
//    var color = 'red';
//
//
//    var colorObj = {
//        'black': printBlackBackground,
//        'red': printRedBackground,
//        'blue': printBlueBackground,
//        'green': printGreenBackground,
//        'yellow': printYellowBackground
//    };
//
var data = {
    status: '2'
};

var fn = {
    "1": a1,
    "2": a2,
    "3": a3
};
if(data.status in fn){
    $.isFunction(fn[data.status]) && fn[data.status]()
    //  fn[data.status]()
}

//
//    if (color in colorObj) {
//        colorObj[color]();
//    }


function a1() {
    console.log(111)
}
function a2() {
    console.log(2221)
}
function a3() {
    console.log(1333)
}
function a4() {
    console.log(1444)
}

/*
 var fncList = {
 a: function () {
 console.log(1)
 },
 b: function () {
 console.log(2)
 }
 };


 $(document).on('click', '[data-action]', function () {
 var data = $(this).data('action');
 var action = fncList[data];
 $.isFunction(action) && action();
 })
 */
