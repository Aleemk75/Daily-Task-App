import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import SyncButton from './components/SyncButton';

const API_URL = 'https://daily-task-app-backend.onrender.com/api/tasks';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('daily-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('all');
  const [syncStatus, setSyncStatus] = useState({ loading: false, message: '' });
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  // Persist to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('daily-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // On mount: try to load tasks from the server (if any exist)
  useEffect(() => {
    const loadFromServer = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.success && data.count > 0) {
          // Map server data to local format
          const serverTasks = data.data.map((t) => ({
            id: t._id || t.id || Date.now(),
            title: t.title,
            isCompleted: t.isCompleted || false,
          }));
          setTasks(serverTasks);
        }
      } catch {
        // Server might not be running — silently fall back to localStorage
      }
    };

    loadFromServer();
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast((t) => ({ ...t, show: false })), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // --- Task Actions ---
  const handleAddTask = (title) => {
    const newTask = { id: Date.now(), title, isCompleted: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // --- Sync ---
  const handleSync = async () => {
    if (tasks.length === 0) {
      setToast({ show: true, message: 'No tasks to sync.', type: 'warning' });
      return;
    }

    setSyncStatus({ loading: true, message: 'Syncing...' });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks }),
      });

      const data = await response.json();

      if (data.success) {
        setSyncStatus({ loading: false, message: 'Synced successfully!' });
        setToast({ show: true, message: `${data.count} tasks saved to database`, type: 'success' });
      } else {
        setSyncStatus({ loading: false, message: `Sync failed: ${data.message}` });
        setToast({ show: true, message: `Sync failed: ${data.message}`, type: 'error' });
      }
    } catch {
      setSyncStatus({ loading: false, message: 'Sync error. Is the server running?' });
      setToast({ show: true, message: 'Sync error. Please try again.', type: 'error' });
    }
  };

  // --- Stats ---
  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="todo-container">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`google-toast ${toast.type === 'success' ? 'toast-success' : toast.type === 'error' ? 'toast-error' : ''}`}>
          {toast.message}
          <button
            onClick={() => setToast((t) => ({ ...t, show: false }))}
            className="text-google-blue font-bold ml-4 hover:bg-white/10 px-2 py-1 rounded"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* Header */}
      <header className="mb-10 flex items-center gap-3">
        <div className="bg-google-blue p-2 rounded-full">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white" />
          </svg>
        </div>
        <h1 className="text-2xl font-medium tracking-tight text-white">My Daily Tasks</h1>
      </header>

      {/* Main Task Card */}
      <div className="task-card p-4">
        <TaskInput onAddTask={handleAddTask} />

        {/* Filter Tabs */}
        {totalCount > 0 && (
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex gap-1">
              {['all', 'active', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-xs rounded-full capitalize transition-colors ${filter === f
                      ? 'bg-google-blue/20 text-google-blue'
                      : 'text-google-secondary hover:bg-white/5'
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <span className="text-xs text-google-secondary">
              {completedCount}/{totalCount} done
            </span>
          </div>
        )}

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="mx-2 mb-4 h-1 bg-google-border rounded-full overflow-hidden">
            <div
              className="h-full bg-google-blue rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Task List */}
        <TaskList tasks={tasks} filter={filter} onToggle={toggleTask} onDelete={deleteTask} />
      </div>

      {/* Sync Section */}
      <div className="mt-10 flex flex-col items-center">
        <SyncButton loading={syncStatus.loading} onSync={handleSync} />
        {syncStatus.message && (
          <p className="mt-4 text-xs text-google-secondary animate-pulse">{syncStatus.message}</p>
        )}
      </div>
    </div>
  );
}

export default App;
