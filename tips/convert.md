1. 将 string 字符串转换成  Blob 对象  

```js

const blob = new Blob([string], {type: 'text/plain'})

console.log(blob)
console.log(blob.slice(1, 3, 'text/plain'))

```

2. 将 TypeArray 转换成 Blob 对象  

```js

const array = new Uint16Array([xx, xx, xx, xx, xx])
const blob = new Blob([array])
const reader = new FileReader()
reader.readAsText(blob, 'utf-8')


//  ArrayBuffer 转 Blob

const buffer = new ArrayBuffer(32)
const blob = new Blob([buffer])

```

3. 将 Blob 对象转换成 String 字符串  

```js

const blob = new Blob([string], {type: 'text/plain'})
const reader = new FileReader()
reader.readAsText(blob, 'utf-8')
reader.onload = (e) => {
  console.log(reader.result)
)}

```


4. 将 Blob 转换成ArrayBuffer  

```js

const blob = new Blob([string], {type: 'text/plain'})
const reader = new FileReader()
reader.readAsArrayBuffer(blob)
reader.onload = () => {
  console.log(reader.result)
  const buffer = new Uint8Array(reader.result)    //  const buffer = new DataView(reader.result)
  reader.readAsText(new Blob([buffer]), 'utf-8')
  reader.onload = () => {
    console.log(reader.result)
  }
}

```
