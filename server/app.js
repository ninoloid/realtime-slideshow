const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors())

const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(port, () => {
  console.log('listening on port', port)
})

app.get('/', function (req, res) {
  res.send('oke')
})

io.on('connection', function (socket) {
  console.log('Client connected')
  socket.on('newIndex', (index) => {
    console.log(index)
    io.emit('sliderIndex', index)
  })
})