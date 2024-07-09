# NOTIFICATION-SYSTEM

This project is a notification system implemented in Node.js using Express and Kafka for message handling and use Socket.io for real time communication.

### Setup Instructions

1. **Installation:**
   Make sure you have Node.js and npm installed. Run the following command to install dependencies:
    cd Notification-System
    npm install

2. **To start the server:**
    npm start  or  node server.js

## Folder Structure
NOTIFICATION-SYSTEM
│   README.md
│   package.json
│   server.js
│   .env
│
├── config
│   └── kafka.js
│
├── controllers
│   │   authController.js
│   │   notificationController.js
│   └── ...
│
├── middlewares
│   ├── auth
│   │   ├── authenticate.js
│   │   └── authorize.js
│   └── ...
│
├── models
│   │   Notification.js
│   │   User.js
│   └── ...
│
├── routes
│   │   authRoutes.js
│   │   notificationRoutes.js
│   └── ...
│
├── services
│   │   kafkaConsumer.js
│   └── ...
│
└── utils
    │   db.js
    │   retry.js
    └── ...

