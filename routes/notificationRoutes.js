const express = require('express');
const {
  createNotification,
  getNotifications,
  getNotificationById,
  markNotificationAsRead
} = require('../controllers/notificationController');
const { authenticate } = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const router = express.Router();

router.post('/notifications', authenticate, authorize('user'), createNotification);
router.get('/notifications', authenticate, authorize('user'), getNotifications);
router.get('/notifications/:id', authenticate, authorize('user'), getNotificationById);
router.put('/notifications/:id', authenticate, authorize('user'), markNotificationAsRead);

module.exports = router;
