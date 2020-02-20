const express = require('express');
const app = express();
const io = require('socket.io')(server);
const port = 3000
const cors = require('cors')

app.use(cors())
const server = require('http').Server(app);

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