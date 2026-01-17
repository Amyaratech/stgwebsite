import React, { useState, useEffect } from 'react';
import './ActionButtons.css';

const { ipcRenderer } = window.require('electron');

const ActionButtons = ({ onSave, onAdd, onEdit, isEditMode }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClose = () => {
        ipcRenderer.send('close-app');
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        ipcRenderer.send('set-ignore-mouse-events', false);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Only make click-through if not in edit mode
        if (!isEditMode) {
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                    </button>
                )}

                {/* Add Button - Always visible */}
                <button
                    className="action-btn add-btn"
                    onClick={onAdd}
                    title="Add New Component"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>

                {/* Edit Button - Only in Live Mode */}
                {!isEditMode && (
                    <button
                        className="action-btn edit-btn"
                        onClick={onEdit}
                        title="Enter Edit Mode"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                )}

                {/* Close Button - Always visible */}
                <button
                    className="action-btn close-btn"
                    onClick={handleClose}
                    title="Close Live Wallpaper"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;
