const kafka = require('kafka-node');
const Notification = require('../models/Notification');
const io = require('socket.io')(require('../server'));

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const consumer = new kafka.Consumer(
  client,
  [{ topic: process.env.KAFKA_TOPIC, partition: 0 }],
  { autoCommit: true }
);

consumer.on('message', (message) => {
  const notification = JSON.parse(message.value);
  const savedNotification = new Notification(notification);
  savedNotification.save();

  io.to(notification.userId).emit('new-notification', notification);
});

consumer.on('error', (err) => {
  console.error('Kafka Consumer error:', err);
});
