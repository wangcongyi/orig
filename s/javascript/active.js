$('nav a').on('click', function () {
    $('nav a').removeClass('active');
    $(this).addClass('active');
});


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
    $.each(d, function (index, item) {
        var html = '<section>\
                        <a href="' + d[index].secUrl + '">\
                            <div>NO. <em>' + d[index].num + '</em> 刺猬体验</div>\
                            <img src="' + d[index].image + '">\
                            <div>已结束</div>\
                            <cite>' + d[index].comment + '</cite>\
                            <p>\
                                <span>开始时间:</span>\
                                <time>' + d[index].startTime + '</time>\
                                <span>结束时间:</span>\
                                <time>' + d[index].endTime + '</time>\
                            </p>\
                            <p>\
                                <object>\
                                    <a href="">\
                                        <em>' + d[index].sel + '</em>\
                                        <span>入选名单</span>\
                                    </a>\
                                </object>\
                            </p>\
                            <p>\
                                <object>\
                                    <a href="">\
                                      <em>' + d[index].report + '</em>\
                                       <span>体验心得</span>\
                                    </a>\
                                </object>\
                            </p>\
                        </a>\
                    </section>';
        $('.dropload-down').before(html);
    });
}