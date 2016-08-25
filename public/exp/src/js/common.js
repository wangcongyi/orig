(function () {
    var div;
    var top;
    window.addEventListener('scroll', function () {
        top = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        if (top >= 300 && !div) {
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
        var scroll = document.body.scrollTop === 0 ? document.documentElement : document.body;
        var f = function () {
            scroll.scrollTop = top - 30;

            if (top > 0) {
                (window.requestAnimationFrame && requestAnimationFrame(f)) || setTimeout(f, 16);
            }
        };
        f()
    }
})();
