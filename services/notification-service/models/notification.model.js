const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  metadata: {
    service: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
