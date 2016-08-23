$('nav').on('tap', 'a', function () {
    var index = $(this).index();
    var $div = $('.warp>div');
    $('nav').find('a').css('fontWeight', 'normal');
    $(this).css('fontWeight', 'bolder');
    $div.hide().eq(index).show();
});


var $loadList = $('#loadList');
var url = $loadList.data('url');
if ($loadList.length > 0) {
    $loadList.dropload({
        scrollArea: window,
        loadDownFn: function (load) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'articl_list.json', true);
            xhr.responseType = 'json';
            xhr.onload = function () {
                $loadList.data("url",this.response.data.url);
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
    $.each(data.data.list, function (index, item) {
        var d = data.data.list[index];
        var iconHtml = '';
        d.official && (iconHtml += '<i class="icon"><i class="icon1"></i></i>');
        d.cream && (iconHtml += '<i class="icon"><i class="icon2"></i></i>');
        d.stick && (iconHtml += '<i class="icon"><i class="icon3"></i></i>');
        d.img && (iconHtml += '<i class="icon"><i class="icon4"></i></i>');
        d.money && (iconHtml += '<i class="icon"><i class="icon5"></i></i>');
        var html = '<section>\
                        <a href="">\
                            <h1>' + d.subject + '</h1>\
                            <article>by <span>' + d.author + ' </span> ' + d.dateline + '</article>' + iconHtml + '\
                            <img src="css/da1.png">\
                            <p>' + d.content + '</p>\
                            <h2>\
                                <div>\
                                    <div class="heart heart2"></div>\
                                    <span>' + d.likes + '</span>\
                                </div>\
                                <div>\
                                    <span class="typing-indicator">\
                                        <span></span>\
                                        <span></span>\
                                        <span></span>\
                                    </span>\
                                    <span>' + d.replies + '</span>\
                                </div>\
                            </h2>\
                        </a>\
                    </section>';
        $('.dropload-down').before(html);
    });
}