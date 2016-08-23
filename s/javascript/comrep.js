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
    url = $('section').data('url');
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
    if (document.body.scrollTop + 10 >= g / 6 && one) {
        one = false;
        $('#replyList').fadeIn();
        var x = xml('cache/comrep.json');
        x.then(function (data) {
            replyHtml(data)
        }, function (data) {
            alert(data)
        })
    }
}, false);

/**
 * @description   AJAX去请求评论区数据
 * @param data    AJAX正常返回的数据
 */
function replyHtml(data) {
    var list = '';
    var secList = '';
    var d = data.data.list;
    if (d.length !== 0) {
        $.each(d, function (index) {

            if (d[index].replyList.length !== 0) {
                var secItem = secReply(d[index].replyList);
                secList = '<ul class="replyList">' + secItem + '</ul>';
            }
            list += '<section data-pid="'+d[index].pid+'">\
                         <img src="' + d[index].ava + '">\
                         <span>' + d[index].author + '</span>\
                         <span class="floor">'+d[index].floor+'</span>\
                         <time>' + d[index].time + '</time>\
                         <p>' + d[index].comment + '</p>\
                         '+secList+'\
                     </section>';
        });
    } else {
        input.attr('placeholder', '暂无评论 快抢沙发');
    }
    $('#reply').fadeIn();
    $('#replyList').append(list);
    $('#replyList').on('click', 'section', function () {
        re.call(this)
    });
}

/**
 * @description      请求二级评论的数据
 * @param data       AJAX正常返回的数据
 * @returns {string} 返回拼接好的二级评论DOM字符串
 */
function secReply(data) {
    var html = '';
    $.each(data, function (index) {
        html += '<li data-pid="' + data[index].pid + '">\
                    <img src="' + data[index].ava + '">\
                    <span>' + data[index].author + ' 回复 '+data[index].replyName+'</span>\
                    <time>' + data[index].time + '</time>\
                    <p>' + data[index].comment + '</p>\
                 </li>';
    });
    return html
}


/**
 * @description  回复二级评论时
 *               需要判断
 *               1、回复的对方
 *               2、input text回显示回复的是谁
 *               3、当用户 没有输入并且回退的时候  视为回复一级评论
 */
function re() {
    ra = false;
    var h = $(this).find('span');
    console.log(h)
    h.find('em').length !== 0 ? who = h.find('em').text().trim() : who = h.text().trim();
    self = $(this);
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
    var $comment = $('#comment');
    var val = input.val().trim();
    var v = input.val().replace(new RegExp(r, 'gi'), '');
    if (val == '' || v == '') {
        return
    }
    if ($comment.length !== 0) {
        if (ra) {
            var oHtml = '<div class="leftD">\
                            <img src="image/icon-1-2@2x.png">\
                         </div>\
                         <div class="rightD">\
                             <h2>Kindle Oasis</h2>\
                             <time>4小时前</time>\
                             <p>' + val + '</p>\
                         </div>';
            $comment.append(oHtml);
            scroll($(document).height(), 500)
        } else {
            var html = '<li>\
                            <div class="leftD">\
                                <img src="image/icon-1-2@2x.png">\
                            </div>\
                            <div class="rightD">\
                                <h2><em>A</em> \u56de\u590d ' + who + '</h2>\
                                <time>4小时前</time>\
                                <p>' + v + '</p>\
                            </div>\
                        </li>';
            if (self.find('.replyList').length === 0 && self.parent().hasClass('comment')) {
                var firstHtml = '<ul class="replyList">\
                                     <li>\
                                         <div class="leftD">\
                                             <img src="image/icon-1-2@2x.png">\
                                         </div>\
                                         <div class="rightD">\
                                             <h2><em>A</em> \u56de\u590d ' + who + '</h2>\
                                             <time>4小时前</time>\
                                             <p>' + v + '</p>\
                                         </div>\
                                     </li>\
                                 </ul>';
                self.append(firstHtml);
            } else if (self.find('.replyList').length !== 0) {
                self.find('.replyList').append(html);
            } else if (self.parent().parent().hasClass('replyList')) {
                self.parent().parent().append(html)
            }
            ra = true
        }
    } else {
        var d = '<section>\
                    <div id="comment" class="comment">\
                        <div class="leftD">\
                            <img src="image/icon-1-2@2x.png">\
                        </div>\
                        <div class="rightD">\
                            <h2>dddd</h2>\
                            <time>asdasd</time>\
                            <p>' + input.val() + '</p>\
                        </div>\
                    </div>\
                 </section>';
        $(document.body).append(d);
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


