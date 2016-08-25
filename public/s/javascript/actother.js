var mask = $('.mask');
var menu = $('.menu');
var job = $('.job');
var resume = $('.resume');
var section = $('.menu,.job,.resume');
var dpr = document.getElementsByTagName('html')[0].getAttribute('data-dpr');
mask.css({
    'width': document.body.clientWidth,
    'height': document.body.clientHeight
});

menu.fadeIn();
job.fadeIn();
resume.fadeIn();
var menuH = menu.height();
var jobH = job.height();
var resumeH = resume.height();
menu.fadeOut();
job.fadeOut();
resume.fadeOut();

$('#menu').on('tap', function () {
    var h = window.screen.height * dpr - menuH + $(window).scrollTop() - dpr * 120;
    menu.fadeIn();
    menu.css('position', 'absolute');
    menu.animate({"top": h});
    mask.fadeIn();
    return false
});


section.on('touchmove', function () {
    return false
});
mask.on('touchmove', function () {
    return false
});

section.find('em').on('click', function () {
    $(this).parent().fadeOut();
    mask.fadeOut();
});


$('#apply').on('tap', function () {
    var h = window.screen.height * dpr - jobH + $(window).scrollTop() - dpr * 120;
    job.fadeIn();
    job.css('position', 'absolute');
    job.animate({"top": h});
    mask.fadeIn();
});

var table = job.find('table');
var tr = table.find('tr');
var len = tr.length;
table.on('tap', 'tr', function (e) {
    e.preventDefault();
    if ($(this).index() == len - 1) {
        tr.addClass('che')
    }
    $(this).toggleClass('che')
});

$('#open').on('tap', function () {
    var h = window.screen.height * dpr - resumeH + $(window).scrollTop() - dpr * 120;
    job.hide();
    resume.fadeIn();
    resume.css('position', 'absolute');
    resume.animate({"top": h});
});

resume.find('textarea').on('blur', function () {
    var h = window.screen.height * dpr - resumeH + $(window).scrollTop() - dpr * 120;
    resume.animate({"top": h});
});


$('#praise').on('tap', function () {
    if ($(this).hasClass('praise'))return;
    var num = +$(this).text() + 1;
    $(this).addClass('praise').text(num)
});