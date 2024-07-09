const Notification = require('../models/Notification');
const sendMessage = require('../config/kafka');
const { retryOperation } = require('../utils/retry');

const createNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const notification = { userId: req.user._id, message, read: false };

    await retryOperation(async () => {
      await sendMessage(notification);
    });

    res.status(201).json({ message: 'Notification created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const fetchNotifications = async () => {
      const notifications = await Notification.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

      const total = await Notification.countDocuments({ userId: req.user._id });
      return {
        notifications,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      };
    };

    const result = await retryOperation(fetchNotifications);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const fetchNotification = async () => {
      const notification = await Notification.findById(req.params.id);
      if (!notification) throw new Error('Notification not found');
      return notification;
    };

    const result = await retryOperation(fetchNotification);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const markNotificationAsRead = async (req, res) => {
  try {
    const updateNotification = async () => {
      const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
      if (!notification) throw new Error('Notification not found');
      return notification;
    };

    const result = await retryOperation(updateNotification);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  getNotificationById,
  markNotificationAsRead
};
