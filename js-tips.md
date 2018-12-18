## 运用三目运算符简化代码
```js
  var a = 10;
  var b;
  
  a === 10 && fn1() & fn2()
  
  n === 1 && (x = 1, y = 2, z = 3)
  
  a === 10 ? console.log(1) : console.log(2) & console.log(3)
  
  a === 10 ? console.log(1): console.log(2) , console.log(3)
  
```

## 运用 `&&` 运算符简化代码
```js
  if(obj){
    if(obj.a){
      if(obj.a.b.length > 0){
        b = obj.a.b
      }
    }
  }

b = obj && obj.a && obj.a.b
```

## QQ 在线咨询链接
```js
 http://wpa.qq.com/msgrd?v=3&uin="需要关联的QQ号"&site=qq&menu=yes
```

## 获取标签所有属性值
```js
  function getUuid(str, sign) {
  var arr = [];
  str.replace(new RegExp(sign + "=\"\\w+", "gi"), function ($0) {
    arr.push($0.replace(new RegExp(sign + "=\"", "gi"), ""));
  });
  return arr;
};
```

## 闭包返回定时器 再次调用
```js
function f(fn, times, delay) {
  var t, n = 0;
  return function (str) {
    t = setInterval(function () {
      if (n == times - 1) {
        clearInterval(t);
        t = null;
        n = null;
      }
      fn(str);
      n++;
    }, delay)
  }
}

var a = f(alert, 6, 1000);
a('你好');
```

## javascript 工厂模式稍作修改 有可能UI都是相同的所以把 UI 也抽出来 后台传递的 data 参数
```js
var F = function (type, content) {
  return this[ type ](content)
};
F.prototype = {
  Java: function (content) {
    this.UI(content, 'red');
  },
  JavaScript: function (content) {
    this.UI(content, 'green')
  },
  UI: function (content, color) {
    this.content = content;
    (function (content) {
      var div = document.createElement('div');
      div.innerHTML = content;
      div.style.color = color;
      document.querySelector('#id').appendChild(div)
    })(content)
  }
};
var data = [
  {type: 'Java', content: 'Thisi sisd Java'},
  {type: 'JavaScript', content: 'Thisi sisd javascsfeprsdsd'}
];
var i = 0;
for (; i < data.length; i++) {
  new F(data[ i ].type, data[ i ].content)
}
```

## hover 延时事件发生 如果用户快速经过就不触发 hover
```js
$('img').hover(function () {
  var self = $(this);
  clearTimeout(t1);
  t2 = setTimeout(function () {
    self.animate({width: 1000}, 500, 'linear')
  }, 1000)
}, function () {
  var self = $(this);
  clearTimeout(t2);
  t1 = setTimeout(function () {
    self.animate({width: 500}, 500, 'linear')
  }, 1000)
})
```

## javascript 状态模式 状态变成私有变量 返回一个对象接口 可以对状态修改或者调用
```js
var MarryState = function () {
  var _currentState = {},
    states = {
      jump: function () {
        console.log('jump')
      },
      move: function () {
        console.log('move')
      },
      shoot: function () {
        console.log('shoot')
      },
      squat: function () {
        console.log('squat')
      }
    };
  var Action = {
    changeState: function () {
      var arg = arguments;
      if (arg.length) {
        for (var i = 0; i < arg.length; i++) {
          _currentState[ arg[ i ] ] = true
        }
      }
      return this
    },
    goes: function () {
      console.log('changeOnce');
      for (var i in _currentState) {
        states[ i ] && states[ i ]()
      }
      return this
    }
  };
  return {
    change: Action.changeState,
    goes: Action.goes
  }
};
var m = new MarryState();
m.change('jump').goes().change('shoot').goes();
```

## jQuey 去封装一个长按功能插件
```js
(function ($) {
  $.fn.longPress = function (delay, callback) {
    var d = delay || 1000;
    var t = null;
    var f = false;
    $(this).on('mousedown', function () {
      t = setTimeout(function () {
        f = true;
        callback.call(this);
      }, d);
    });
    $(this).on('mouseup', function () {
      !f && clearTimeout(t)
    });
    return this
  }
})(jQuery);
```

## 在伪元素上添加事件 因为不是真正的 DOM 无法直接添加事件但可以模拟出来
```css
#demo {
    width: 100px;
    height: 100px;
    position: relative;
    background: blue;
}

#demo:after {
    content: "x";
    font-size: 10px;
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    width: 10px;
    height: 10px;
}
```
```js
$('#mything').click(function (e) {
  if (e.clientX > $(this).offset().left + 90 &&
    e.clientY < $(this).offset().top + 10) {
    // do something
  }
});
```

## postMessage 一个小坑 在使用 `a` 链接打开新页面的时候  新页面不会马上触发 `message` 事件
### 次日更新  在知乎上问了贺老师 https://www.zhihu.com/question/46816341
```js
$(document).on('ready', function () {
  $('thead').on('click', 'a', function () {
    var newWindow = window.open('http://www.c.com/demo.html', 'title');
    setTimeout(function () {
      newWindow.postMessage('hello', 'http://www.c.com/demo.html');
    }, 0);
  })
})
```


## javascript navigator.userAgent
```js
function parseUA() {
  var u = navigator.userAgent;
  var u2 = navigator.userAgent.toLowerCase();
  return { //移动终端浏览器版本信息
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, //是否iPad
    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
    weixin: u2.match(/MicroMessenger/i) == "micromessenger",
    taobao: u.indexOf('AliApp(TB') > -1,
  };
}
```

## ajax-get-image-with-worker
```js
var i = new Image();
var w = new Worker('./w.js');
var url = './w.jpg';
w.postMessage({method: "GET", url: url});
w.addEventListener('message', function (e) {
  i.src = URL.createObjectURL(e.data);
  document.body.appendChild(i);
  i.onload = function () {
    URL.revokeObjectURL(i.src);
  }
}, false);
////// w.js ///////
self.addEventListener('message', function (e) {
  if (e.data.method == 'GET') {
    f(e.data.url)
  }
}, false);

function f(url) {
  var x = new XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob';
  x.onload = function () {
    self.postMessage(x.response)
  };
  x.send();
}
```

## 移动端禁止 链接 默认属性
```css
#demo {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
}
```

## URL search 转变成 json 对象
```js
var search = window.location.search.substring(1);
var obj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
```

## Get Cookie Value by RegEx
```js
function getCookieValue(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
```

## 不打印出 console.log 信息在 JS 文件的位置信息
```js
setTimeout(console.log.bind(console, 'Hello world'), 2000)
```

## 利用定时器函数的第三个参数
```js
function p(time = 1000) {
  return new Promise((res, rej) => {
    setTimeout(res, time, {
      code: 200,
      mes: 'OK',
      data: {
        name: 'king',
        age: 20
      }
    })
  })
}

p().then(({data}) => console.log(data)   // {name:'king',age:20}
```

## 新设计验证码 有很好用户体验和代码，得意之作 input 只有一个 模拟四个位置的输入提醒
```html
<div class="phone-confirm">
  <header>請輸入手機簡訊驗證碼</header>
  <span>' + phone + '</span>
  <main>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <input type="tel" autofocus maxlength="4" minlength="1" size="1" min="0" max="9999" pattern="[0-9]{4}" />
  </main>
  <footer>收不到驗證碼？<em id="again">59s</em></footer>
</div>
```
```js
function getInput() {
  var input = document.querySelector('.phone-confirm').querySelector('input');
  fakeVal = document.querySelector('.phone-confirm').querySelector('div');
  fakeDIv = fakeVal;
  fakeNum = '';
  $('.phone-confirm').on('keyup', 'input', function (e) {
    fakeVal.textContent = $(this).val();
    fakeNum += $(this).val();
    if (fakeNum.length === 4) {
      $(this).prop('disabled', 'disabled');
      !flag && register({
        mobile_pre: mobile_pre,
        mobile: mobile,
        code: fakeNum,
        act: 'register',
        backUrl: p,
        "_csrf-frontend": csrfToken
      });
    }

    if (fakeVal.nodeName.toLowerCase() === 'div') {
      if (e.which === 8) {
        if (fakeVal === fakeDIv) {
          fakeVal = fakeDIv
        } else {
          fakeVal = fakeVal.previousElementSibling;
        }
        fakeVal.textContent = '';
        fakeNum = fakeNum.slice(0, -1)
      } else {
        fakeVal = fakeVal.nextElementSibling
      }
      this.value = ''
    } else {
      return false
    }
    input.style.left = fakeNum.length * .64 + 'rem';
  })
}
```











