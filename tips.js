// 获取伪类样式ֵ

//var color = window.getComputedStyle(document.querySelector('.element'), ':before').getPropertyValue('color');
//
//
//var a = 10;
//var b;
//a == 10 && fn1() & fn2();
//
////  a == undefined || (b = 234);
////  console.log(b);
//function fn1() {
//    console.log(1)
//}
//function fn2() {
//    console.log(2)
//}
//
//
//function addEvent(obj, ev, fn) {
//    obj['bind' + ev] = obj['bind' + ev] || {};
//    obj['bind' + ev]['bind' + fn] = obj['bind' + ev]['bind' + fn] || function () {
//            fn.call(obj)
//        };
//
//    obj.attachEvent('on' + ev, obj['bind' + ev]['bind' + fn])
//}
//function removeEvent(obj, ev, fn) {
//    if (obj['bind' + ev]['bind' + fn]) {
//        obj.detachEvent('on' + ev, obj['bind' + ev]['bind' + fn])
//    }
//}
//
//var num = 1;
//$(btn2).click(function () {
//    num == 8 && (num = 0);
//    $(Ul).animate({
//        left: -450 * num
//    }, 1000);
//    num++;
//});
//$(btn1).click(function () {
//    if (num == 1) {
//        $(Ul).animate({
//            left: -450 * 7
//        }, 1000);
//        num = 8
//    } else {
//        $(Ul).animate({
//            left: Ul.offsetLeft + 450
//        }, 1000);
//        num--;
//    }
//
//});


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
//var data = {
//    status: '2'
//};
//
//var fn = {
//    "1": a1,
//    "2": a2,
//    "3": a3
//};
//if (data.status in fn) {
//    $.isFunction(fn[data.status]) && fn[data.status]()
//    //  fn[data.status]()
//}

//
//    if (color in colorObj) {
//        colorObj[color]();
//    }


//function a1() {
//    console.log(111)
//}
//function a2() {
//    console.log(2221)
//}
//function a3() {
//    console.log(1333)
//}
//function a4() {
//    console.log(1444)
//}

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







//    if (obj) {
//        if (obj.a) {
//            if (obj.a.b.length > 0) {
//                b = obj.a.b
//            }
//        }
//    }
//b = obj && obj.a && obj.a.b && obj.a.b.c;


//   QQ在线咨询~~~~其实真简单    一个链接+qq号就OK了~~~~
//   http://wpa.qq.com/msgrd?v=3&uin=  “QQ号”  &site=qq&menu=yes


/*
 *    attr & prop
 *
 *
 * */
//var str0 = '<div class="reading"><div class="re-text">相关阅读</div><div class="re-ul"><li><a uuid="C7033408C56000015CF883D0D800B6A0" href="sfsdf" target="_blank" class="reader">fsdf</a></li><li><a uuid="C7033408C57000019CBC1B20A1A5AFB0" href="sdfsdf" target="_blank" class="reader">fsdf</a></li><li><a uuid="C7033408C5700001E6311E2019C088A0" href="fsd" target="_blank" class="reader">fsdfsd</a></li></div></div>';
//
//console.log(getUuid(str0,"uuid1"));
//console.log(getUuid(str0,"uuid"));
//alert(getUuid(str0,"uuid"));
//alert(getUuid(str0,"class"));
/**
 * @description  获取标签所有熟悉值
 * @param str
 * @param sign
 * @returns {Array}
 */
//function getUuid(str,sign){
//    var arr = [];
//    str.replace(new RegExp(sign+"=\"\\w+","gi"),function($0){
//        arr.push($0.replace(new RegExp(sign+"=\"","gi"),""));
//    });
//    return arr;
//};

/*
 *    获取 字符串中的数字  不使用正则
 *
 * */
//var str = 'sdaddf444sfsfdsf8485sdfsdfdsfds18526dfdsfdsfdsf2dfsdf58';
//  [444,8485,18526,2,58]
//var s;
//var r = [];
//for (var i = 0, l = str.length; i < l; ++i) {
//    if (typeof s === 'undefined' && str[i] >= '0' && str[i] <= '9') {
//        s = i;
//    }
//    if (typeof s !== 'undefined' && (str[i] < '0' || str[i] > '9')) {
//        r.push(str.substr(s, i - s));
//        s = undefined;
//    }
//}
//if (typeof s !== 'undefined') {
//    r.push(str.substr(s))
//}


/**
 * @description  闭包返回定时器 再次调用
 * @param {Function} fn     传人的回调函数
 * @param {Number}   times  次数
 * @param {Number}   delay  间隔时间
 * @returns {Function}
 */
//function f(fn, times, delay) {
//    var t, n = 0;
//    return function (str) {
//        t = setInterval(function () {
//            if (n == times - 1) {
//                clearInterval(t);
//                t = null;
//                n = null;
//            }
//            fn(str);
//            n++;
//        }, delay)
//    }
//}
//
//var a = f(alert, 6, 1000);
//a('你好');

/**
 *  @description    javascript 设计模式 工厂模式  稍作修改 有可能UI都是相同的所以把UI也抽出来 后台传递的data参数
 * @param type
 * @param content
 * @returns {*}
 * @constructor
 */
//var F = function (type, content) {
//    return this[type](content)
//};
//F.prototype = {
//    Java: function (content) {
//        this.UI(content, 'red');
//    },
//    JavaScript: function (content) {
//        this.UI(content, 'green')
//    },
//    UI: function (content, color) {
//        this.content = content;
//        (function (content) {
//            var div = document.createElement('div');
//            div.innerHTML = content;
//            div.style.color = color;
//            document.querySelector('#id').appendChild(div)
//        })(content)
//    }
//};
//var data = [
//    {type: 'Java', content: 'Thisi sisd Java'},
//    {type: 'JavaScript', content: 'Thisi sisd javascsfeprsdsd'}
//];
//var i = 0;
//for (; i < data.length; i++) {
//    new F(data[i].type, data[i].content)
//}

/**
 *    hover 延时事件发生  如果用户快速经过 就不触发hover
 *    代码可以待改进
 */

//$('img').hover(function () {
// var self = $(this);
// clearTimeout(t1);
// t2 = setTimeout(function () {
//  self.animate({width: 1000}, 500, 'linear')
// }, 1000)
//}, function () {
// var self = $(this);
// clearTimeout(t2);
// t1 = setTimeout(function () {
//  self.animate({width: 500}, 500, 'linear')
// }, 1000)
//})

/**
 * @description    javascript 状态模式  状态变成私有变量 返回一个对象接口 可以对状态修改或者调用
 * @returns {{change: (Action.changeState|Function), goes: (Action.goes|Function)}}
 * @constructor
 */
//var MarryState = function () {
//    var _currentState = {},
//        states = {
//            jump: function () {
//                console.log('jump')
//            },
//            move: function () {
//                console.log('move')
//            },
//            shoot: function () {
//                console.log('shoot')
//            },
//            squat: function () {
//                console.log('squat')
//            }
//        };
//    var Action = {
//        changeState: function () {
//            var arg = arguments;
//            if (arg.length) {
//                for (var i = 0; i < arg.length; i++) {
//                    _currentState[arg[i]] = true
//                }
//            }
//            return this
//        },
//        goes: function () {
//            console.log('changeOnce');
//            for (var i in _currentState) {
//                states[i] && states[i]()
//            }
//            return this
//        }
//    };
//    return {
//        change: Action.changeState,
//        goes: Action.goes
//    }
//};
//var m = new MarryState();
//m.change('jump').goes().change('shoot').goes();