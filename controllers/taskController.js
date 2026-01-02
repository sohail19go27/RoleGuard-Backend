const { Task } = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const newTask = new Task({
            title,
            description,
            status: status || 'pending',
            userId: req.user._id
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error occurred while creating the task' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page - 1) * limit;

        const tasks = await Task.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skipIndex)
            .exec();

        const total = await Task.countDocuments({ userId: req.user._id });

        res.json({
            tasks,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalTasks: total
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error occurred while fetching tasks' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (task.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to update this task' });
        }

        const updateData = {};
        if (req.body.title) updateData.title = req.body.title;
        if (req.body.description) updateData.description = req.body.description;
        if (req.body.status) updateData.status = req.body.status;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        res.json(updatedTask);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error occurred while updating the task' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (task.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to delete this task' });
        }

        await Task.deleteOne({ _id: req.params.id });
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error occurred while deleting the task' });
    }
};
