import React, { useState, useEffect } from 'react';
import './ActionButtons.css';

// Safe IPC access
const getIpc = () => {
    try {
        if (window.require) {
            return window.require('electron').ipcRenderer;
        }
    } catch (e) {
        console.warn('IPC not available in ActionButtons');
    }
    return null;
};

const ipcRenderer = getIpc();

const ActionButtons = ({ onSave, onAdd, onTheme, onEdit, isEditMode, isThemeOpen }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClose = () => {
        if (ipcRenderer) {
            ipcRenderer.send('close-app');
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (ipcRenderer) {
            ipcRenderer.send('set-ignore-mouse-events', false);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Only make click-through if not in edit mode AND theme popup is not open
        if (!isEditMode && !isThemeOpen && ipcRenderer) {
            ipcRenderer.send('set-ignore-mouse-events', true, { forward: true });
        }
    };

    // Always show buttons when hovered OR in edit mode
    const shouldShowButtons = isHovered || isEditMode;

    return (
        <div
            className="action-buttons-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`action-buttons ${shouldShowButtons ? 'visible' : ''}`}>
                {/* Save Button - Only in Edit Mode */}
                {isEditMode && (
                    <button
                        className="action-btn save-btn"
                        onClick={onSave}
                        title="Save All Components"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                            <polyline points="17 21 17 13 7 13 7 21" />
                            <polyline points="7 3 7 8 15 8" />
                        </svg>
                    </button>
                )}

                {/* Add Button - Always visible */}
                <button
                    className="action-btn add-btn"
                    onClick={onAdd}
                    title="Add New Component"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>

                {/* Theme Button - Always visible */}
                <button
                    className="action-btn theme-btn"
                    onClick={onTheme}
                    title="Theme Settings"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12.89 1.45 8 4.62c.69.4 1.11 1.14 1.11 1.93s-.42 1.53-1.11 1.93l-8 4.62c-.69.4-1.53.4-2.22 0l-8-4.62C3.98 9.53 3.56 8.79 3.56 8s.42-1.53 1.11-1.93l8-4.62c.69-.4 1.53-.4 2.22 0z" />
                        <path d="m22 12.03-1.11.64-8 4.62c-.69.4-1.53.4-2.22 0l-8-4.62-1.11-.64" />
                        <path d="m22 17.03-1.11.64-8 4.62c-.69.4-1.53.4-2.22 0l-8-4.62-1.11-.64" />
                    </svg>
                </button>

                {/* Edit Button - Only in Live Mode */}
                {!isEditMode && (
                    <button
                        className="action-btn edit-btn"
                        onClick={onEdit}
                        title="Enter Edit Mode"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button>
                )}

                {/* Close Button - Always visible */}
                <button
                    className="action-btn close-btn"
                    onClick={handleClose}
                    title="Close Live Wallpaper"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;
