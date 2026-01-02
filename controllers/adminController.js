const { User } = require('../models/user');
const { Task } = require('../models/Task');

exports.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page - 1) * limit;

        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skipIndex)
            .exec();

        const total = await User.countDocuments();

        res.json({
            users,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalUsers: total
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error occurred while fetching users' });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page - 1) * limit;

        const tasks = await Task.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skipIndex)
            .exec();

        const total = await Task.countDocuments();

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
