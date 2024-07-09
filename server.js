const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
require('./services/kafkaConsumer'); // Start Kafka consumer

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', notificationRoutes);

connectDB();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('register', (userId) => {
    console.log(userId + " user is registered successfully");
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
