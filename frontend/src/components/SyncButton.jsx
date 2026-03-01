import React from 'react';

function SyncButton({ loading, onSync }) {
    return (
        <button
            onClick={onSync}
            disabled={loading}
            className="sync-btn px-10 py-2.5 text-sm font-medium tracking-wide flex items-center gap-2"
        >
            {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-google-blue border-t-transparent rounded-full"></div>
            ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"></path>
                </svg>
            )}
            {loading ? 'SYNCING' : 'SYNC TO DATABASE'}
        </button>
    );
}

export default SyncButton;
