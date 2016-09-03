var slider = $('.slider');
var sliderUrl = slider.data('url');
slider.swipeSlide({
    pager: false,
    autoSwipe: false,
    continuousScroll: true,
    callback: function (i,sum,me) {
        if(!!sliderUrl){

            loadSwipe(sliderUrl,i,sum,me);
        }
    }
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


function loadSwipe(url,i,sum,me) {
    var html = '';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        this.response.data.list.map(function (item, index) {
            var className = item.ing ? 'ing' : '';
            html += '<li class="' + className + '">\
                         <a href="' + item.securl + '">\
                             <p>' + item.title + '<span>' + item.much + '个心得</span></p>\
                             <p>' + item.comment + '</p>\
                         </a>\
                     </li>';
        });
        me.find('li').last().before(html)
        sliderUrl = this.response.data.url;

    };
    xhr.onerror = function () {
        console.log(3)
    };
    xhr.send();
}
