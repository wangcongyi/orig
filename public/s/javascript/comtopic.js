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
                $loadList.data("url", this.response.data.url);
                loadHtml(this.response);
                load.resetload();
            };
            xhr.onerror = function () {
            };
            xhr.send();
        }
    });
}

function loadHtml(data) {
    var d = data.data.list;
    var activeArea = '<a href="' + data.data.aUrl + '"><img src="' + data.data.aImage + '"></a>';
    $.each(d, function (index, item) {
        var iconHtml = '';
        d.official && (iconHtml += '<i class="icon"><i class="icon1"></i></i>');
        d.cream && (iconHtml += '<i class="icon"><i class="icon2"></i></i>');
        d.stick && (iconHtml += '<i class="icon"><i class="icon3"></i></i>');
        d.img && (iconHtml += '<i class="icon"><i class="icon4"></i></i>');
        d.money && (iconHtml += '<i class="icon"><i class="icon5"></i></i>');
        var html = '<section>\
                        <a href="' + d[index].secUrl + '">\
                            <p><em>&#35;刺猬体验No.' + d[index].num + '&#35;</em>' + d[index].title + '</p>\
                            <h1>' + d[index].title2 + '</h1>\
                            <article>by <span>' + d[index].author + '</span> ' + d[index].time + '</article>\
                            ' + iconHtml + '\
                            <img src="' + d[index].image + '">\
                            <main>' + d[index].comment + '</main>\
                            <h2>\
                                <div>\
                                    <div class="heart heart2"></div>\
                                    <span>' + d[index].likes + '</span>\
                                </div>\
                                <div>\
                                    <span class="typing-indicator">\
                                        <span></span>\
                                        <span></span>\
                                        <span></span>\
                                    </span>\
                                    <span>' + d[index].reply + '</span>\
                                </div>\
                            </h2>\
                        </a>\
                    </section>';
        $('.dropload-down').before(html);
    });
    $('.dropload-down').before(activeArea)
}
var dpr = document.querySelector('html').getAttribute('data-dpr');
var nav = document.querySelector('nav');
var W = nav.offsetWidth - window.screen.width * dpr;
var iScroll = 0;
var startX = 0;
var iStart = 0;
nav.addEventListener('touchstart', function (e) {
    startX = e.changedTouches[0].pageX;
    iStart = iScroll;
});
nav.addEventListener('touchmove', function (e) {
    var dis = e.changedTouches[0].pageX - startX;
    iScroll = iStart + dis;

    if (iScroll >= 0) {
        iScroll = 0;
    } else if (iScroll <= -W) {
        iScroll = -W
    }
    nav.style.transition = 'all .3s ease-out';
    nav.style.transform = 'translateX(' + iScroll + 'px)';
});
