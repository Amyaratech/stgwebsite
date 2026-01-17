import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import './DraggableWidget.css';

const DraggableWidget = ({ id, position, size, backgroundColor, onDrag, isEditMode }) => {
    const nodeRef = useRef(null);

    const handleDrag = (e, data) => {
        if (onDrag) {
            onDrag(id, { x: data.x, y: data.y });
        }
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            position={position}
            onStop={handleDrag}
            disabled={!isEditMode}
            bounds="parent"
        >
            <div
                ref={nodeRef}
                className={`draggable-widget ${isEditMode ? 'edit-mode' : ''}`}
                style={{
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                    backgroundColor: backgroundColor,
                }}
            >
                <div className="widget-content">
                    <p className="widget-placeholder">Component #{id}</p>
                    {isEditMode && (
                        <div className="edit-indicator">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3"></path>
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </Draggable>
    );
};

export default DraggableWidget;
