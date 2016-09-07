var slider = $('.slider');
slider.swipeSlide({
    pager: false,
    autoSwipe: false,
    continuousScroll: true
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
                if (this.status === 200 && !!this.response.data.url) {
                    url = this.response.data.url;
                    loadHtml(this.response);
                } else {
                    load.lock();
                    load.noData();
                }
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
    var html = '';
    d.map(function (item, index) {
        html += '<a href="' + item.srcUrl + '">\
                     <section>\
                         <img src="' + item.image + '">\
                         <cite>' + item.cite + '</cite>\
                         <address>' + item.address + '</address>\
                         <main>' + item.comment + '</main>\
                     </section>\
                 </a>';
    });
    $('.dropload-down').before(html);
}

