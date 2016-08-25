var mask = $('.mask');
var menu = $('.menu');
var dpr = document.getElementsByTagName('html')[0].getAttribute('data-dpr');
mask.css({
    'width': document.body.clientWidth,
    'height': document.body.clientHeight
});
menu.fadeIn();
var menuH = menu.height();
menu.fadeOut();
$('#menu').on('tap', function () {
    var h = window.screen.height * dpr - menuH + $(window).scrollTop() - dpr * 120;
    menu.fadeIn();
    menu.css('position', 'absolute');
    menu.animate({"top": h});
    mask.fadeIn();
    return false
});
menu.on('touchmove', function () {
    return false
});
mask.on('touchmove', function () {
    return false
});
menu.find('em').on('click', function () {
    $(this).parent().fadeOut();
    mask.fadeOut();
});

$('button').on('tap',function () {
    if(!!$(this).data('url')){
        window.location = $(this).data('url')
    }
});
$('#praise').on('tap', function () {
    if ($(this).hasClass('praise'))return;
    var num = +$(this).text() + 1;
    $(this).addClass('praise').text(num)
});









