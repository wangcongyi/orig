(function () {
    var div;
    window.addEventListener('scroll', function () {
        if (document.body.scrollTop >= 300 && !div) {
            div = document.createElement('div');
            div.className = 'top';
            div.innerHTML = '<a href="javascript:"></a><a href="">反馈</a>';
            document.body.appendChild(div);
            fadeIn(div);
            document.querySelector('.top').querySelectorAll('a')[0].addEventListener('click', function () {
                scrollTop();
            }, false);
        }
    }, false);

    function fadeIn(el) {
        el.style.opacity = 0;
        var last = +new Date();
        var tick = function () {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
            last = +new Date();
            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
        tick();
    }

    function scrollTop() {
        var f = function () {
            document.body.scrollTop = document.body.scrollTop - 30;
            if (document.body.scrollTop > 0) {
                (window.requestAnimationFrame && requestAnimationFrame(f)) || setTimeout(f, 16);
            }
        };
        f()
    }
})();
