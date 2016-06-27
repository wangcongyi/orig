// 获取伪类样式ֵ

//var color = window.getComputedStyle(document.querySelector('.element'), ':before').getPropertyValue('color');
//
///////////////////////////////////////////
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
//////////////////////////
// var s = 12;
//
// if (s == 122) {
//     console.log('OK')
// } else {
//     console.log('1');
//     console.log('2')
// }
// s == 1223 ? console.log('OK') : console.log(32) & console.log(34)

////////////////////////////////
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


/**
 *  @description     jq去封装一个插件  长按功能
 * @param delay      长按时间去触发方法
 * @param callback    方法
 * @returns {jQuery}  return this
 */
//(function ($) {
// $.fn.longPress = function (delay,callback) {
//  var d = delay || 1000;
//  var t = null;
//  var f = false;
//  $(this).on('mousedown', function () {
//   t = setTimeout(function () {
//    f = true;
//    callback.call(this);
//   }, d);
//  });
//  $(this).on('mouseup', function () {
//   !f && clearTimeout(t)
//  });
//  return this
// }
//})(jQuery);


/**
 * @description     替换全部
 * @usage   比如a->哈哈  b->呵呵  str是需要替换的字符串  obj是对应的替换关系
 * @param str
 * @param obj
 * @returns {string}
 */
//function replaceAll(str, obj) {
/////////////////////  String.prototype.replaceAll = function(){
//              var arr = this.split('');
// }
//    var arr = str.split('');
//    for (var i = 0; i < str.length; i++) {
//        for (var j in obj) {
//            if (arr[i] == j) {
//                arr[i] = obj[j]
//            }
//        }
//    }
//    return arr.join('')
//}


/*
 *     在伪元素上加点击事情
 *     :after之类的伪元素  不是真正DOM  无法添加事件
 *     但是 可以模拟出来
 *     主要思想根据鼠标点击的坐标来进行排断
 * */
/////////// style
/*
 *   #mything {
 width: 100px;
 height: 100px;
 position: relative;
 background: blue;
 }
 #mything:after {
 content: "x";
 font-size: 10px;
 position: absolute;
 top: 0;
 right: 0;
 background: red;
 width: 10px;
 height: 10px;
 }
 * */
/////////javascript
/*
 * $('#mything').click(function(e) {
 if (e.clientX > $(this).offset().left + 90 &&
 e.clientY < $(this).offset().top + 10) {
 // do something
 }
 });
 * */
////////////////////////////////
//postMessage 一个小坑
//在使用a链接打开新页面的时候  新页面不会马上触发message事件  必须在父页面用定时间包一层
//次日更新  在知乎上问了贺老师~~~https://www.zhihu.com/question/46816341
/*
 $(document).on('ready', function () {
 $('thead').on('click', 'a', function () {
 var newWindow = window.open('http://www.c.com/demo.html', 'title');
 setTimeout(function () {
 newWindow.postMessage('hello', 'http://www.c.com/demo.html');
 }, 0);
 })
 })
 */
//////////////////////////////////////////////////////
//使用canvas开发了一个截图功能
/*
 document.querySelector('#btn1').onchange = function () {
 var file = this.files[0];
 var reader = new FileReader();
 reader.readAsDataURL(file);
 reader.onload = function (e) {
 var d = e.target.result;
 var image = new Image();
 var c1 = document.getElementById('c1'),
 $1 = c1.getContext('2d'), w, h;
 var c3 = document.getElementById('c3'),
 $3 = c3.getContext('2d'),
 dx = c3.width = 200,
 dy = c3.height = 200;
 var c2 = document.getElementById('c2'),
 $2 = c2.getContext('2d');
 var t, l;
 image.src = d;
 image.onload = function () {
 w = c1.width = c2.width = image.width;
 h = c1.height = c2.height = image.height;
 $1.drawImage(image, 0, 0,w,h);
 c2.style.position = 'absolute';
 t = c1.getBoundingClientRect().top;
 l = c1.getBoundingClientRect().left;
 c2.style.top = t + 'px';
 c2.style.left = l + 'px';
 cutArea(10, 10);
 };
 function cutArea(x, y) {
 $2.clearRect(0, 0, w, h);
 $2.setLineDash([4, 2]);
 $2.strokeRect(x, y, dx, dy);
 $3.clearRect(0, 0, dx, dy);
 $3.drawImage(image, x, y, dx, dy, 0, 0, dx, dy)
 }

 function mouseMove(e) {
 var x = e.clientX || e.changedTouches[0].pageX;
 var y = e.clientY || e.changedTouches[0].pageY;
 e.preventDefault();
 if (x < l + dx / 2) {
 if (y < t + dy / 2) {
 cutArea(0, 0)
 } else if (y > t + h - dy / 2) {
 cutArea(0, h - dy)
 } else {
 cutArea(0, y - dy / 2 - t)
 }
 } else if (x > l + w - dx / 2) {
 if (y < t + dy / 2) {
 cutArea(w - dx, 0)
 } else if (y > h + t - dy / 2) {
 cutArea(w - dx, h - dy)
 } else {
 cutArea(w - dx, y - dy / 2 - t)
 }
 } else if (y < t + dy / 2) {
 cutArea(x - dx / 2 - l, 0)
 } else if (y > t + h - dy / 2) {
 cutArea(x - dx / 2 - l, h - dy)
 } else {
 cutArea(x - dx / 2 - l, y - dy / 2 - t)
 }
 }

 function removeEvent() {
 document.removeEventListener('mousemove', mouseMove);
 document.removeEventListener('touchmove', mouseMove);
 document.removeEventListener('mouseup', removeEvent);
 document.removeEventListener('touchend', removeEvent)
 }

 function startMove(e) {
 e.preventDefault();
 document.addEventListener('mousemove', mouseMove);
 document.addEventListener('touchmove', mouseMove);
 document.addEventListener('mouseup', removeEvent);
 document.addEventListener('touchend', removeEvent)
 }

 c2.addEventListener('mousedown', startMove);
 c2.addEventListener('touchstart', startMove);
 };
 };
 document.querySelector('#btn2').addEventListener('click', function (e) {
 e.preventDefault();
 }, false);
 */

//////////////////////
//页面重构的时候 可以使用伪类元素的背景图  但是宽高不受限制
//.logo:after{
// /*content: url("path.png");*/
// /*display: inline-block;*/
// /*width: 26px;*/
// /*height: 26px;*/
//***********************************
// background-image: url("path.png");
// background-size: 10px 20px;// background-size: 100%
// display: inline-block;
// width: 26px;
// height: 26px;
// content:"";
//}
/////////////////////////////

////////////////
//  input type = file 的时候  如果重新选择上一次的文件 是不会再次触发change事件的
//  要想保证类型为file的input在每次选择文件后都触发change事件只需要在执行完需要的逻辑后把它的value属性设置为某个值，比如空字符串就可以了。
/*
 *   btn.onchange = function () {
 *   div.innerHTML = '';
 *   var image = new Image();
 *   image.src = this.files[0].name;
 *   div.appendChild(image);
 *   var C = new Cropper(image);
 *   div.style.display = 'block';
 *   this.value = '';    ~！！！！！！！！！！！！！！！！！    
 *
 * */




///////////
/*
 *    用react去'代替jade'        可惜好像没有事件
 *    express-react-views
 *   var express = require('express');
 *   var app = express();
 *
 *   app.set('views',__dirname+'/views');
 *   app.set('view engine','jsx');
 *   app.engine('jsx',require('express-react-views').createEngine());
 *   app.set('port', 3000);
 *   app.listen(3000);
 *   app.get('/',require('./routes').index);
 *   app.get('/admin',require('./routes').admin);
 *   var React = require('react');
 var Student = require('./student');
 var data = [
 {name: 'king', age: 20, other: 'nothing'},
 {name: 'kinga', age: 20, other: 'nothingB'},
 {name: 'kingb', age: 20, other: 'nothingA'}
 ]
 var Hello = React.createClass({
 render: function () {
 return (
 <div>
 Hello {this.props.name.toLowerCase()}
 <Student data={data}/>
 </div>
 )
 }
 });

 module.exports = Hello;
 var React = require('react');

 var Student = React.createClass({
 getInitialState: function () {
 return {
 data: this.props.data
 }
 },
 render: function () {
 return (
 <div>
 {this.state.data.map(function (item, index) {
 return (
 <div key={index}>
 <h3>{item.name}</h3>
 <h4>{item.age}</h4>
 <h5>{item.other}</h5>
 </div>
 )
 })}
 </div>
 )
 }
 });

 module.exports = Student;
 * */

/////////////////////////////////////
/**
 * @description 超简化的模板
 * @param source
 * @param words
 * @returns {void|string|XML|*}
 */
// function changeDOM(source,words){
//     words = words.split(',');
//     return source.replace(/\d+/g,function(i){
//         return words[i]
//     });
// }
// console.log(changeDOM('<0><1></1></0>','div,span'))














