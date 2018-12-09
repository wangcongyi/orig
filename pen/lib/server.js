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
