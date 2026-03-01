import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li className="flex items-center gap-4 px-2 py-3 hover:bg-white/5 rounded-lg transition-colors group">
            <div
                onClick={() => onToggle(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${task.isCompleted
                        ? 'bg-google-blue border-google-blue'
                        : 'border-google-secondary hover:border-google-blue'
                    }`}
            >
                {task.isCompleted && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                )}
            </div>
            <span
                onClick={() => onToggle(task.id)}
                className={`text-[15px] cursor-pointer flex-1 transition-all ${task.isCompleted ? 'strikethrough text-google-secondary' : 'text-google-text'
                    }`}
            >
                {task.title}
            </span>
            <button
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-google-secondary hover:text-red-400 transition-all"
                aria-label={`Delete task: ${task.title}`}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                </svg>
            </button>
        </li>
    );
}

export default TaskItem;
