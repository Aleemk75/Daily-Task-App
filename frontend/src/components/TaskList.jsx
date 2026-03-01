import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, filter, onToggle, onDelete }) {
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') return !task.isCompleted;
        if (filter === 'completed') return task.isCompleted;
        return true;
    });

    if (tasks.length === 0) {
        return (
            <div className="py-10 text-center">
                <p className="text-google-secondary text-base">No tasks yet.</p>
                <p className="text-google-secondary/60 text-sm mt-1">Add one above to get started!</p>
            </div>
        );
    }

    if (filteredTasks.length === 0) {
        return (
            <div className="py-8 text-center">
                <p className="text-google-secondary text-sm">
                    No {filter} tasks.
                </p>
            </div>
        );
    }

    return (
        <ul className="space-y-1">
            {filteredTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default TaskList;
