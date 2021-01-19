/*Contributors: Ruben */

const http=require('http')
const express = require('express')
const app = express()
const compression = require('compression')
app.listen(process.env.PORT||8000)

app.use(compression({filter:shouldCompress}))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) return false
  return compression.filter(req, res)
}
app.use(express.static('output'))

require('./server/server.js')(app);
app.use((req,res)=>res.sendFile(__dirname+'/output/index.html'))
