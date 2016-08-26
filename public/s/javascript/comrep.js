/**
 *   @description HTML5(很反感简写成H5真恶心 难道 JAVA8 要简写成 J8???~~~~)
 *   @description HTML5 文章详情页面 回复功能
 *   @time        2016/8/11
 *   @version     0.1
 *   @License     MIT  (随便改~~)
 *   @author      king
 */

var self, // 回复二级评论时 需要监听所选区域
    r,    // 回复二级评论时 input增加的placeholder
    who,  // 回复二级评论时 显示回复的是谁
    ra = true,  // 避免用户回复二级评论时 又不想回复了
    one = true, // AJAX只请求一次数据
    input = $('#reply').find('input'),
    url = $('section').data('url'),
    t = $('section').height(),
    $replyArea = $('#replyArea');
g = parseInt(getComputedStyle(document.querySelector('section')).getPropertyValue('height'));
//请求评论区需要的条件 至于为什么不用zepto  有可能 flexbox没有计算好 最好使用getComputedStyle
//点赞功能
$('#praise').on('tap', function () {
    if ($(this).hasClass('praise'))return;
    var num = +$(this).text() + 1;
    $(this).addClass('praise').text(num)
});

//返回按钮 监听事件
$('#rep').on('tap', rb);

//用户输入 '换行'符  视为完成输入 回复评论
input.on('keydown', function (e) {
    if (e.keyCode == 13) {
        rb();
    }
});
//页面下拉请求评论区数据
window.addEventListener('touchmove', function () {
    if (document.body.scrollTop >= g / 1.5 && one) {
        one = false;
        var x = xml(url);
        x.then(function (data) {
            replyHtml(data);
            if (!!url) {
                $replyArea.dropload({
                    scrollArea: window,
                    loadDownFn: function (load) {
                        if (!!url) {
                            var x = xml(url);
                            x.then(function (data) {
                                hehe(data);
                                url = data.data.url;
                                load.resetload()
                            }, function (data) {
                                alert(data)
                            })
                        } else {
                            load.noData();
                            load.lock();
                            load.resetload()
                        }
                    }
                });
                url = data.data.url;
            }
        }, function (data) {
            alert(data)
        });
        $replyArea.fadeIn()
    }
}, false);


function hehe(data) {
    var list = '';
    var secList = '';
    var d = data.data.list;
    d.map(function (item, index) {
        if (!!item.replyUrl) {
            var btn = '<button data-url="' + item.replyUrl + '">更多评论...</button>';
        }
        if (item.replyList.length !== 0) {
            var secItem = secReply(item.replyList);
            secList = '<ul class="replyList">' + secItem + '</ul>' + btn;
        }
        list += '<section data-pid="' + item.pid + '">\
                         <img src="' + item.ava + '">\
                         <span>' + item.author + '</span>\
                         <span class="floor">' + item.floor + '</span>\
                         <time>' + item.time + '</time>\
                         <p>' + item.comment + '</p>\
                         ' + secList + '\
                     </section>';
    });
    $('.dropload-down').before(list)
}


/**
 * @description   AJAX去请求评论区数据
 * @param data    AJAX正常返回的数据
 */
function replyHtml(data) {
    var list = '';
    var secList = '';
    var d = data.data.list;
    if (d.length !== 0) {
        d.map(function (item, index) {
            if (!!item.replyUrl) {
                var btn = '<button data-url="' + item.replyUrl + '">更多评论...</button>';
            }
            if (item.replyList.length !== 0) {
                var secItem = secReply(item.replyList);
                secList = '<ul class="replyList">' + secItem + '</ul>' + btn;
            }
            list += '<section data-pid="' + item.pid + '">\
                         <img src="' + item.ava + '">\
                         <span>' + item.author + '</span>\
                         <span class="floor">' + item.floor + '</span>\
                         <time>' + item.time + '</time>\
                         <p>' + item.comment + '</p>\
                         ' + secList + '\
                     </section>';
        });
    } else {
        input.attr('placeholder', '暂无评论 快抢沙发');
    }
    $('#reply').fadeIn();
    $replyArea.append(list);
    $replyArea.on('click', 'section', function (e) {
        if (e.target.nodeName.toLowerCase() == 'button') {
            rr.call(this)
        } else {
            re.call(this)
        }
    });
}


/**
 *  @description  二级评论加载更多
 *
 *
 */
function rr() {
    var self = this;
    var btn = this.querySelector('button');
    var u = btn.getAttribute('data-url');
    var x = xml(u);
    x.then(function (data) {
        var h = secReply(data.list);
        $(self).find('.replyList').append(h);
        btn.setAttribute('data-url', data.replyUrl)
    }, function (data) {
        btn.textContent = '没有更多评论咯~~'
    })
}


/**
 * @description      请求二级评论的数据
 * @param data       AJAX正常返回的数据
 * @returns {string} 返回拼接好的二级评论DOM字符串
 */
function secReply(data) {
    var html = '';
    data.map(function (item, index) {
        html += '<li data-pid="' + item.pid + '">\
                   <section>\
                       <img src="' + item.ava + '">\
                       <span><em>' + item.author + '</em> 回复 ' + item.replyName + '</span>\
                       <p>' + item.comment + '</p>\
                   </section>\
               </li>';
    });
    return html
}


/**
 * @description  回复二级评论时
 *               需要判断
 *               1、回复的对方
 *               2、input text显示回复的是谁
 *               3、当用户 没有输入并且回退的时候  视为回复一级评论
 */
function re() {
    ra = false;
    self = $(this);
    var h = self.find('span')[0];
    $(h).find('em').length !== 0 ? who = $(h).find('em').text().trim() : who = $(h).text().trim();
    r = '\u56de\u590d: ' + who + ' ';
    input.focus().val(r);
    input.on('keydown', function (e) {
        if (e.keyCode == 8 && $(this).val() == r) {
            ra = true;
            input.val('')
        }
    });
    rb()
}

/**
 * @description 评论功能主要方法
 *
 */

function rb() {
    var val = input.val().trim();
    var v = input.val().replace(new RegExp(r, 'gi'), '');
    if (val == '' || v == '') {
        return
    }
    if ($replyArea.find('section').length !== 0) {
        if (ra) {
            var oHtml = '<section>\
                             <img src="cache/ava.png">\
                             <span>king</span>\
                             <span class="floor">' + 55 + '楼</span>\
                             <time>' + Date.parse(new Date()) + '</time>\
                             <p>' + val + '</p>\
                         </section>';
            $replyArea.prepend(oHtml);
            scroll(t, 500)
        } else {
            if (self.parent().parent().hasClass('replyList')) {
                var html = '<li>\
                                <section>\
                                    <img src="cache/ava.png">\
                                    <span><em>king</em> \u56de\u590d ' + who + '</span>\
                                    <p>' + v + '</p>\
                                </section>\
                            </li>';
                self.parent().parent().append(html);
            } else if (!self.hasClass('replyList') && self.find('.replyList').length === 0) {
                var firstHtml = '<ul class="replyList">\
                                     <li>\
                                         <section>\
                                             <img src="cache/ava.png">\
                                             <span><em>king</em> \u56de\u590d ' + who + '</span>\
                                             <p>' + v + '</p>\
                                         </div>\
                                         </section>\
                                     </li>\
                                 </ul>';
                self.append(firstHtml);
            } else if (self.find('.replyList').length !== 0) {
                var html = '<li>\
                                <section>\
                                    <img src="cache/ava.png">\
                                    <span><em>king</em> \u56de\u590d ' + who + '</span>\
                                    <p>' + v + '</p>\
                                </section>\
                            </li>';
                self.find('.replyList').append(html)
            }
            ra = true
        }
    } else {
        var d = '<section>\
                     <img src="cache/ava.png">\
                     <span>king</span>\
                     <time>1分钟前</time>\
                     <p>' + val + '</p>\
                 </section>';
        $replyArea.append(d);
        scroll($(document).height(), 500);
        input.attr('placeholder', '我也要评论');
    }
    input.val('');
    input.blur();
}


/**
 * @description         用promise写AJAX
 * @param url           请求地址
 * @param data          发送数据 默认null
 * @returns {Promise}   返回Promise对象
 */

function xml(url, data) {
    var g = data == null ? 'GET' : 'POST';
    var x = new XMLHttpRequest();
    return new Promise(function (res, rej) {
        x.open(g, url, true);
        x.responseType = 'json';
        x.onload = function () {
            if (x.status === 200) {
                res(x.response)
            } else {
                rej(x.status)
            }
        };
        x.send(data)
    });
}


/**
 * @description      评论完成 页面滚动到最底部  只是一级评价 二级评论暂时没有
 * @param scrollTo   滚动距离
 * @param time       滚动时间
 */
function scroll(scrollTo, time) {
    var scrollFrom = parseInt(document.body.scrollTop),
        i = 0,
        runEvery = 15;
    scrollTo = parseInt(scrollTo);
    time /= runEvery;

    var interval = setInterval(function () {
        i++;
        document.body.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
        if (i >= time) {
            clearInterval(interval);
        }
    }, runEvery);
}


var pay = $('.pay');
var mask = $('.mask');
var h = pay.height();
pay.hide();


$('#payFor').on('tap', function () {
    var t = window.screen.height * dpr - h + $(window).scrollTop() - dpr * 120;
    pay.fadeIn();
    mask.css({
        "width": document.body.clientWidth,
        "height": document.body.clientHeight
    });
    mask.fadeIn();
    pay.css('position', 'absolute');
    pay.animate({"top": t})
});

pay.find('em').on('tap', function () {
    pay.fadeOut();
    mask.fadeOut();
});

pay.find('input').on('blur', function () {
    var t = window.screen.height * dpr - h + $(window).scrollTop() - dpr * 120;
    pay.animate({"top": t})
});


$('.mask,.pay').on('touchmove', function () {
    return false
});
