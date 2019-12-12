require('babel-core/register')

var program = require('commander')
var app = require('./app.js').default

program
  .option('-h, --host [host]', 'service host', '0.0.0.0:8888')
  .option('-n, --name [name]', 'service name', '')
  .parse(process.argv)

var parts = program.host.split(':')

app.listen(parts[1], parts[0], function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log(`listening on ${program.host}`)
})

app.listen(8888)


////////
const Koa = require('koa')
const { p, proxy } = require('./config')
const cors = require('./utils/cors')
const traverFile = require('./utils/traverFile')

const parts = p.port.split(':')
const app = new Koa()

app.use(cors())
traverFile(module, './controller', { visit: obj => app.use(obj.routes()) })

app.listen(parts[1], parts[0], function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log(`\u001b[35m${parts}\u001b[39m --->>> \u001b[96m${proxy}\u001b[39m\n`)
})
