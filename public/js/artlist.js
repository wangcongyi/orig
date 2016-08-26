var $loadList = $('#loadList');
var url = $loadList.data('url');
if ($loadList.length > 0) {
    $loadList.dropload({
        scrollArea: window,
        loadDownFn: function (load) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = function () {
                if (this.status === 200) {
                    loadHtml(this.response);
                    url = this.response.data.url;
                    load.resetload();
                } else {
                    load.noData();
                    load.lock();
                    load.resetload();
                }
            };
            xhr.onerror = function () {
                load.noData();
                load.lock();
                load.resetload();
            };
            xhr.send();
        }
    });
}

function loadHtml(data) {
    var html = '';
    data.data.list.map(function (item, index) {
        var icon = '';
        item.official && (icon += '<i class="official">官</i> ');
        item.extract && (icon += '<i class="extract">精</i> ');
        item.sticky && (icon += '<i class="sticky">顶</i> ');
        html += '<section>\
                     <a href="' + item.secUrl + '">\
                         <h1>' + item.title + '</h1>\
                         <article>by <span>' + item.author + ' </span> ' + item.time + '</article>' + icon + '\
                         <img src="' + item.image + '">\
                         <main>' + item.main + '</main>\
                         <h2>\
                             <div>\
                                 <div class="heart heart2"></div>\
                                 <span>' + item.likes + '</span>\
                             </div>\
                             <div>\
                                 <span class="typing-indicator">\
                                     <span></span>\
                                     <span></span>\
                                     <span></span>\
                                 </span>\
                                 <span>' + item.reply + '</span>\
                             </div>\
                         </h2>\
                     </a>\
                 </section>';
    });
    $('.dropload-down').before(html);
}


var nav = document.querySelector('header nav'),
    sec = document.querySelector('.sec'),
    W = document.body.offsetWidth,
    navW = nav.offsetWidth - W,
    secW = W / 4,
    iScroll = startX = iStart = 0,
    x = y = z = 0,
    h = 0;
var arr = {
    1: [
        '<a href="">刺猬电台</a>',
        '<a href="">刺猬电台</a>',
        '<a href="">刺猬电台</a>',

    ],
    2: [
        '<a href="">刺猬电台</a>',
        '<a href="">刺猬电台</a>',
        '<a href="">刺猬电台</a>',
        '<a href="">刺猬电台</a>',
    ],
    3: [
        '<a href="">刺猬电台</a>',
        '<a href="">刺猬电台</a>',
        '<a href="">刺猬电台</a>',
        '<a href="">刺猬电台</a>',
        '<a href="">刺猬电台</a>',
    ],
    4: [
        '<a href="">22222</a>',
        '<a href="">33333</a>',
        '<a href="">44444</a>',
        '<a href="">55555</a>',
        '<a href="">66666</a>',
        '<a href="">77777</a>',
        '<a href="">77777</a>',
        '<a href="">77777</a>',
    ],
    5: [],
    6: [],
    7: [],
    8: [],
};
nav.addEventListener('touchstart', function (e) {
    startX = e.changedTouches[0].pageX;
    iStart = iScroll;
});
nav.addEventListener('touchmove', function (e) {
    var dis = e.changedTouches[0].pageX - startX;
    iScroll = iStart + dis;
    if (iScroll >= 0) {
        iScroll = 0;
    } else if (iScroll <= -navW) {
        iScroll = -navW
    }
    nav.style.transform = 'translateX(' + iScroll + 'px)';
});

function reloadNav(index) {
    var n = arr[index + 1].length;
    if (n <= 4) {
        sec.style.width = '100%';
        h = W;
    } else {
        sec.style.width = n * secW + 'px';
        h = n * secW;
    }
    sec.style.transform = 'translateX(0px)';
    sec.innerHTML = arr[index + 1].join('');
}
reloadNav(0);

sec.addEventListener('touchstart', function (e) {
    x = e.changedTouches[0].pageX;
    y = z;
}, false);
sec.addEventListener('touchmove', function (e) {
    var dis = e.changedTouches[0].pageX - x;
    z = y + dis;
    if (z >= 0) {
        z = 0
    } else if (z <= W - h) {
        z = W - h
    }
    sec.style.transform = 'translateX(' + z + 'px)'
}, false);


$('header').on('tap', 'a', function () {
    $('header').find('a').removeClass('active');
    $(this).addClass('active');
    reloadNav($(this).index());
    return false
});











