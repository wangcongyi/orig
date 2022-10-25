## 使用 node.js 拷贝文件夹，并增加 `Md5` 戳 并输出映射表
### 需要修改 `fs-extra` 第三方模块，而且不支持预编译或其他功能
#### 目前功能小，而且功能不足 懒～～～ 😁

`build.js`

```js

const fs = require('fs-extra');
fs.copy('./static', 'assets')

```

`fs-extra copy.js`

```js

function setDestModeAndTimestamps(srcStat, dest, opts, cb, src) {
    const srcname = path.basename(src)
    const extname = path.extname(dest)
    const dirname = path.dirname(dest)
    const filename = path.basename(dest, extname)
    const stream = fs.createReadStream(dest)
    const fsHash = crypto.createHash('md5')
    if (extname.match(/\.(js|css)/gi)) {
        stream.on('data', d => fsHash.update(d))
        stream.on('end', () => {
            const md5 = fsHash.digest('hex')
            fs.renameSync(dest, `${dirname}/${filename}-${md5}${extname}`)
            d[srcname] = `${filename}-${md5}${extname}`
            fs.writeFileSync('map.json', JSON.stringify(d))
        })
    }
    fs.chmod(dest, srcStat.mode, err => {
        if (err) return cb(err)
        if (opts.preserveTimestamps) {
            return utimes(dest, srcStat.atime, srcStat.mtime, cb)
        }
        return cb()
    })
}

```


#### 菱形 ◇

```js
let j, z = 1, n = 19
Array(n).fill(0).map(() => {
    z > n ? j = j - 2 : j = z
    z += 2
    return ' '.repeat((n - j) / 2) + '*'.repeat(j) + '\n'
  }).join('')

```




