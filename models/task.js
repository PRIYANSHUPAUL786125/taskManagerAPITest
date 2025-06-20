const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  dueDate: {
    type: Date,
    default:null
  },
  completed: {
    type: Boolean,
    default:false
  },
  priority: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 🔗 Reference to the User model
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
