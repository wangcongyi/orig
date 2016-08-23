alert(23);
var self, r, who, ra = true, one = true, input = $('#reply').find('input'), g = parseInt(getComputedStyle(document.querySelector('section')).getPropertyValue('height'));

//点赞功能
$('#praise').on('tap', function () {
    if ($(this).hasClass('praise'))return;
    var num = +$(this).text() + 1;
    $(this).addClass('praise').text(num)
});




window.addEventListener('touchmove', function () {
    if (document.body.scrollTop >= g / 6 && one) {
        one = false;
        $('#replyList').fadeIn();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './det.json', true);
        xhr.responseType = 'json';
        xhr.onload = function () {

            if (xhr.status === 200) {
                replyHtml(xhr.response);
            } else {
                alert(xhr.status)
            }

        };

        xhr.send();
    }
}, false);


function replyHtml(data) {
    var list = '';
    var secList = '';
    var d = data.data.replyData.list;
    var domHtml = '';
    if (d.length !== 0) {
        $('#reply').css("position", "fixed").fadeIn();
        $.each(d, function (index) {
            if (d[index].reply.list.length !== 0) {
                var dd = d[index].reply.list;
                var secItem = secReply(dd);
                secList = '<ul class="replyList">' + secItem + '</ul>';
            }
            list += '<div class="leftD">\
                        <img src="image/icon-1-2@2x.png">\
                     </div>\
                     <div class="rightD" data-pid="' + d[index].pid + '">\
                        <h2>' + d[index].author + '</h2>\
                        <time>' + d[index].dateline + '</time>\
                        <p>' + d[index].message + '</p>' + secList
                + '</div>';
        });
        domHtml = '<section>\
                       <div id="comment" class="comment">' + list + '</div>\
                   </section>';
    } else {
        input.attr('placeholder', '暂无评论 快抢沙发');
        $('#reply').fadeIn();
    }
    $(document.body).append(domHtml);
    $('#comment').on('click', '.rightD', function () {
        re.call(this)
    });
}


function secReply(data) {
    var html = '';
    $.each(data, function (index) {
        html += '<li>\
                     <div class="leftD">\
                         <img src="image/icon-1-2@2x.png">\
                     </div>\
                     <div class="rightD">\
                         <h2><em>' + data[index].author + '</em></h2>\
                         <time>' + data[index].dateline + '</time>\
                         <p>' + data[index].message + '</p>\
                     </div>\
                 </li>';
    });
    return html
}




function re() {
    ra = false;
    var h = $($(this).find('h2')[0]);
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
                                <h2>A 回复 <em>' + who + '</em></h2>\
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
                                        <h2>A 回复 <em>' + who + '</em></h2>\
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
        $('#reply').css("position", "fixed");
    }
    input.val('');
    input.blur();
}



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