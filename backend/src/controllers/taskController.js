const Task = require('../models/Task');

/**
 * @desc    Get all tasks
 * @route   GET /api/tasks
 * @access  Public
 */
const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Save/Sync tasks (overwrites existing)
 * @route   POST /api/tasks
 * @access  Public
 */
const saveTasks = async (req, res, next) => {
    try {
        const { tasks } = req.body;

        if (!tasks || !Array.isArray(tasks)) {
            const error = new Error('Please provide an array of tasks');
            error.statusCode = 400;
            throw error;
        }

        if (tasks.length === 0) {
            const error = new Error('Tasks array cannot be empty');
            error.statusCode = 400;
            throw error;
        }

        // Validate each task has a title
        for (const task of tasks) {
            if (!task.title || typeof task.title !== 'string' || !task.title.trim()) {
                const error = new Error('Each task must have a non-empty title');
                error.statusCode = 400;
                throw error;
            }
        }

        // Clear existing tasks and insert the current list
        await Task.deleteMany({});
        const savedTasks = await Task.insertMany(tasks);

        res.status(201).json({
            success: true,
            count: savedTasks.length,
            data: savedTasks
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    saveTasks
};
