const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'in-progress', 'completed']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

exports.Task = Task;