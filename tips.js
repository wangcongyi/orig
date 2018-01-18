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
//                                        ** 次日更新  在知乎上问了贺老师 https://www.zhihu.com/question/46816341 **
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

//////////////////////////////////////////////////////////////////
// function parseUA() {
//     var u = navigator.userAgent;
//     var u2 = navigator.userAgent.toLowerCase();
//     return { //移动终端浏览器版本信息
//         trident: u.indexOf('Trident') > -1, //IE内核
//         presto: u.indexOf('Presto') > -1, //opera内核
//         webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//         gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
//         mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//         ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//         android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
//         iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
//         iPad: u.indexOf('iPad') > -1, //是否iPad
//         webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
//         iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
//         weixin: u2.match(/MicroMessenger/i) == "micromessenger",
//         taobao: u.indexOf('AliApp(TB') > -1,
//     };
// }
//////////////////////////////////////////////////////////////////

//ajax-get-image-with-worker
//    var i = new Image();
//    var w = new Worker('./w.js');
//    var url = './w.jpg';
//    w.postMessage({method: "GET", url: url});
//    w.addEventListener('message', function (e) {
//        i.src = URL.createObjectURL(e.data);
//        document.body.appendChild(i);
//        i.onload = function () {
//            URL.revokeObjectURL(i.src);
//        }
//    }, false);


/*
 *            w.js
 *
 * */

//    self.addEventListener('message', function (e) {
//        if (e.data.method == 'GET') {
//            f(e.data.url)
//        }
//    }, false);
//
//
//    function f(url) {
//        var x = new XMLHttpRequest();
//        x.open('GET', url, true);
//        x.responseType = 'blob';
//        x.onload = function () {
//            self.postMessage(x.response)
//        };
//        x.send();
//    }
//   Cross-domain   no
//   just play with ajax2 and worker
/////////////////////////////////////////////////////////////////
//移动端禁止 链接 默认属性
/////-webkit-tap-highlight-color transparent;
//-webkit-touch-callout none;
//-webkit-user-select none;
///////////////////////////////////////////////////////////////////////////////
//  updata with document.querySelectorAll
//    let divs = [].slice.call(document.querySelectorAll('div'));
//   divs.forEach(div=>div.addEventListener('click',handleClick));
//   divs.forEach(div=>div.addEventListener('mousemove',handleMousemove));
//
/////////////////////////////////////////////////////////////////////
//  search转变成json对象
//  var search= window.location.search.substring(1);
//  var obj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

////////////////////////////////////////////////////
// 不打印出console.log信息在JS的位置信息
//
// setTimeout(console.log.bind(console, 'Hello world'), 2000)
//
//
////////////////////////////////////////////////////
// 2017-11-14 使用webpack 3.X 版本 和 postcss
//  webpack.config.js
// var ex = require('extract-text-webpack-plugin');
// module.exports = {
//   entry: {
//     ac1: './src/acone.css',
//     ac2: './src/arctwo.css'
//   },
//   output: {
//     filename: "[name].css"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         use: ex.extract({
//           fallback: 'style-loader',
//           use: [ 'css-loader', {
 //               loader:'postcss-loader',options:{
//                  plugins: loader => [
//                    require('postcss-simple-vars')(),
//                    require('autoprefixer')(),
//                    require('cssnano')()
//                  ]
//                }
//                } ]
//         })
//       }
//     ]
//   },
//
//   plugins: [
//     new ex('[name].css')
//   ]
// }
///////////////////////////////
// 新设计验证码 有很好用户体验和代码，得意之作 input 只有一个 模拟四个位置的输入提醒
//              update at 2018.1.1  vue 上有一个 demo, https://juejin.im/post/5a31ddb251882527541053ee。以后在看
//  <div class="phone-confirm">
//    <header>請輸入手機簡訊驗證碼</header>
//    <span>' + phone + '</span>
//    <main>
//      <div></div>
//      <div></div>
//      <div></div>
//      <div></div>
//      <input type="tel" autofocus maxlength="4" minlength="1" size="1" min="0" max="9999" pattern="[0-9]{4}" />
//    </main>
//    <footer>收不到驗證碼？<em id="again">59s</em></footer>
//  </div>
// function getInput() {
//     var input = document.querySelector('.phone-confirm').querySelector('input');
//     fakeVal = document.querySelector('.phone-confirm').querySelector('div');
//     fakeDIv = fakeVal;
//     fakeNum = '';
//     $('.phone-confirm').on('keyup', 'input', function (e) {
//         fakeVal.textContent = $(this).val();
//         fakeNum += $(this).val();
//         if (fakeNum.length === 4) {
//             $(this).prop('disabled', 'disabled');
//             !flag && register({
//                 mobile_pre: mobile_pre,
//                 mobile: mobile,
//                 code: fakeNum,
//                 act: 'register',
//                 backUrl: p,
//                 "_csrf-frontend": csrfToken
//             });
//         }

//         if (fakeVal.nodeName.toLowerCase() === 'div') {
//             if (e.which === 8) {
//                 if (fakeVal === fakeDIv) {
//                     fakeVal = fakeDIv
//                 } else {
//                     fakeVal = fakeVal.previousElementSibling;
//                 }
//                 fakeVal.textContent = '';
//                 fakeNum = fakeNum.slice(0, -1)
//             } else {
//                 fakeVal = fakeVal.nextElementSibling
//             }
//             this.value = ''
//         } else {
//             return false
//         }
//         input.style.left = fakeNum.length * .64 + 'rem';  ／／  不获取光标位置 直接修改 input 的定位
//     })
// }

///////////////////////////////////////
//    折角边框样式
//    background-image: linear-gradient(to right, #DCE3E6 .3rem, transparent .3rem), linear-gradient(to right, #DCE3E6 .3rem, transparent .3rem), linear-gradient(to bottom, #DCE3E6 .3rem, transparent .3rem), linear-gradient(to bottom, #DCE3E6 .3rem, transparent .3rem);
//    background-size: 100% 1px, 100% 1px, 1px 100%, 1px 100%;
//    background-position: -.15rem 0, -.15rem 100%, 0 -.15rem, 100% -.15rem;
//    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
///////////////////////////


//////////////////////////////////////
//    利用定时器函数的第三个参数可以节约很多代码
//
// function p(time = 1000) {
//   return new Promise((res, rej) => {
//     setTimeout(res, time, {
//       code: 200,
//       mes: 'OK',
//       data: {
//         name: 'king',
//         age: 20
//       }
//     })
//   })
// }
// p().then(({ data }) => console.log(data))        // {name:'king',age:20}



