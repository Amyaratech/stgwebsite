import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import './DraggableWidget.css';

const DraggableWidget = ({ id, name, type, position, size, theme, onAction, isEditMode }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const nodeRef = useRef(null);
    const [localSize, setLocalSize] = useState(size || { width: 300, height: 300 });

    useEffect(() => {
        if (size) setLocalSize(size);
    }, [size]);

    const handleDrag = (e, data) => {
        onAction(id, 'drag', { x: data.x, y: data.y });
    };

    const handleResizeMouseDown = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = localSize.width;
        const startHeight = localSize.height;

        const onMouseMove = (moveEvent) => {
            // Min 300px, Max 1200px as per requirements
            const newWidth = Math.max(300, Math.min(1200, startWidth + (moveEvent.clientX - startX)));
            const newHeight = Math.max(300, Math.min(1200, startHeight + (moveEvent.clientY - startY)));

            setLocalSize({ width: newWidth, height: newHeight });
            onAction(id, 'resize', { width: newWidth, height: newHeight });
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const getWidgetStyle = () => {
        if (!theme) return {};

        const hex = theme.backgroundColor || '#ffffff';
        let bgColor = hex;
        if (theme.transparent) {
            bgColor = 'rgba(0,0,0,0)';
        } else if (theme.backgroundOpacity < 1) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            bgColor = `rgba(${r}, ${g}, ${b}, ${theme.backgroundOpacity})`;
        }

        return {
            width: `${localSize.width}px`,
            height: `${localSize.height}px`,
            backgroundColor: bgColor,
            borderRadius: `${theme.borderRadius}px`,
            border: !theme.transparent && theme.borderWidth > 0
                ? `${theme.borderWidth}px ${theme.borderStyle} ${theme.borderColor}`
                : 'none',
            backdropFilter: !theme.transparent && theme.blur > 0 ? `blur(${theme.blur}px)` : 'none',
            filter: !theme.transparent ? `brightness(${theme.brightness}) contrast(${theme.contrast})` : 'none',
        };
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            position={position}
            onDrag={handleDrag}
            disabled={!isEditMode}
            bounds="parent"
        >
            <div
                ref={nodeRef}
                className={`draggable-widget ${isEditMode ? 'edit-mode' : ''} ${isHovered ? 'hovered' : ''}`}
                style={getWidgetStyle()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setShowDeleteConfirm(false);
                }}
            >
                {/* Mini Action Menu */}
                {isEditMode && isHovered && !showDeleteConfirm && (
                    <div className="widget-menu">
                        <button className="widget-btn close" onClick={() => onAction(id, 'close')} title="Hide">×</button>
                        <button className="widget-btn theme" onClick={() => onAction(id, 'theme')} title="Theme Settings">🎨</button>
                        <button className="widget-btn edit" onClick={() => onAction(id, 'edit')} title="Component Settings">✏️</button>
                        <button className="widget-btn delete" onClick={() => setShowDeleteConfirm(true)} title="Delete">🗑️</button>
                    </div>
                )}

                {/* Header Section */}
                <div
                    className="widget-header"
                    style={{
                        backgroundColor: theme?.headerBackgroundColor || 'transparent',
                    }}
                >
                    <span
                        className="widget-title"
                        style={{
                            color: theme?.headerTextColor || '#000000',
                        }}
                    >
                        {name || `New Component`}
                    </span>
                </div>

                {/* Main Content Area */}
                <div className="widget-content">
                    <div className="component-type-badge" style={{ color: theme?.headerTextColor ? `${theme.headerTextColor}CC` : 'rgba(0,0,0,0.4)' }}>
                        {type || 'General'}
                    </div>
                </div>

                {/* Delete Confirmation Overlay */}
                {showDeleteConfirm && (
                    <div className="delete-confirm-overlay">
                        <p>Are you sure you want to delete?</p>
                        <div className="confirm-buttons">
                            <button className="confirm-btn yes" onClick={() => onAction(id, 'delete')}>Yes</button>
                            <button className="confirm-btn no" onClick={() => setShowDeleteConfirm(false)}>No</button>
                        </div>
                    </div>
                )}

                {/* Resize Handle */}
                {isEditMode && (
                    <div
                        className="resize-handle"
                        onMouseDown={handleResizeMouseDown}
                    />
                )}
            </div>
        </Draggable>
    );
};

export default DraggableWidget;
