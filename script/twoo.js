define(function (require,exports) {
    exports.a = 65515


});

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
