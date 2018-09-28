* 获取伪类样式
```js
window.getComputedStyle(document.querySelector('.element'),':before').getPropertyValue('color');
```


* 页面重构的时候 可以使用伪类元素的背景图  但是宽高不受限制
```css
.logo:after {
    content: url("path.png");
    display: inline-block;
    width: 26px;
    height: 26px;
    background-size: 10px 20px;
}
```


* 折角边框样式
```css
.demo {
    background-image: linear-gradient(to right, #DCE3E6 .3rem, transparent .3rem), linear-gradient(to right, #DCE3E6 .3rem, transparent .3rem), linear-gradient(to bottom, #DCE3E6 .3rem, transparent .3rem), linear-gradient(to bottom, #DCE3E6 .3rem, transparent .3rem);
    background-size: 100% 1px, 100% 1px, 1px 100%, 1px 100%;
    background-position: -.15rem 0, -.15rem 100%, 0 -.15rem, 100% -.15rem;
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
}
```





* margin 合并情况和解决方案  
[margin collapse](https://jonathan-harrell.com/whats-the-deal-with-margin-collapse/)
  
  
  
  
  
* 文本换行问题效果  
[codepen](https://codepen.io/chriscoyier/pen/qoLLpN)
  
  
  
  
  
* AE + bodymovin 做动画非常好的解决方案~  但使用过程中貌似 camera 只能有一个，
[bodymovin](https://github.com/airbnb/lottie-web)


