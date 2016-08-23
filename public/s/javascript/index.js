var btn = document.querySelector('button');
var btnClass = btn.classList;
var mask = document.querySelector('.mask');
btn.addEventListener('touchstart', function (e) {
    mask.style.width = document.body.clientWidth + 'px';
    mask.style.height = document.body.clientHeight + 'px';
    e.stopPropagation();
    if (btnClass.contains('active')) {
        btnClass.remove('active');
        mask.style.display = 'none';
    } else {
        btnClass.add('active');
        mask.style.display = 'block';
    }
}, false);
mask.addEventListener('touchstart', function (e) {
    e.preventDefault();
    e.stopPropagation();
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
                $loadList.attr("url", this.response.data.url);
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
                            <div class="play"></div>\
                            <img src="' + d[index].image + '">\
                            <cite>' + d[index].title + '</cite>\
                            <address>' + d[index].address + '</address>\
                            <main>' + d[index].comment + '</main>\
                        </a>\
                    </section>';
        $('.dropload-down').before(html);
    });
}
