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
    background-image: 
    linear-gradient(to right, #DCE3E6 .3rem, transparent .3rem), 
    linear-gradient(to right, #DCE3E6 .3rem, transparent .3rem), 
    linear-gradient(to bottom, #DCE3E6 .3rem, transparent .3rem),
    linear-gradient(to bottom, #DCE3E6 .3rem, transparent .3rem);
    background-size: 100% 1px, 100% 1px, 1px 100%, 1px 100%;
    background-position: -.15rem 0, -.15rem 100%, 0 -.15rem, 100% -.15rem;
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
}
```

* margin 合并情况和解决方案  
[margin collapse](https://jonathan-harrell.com/whats-the-deal-with-margin-collapse/)

* 文本换行问题效果  
[codepen](https://codepen.io/chriscoyier/pen/qoLLpN)
   
* AE + bodymovin 做动画非常好的解决方案~  但使用过程中貌似 camera 只能有一个。  
[bodymovin](https://github.com/airbnb/lottie-web)

* 不错的设计
```css

 html, body {
          height: 100%;
      }

      body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          background: #1D1F20;
      }

      div, p {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 172px;
          height: 82px;
          color: white;
          background: #262D3B;
          position: relative;
          border-radius: 4px;
      }

      p {
          overflow: hidden;
      }

      p::before {
          content: '';
          position: absolute;
          width: 138px;
          height: 94px;
          background-color: rgba(239, 90, 85, 1);
          filter: blur(40px) brightness(0.45);
          left: 110px;
          top: 14px;
          border-radius: 100%;
      }

      div::after {
          content: '';
          position: absolute;
          height: 103%;
          width: 102%;
          background: linear-gradient(120deg, rgba(239, 90, 85, .3), rgba(239, 90, 85, 0) 30%, rgba(239, 90, 85, 0) 75%, rgba(239, 90, 85, .75));
          border-radius: 4px;
          z-index: -1;
      }

```

* 不错的思路
```css

     body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
      }

      *, *::before, *::after {
          box-sizing: border-box;
      }


      @keyframes rotate {
          100% {
              transform: rotate(1turn);
          }
      }
      .rainbow {
          position: relative;
          z-index: 0;
          width: 400px;
          height: 300px;
          border-radius: 10px;
          overflow: hidden;
          padding: 2rem;
      }
      .rainbow::before {
          content: "";
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          background-color: #399953;
          background-repeat: no-repeat;
          background-size: 50% 50%, 50% 50%;
          background-position: 0 0, 100% 0, 100% 100%, 0 100%;
          background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
          animation: rotate 4s linear infinite;
      }
      .rainbow::after {
          content: "";
          position: absolute;
          z-index: -1;
          left: 6px;
          top: 6px;
          width: calc(100% - 12px);
          height: calc(100% - 12px);
          background: white;
          border-radius: 5px;
          animation: opacityChange 3s infinite alternate;
      }


      @keyframes opacityChange {
          50% {
              opacity: 1;
          }
          100% {
              opacity: 0.5;
          }
      }

```

* 使用 CSS 自定义高亮（range 对象， Highlight 对象）

```html
<style>
::highlight(rangeA) {
  background-color: rgb(255 0 0 / 0.5) /* red */
}
</style>

<pre><code>this is my highlighted code</code></pre>

<script>
  const textNode = document.querySelector('code').firstChild
  const highlightA = new Highlight()
  const rangeA = new Range()
  rangeA.setStart(textNode, 0)
  rangeA.setEnd(textNode, 15)
  highlightA.add(rangeA)
  CSS.highlights.set('rangeA', highlightA)
</script>

```
