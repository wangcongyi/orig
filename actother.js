var mask = $('.mask');
var m = $('.menu');
var j =$('.job');
var dpr = document.getElementsByTagName('html')[0].getAttribute('data-dpr');
mask.css({
    'width': document.body.clientWidth,
    'height': document.body.clientHeight
});
m.fadeIn();
j.fadeIn();
var t = m.height();
var jt = j.height();
m.fadeOut();
j.fadeOut();
$('#menu').on('click', function () {
    var h = window.screen.height * dpr - t + $(window).scrollTop() - 200;
    m.fadeIn();
    m.css('position', 'absolute');
    m.animate({"top": h});
    mask.fadeIn();
});
m.find('em').on('click', function () {
    $('.menu').fadeOut();
    mask.fadeOut();

});

$('#apply').on('tap', function () {
    var h = window.screen.height * dpr - t + $(window).scrollTop() - 200;
    j.fadeIn()
    j.css('position', 'absolute');
    j.animate({"top": h});
    mask.fadeIn();
});

