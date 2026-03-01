import React, { useState } from 'react';

function TaskInput({ onAddTask }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        onAddTask(inputValue.trim());
        setInputValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setInputValue('');
        }
    };

    return (
        <div className="flex items-center gap-3 px-2 py-1 mb-4 border-b border-google-border pb-4">
            <span className="text-google-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </span>
            <form onSubmit={handleSubmit} className="flex-1">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What needs to be done?"
                    maxLength={120}
                    className="google-input w-full outline-none"
                />
            </form>
            {inputValue.trim() && (
                <span className="text-xs text-google-secondary">{inputValue.length}/120</span>
            )}
        </div>
    );
}

export default TaskInput;
