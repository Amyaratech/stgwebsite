import React, { useState, useEffect } from 'react';
import './ThemeSettings.css'; // Reusing the same premium glass styles

const ComponentSettings = ({ isOpen, onClose, onSave, component, availableTypes }) => {
    const [settings, setSettings] = useState({
        name: '',
        type: 'General',
        ...component
    });

    useEffect(() => {
        if (component) {
            setSettings({
                name: component.name || '',
                type: component.type || 'General',
                ...component
            });
        }
    }, [component, isOpen]);

    if (!isOpen) return null;

    const updateSetting = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSave = () => {
        onSave(settings);
        onClose();
    };

    return (
        <div className="theme-overlay" onClick={onClose}>
            <div className="theme-popup" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="theme-header">
                    <div className="header-title-area">
                        <span className="header-icon">⚙️</span>
                        <div>
                            <h2>Component Settings</h2>
                            <p className="theme-subtitle">Configure identity and behavior</p>
                        </div>
                    </div>
                    <button className="theme-close" onClick={onClose}>×</button>
                </div>

                {/* Content */}
                <div className="theme-content">
                    <div className="theme-section fade-in">
                        <h3>Identity</h3>
                        <div className="setting-card">
                            <div className="slider-container">
                                <p className="label-text">Widget Name (Header)</p>
                                <input
                                    type="text"
                                    className="color-hex-input"
                                    style={{ fontFamily: 'inherit' }}
                                    value={settings.name}
                                    onChange={(e) => updateSetting('name', e.target.value)}
                                    placeholder="Enter component name..."
                                />
                            </div>

                            <div className="slider-container">
                                <p className="label-text">Component Type</p>
                                <select
                                    className="color-hex-input"
                                    style={{ fontFamily: 'inherit', appearance: 'auto' }}
                                    value={settings.type}
                                    onChange={(e) => updateSetting('type', e.target.value)}
                                >
                                    <option value="General">General / Placeholder</option>
                                    {availableTypes?.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="theme-footer">
                    <button className="theme-btn secondary" onClick={onClose}>
                        Discard
                    </button>
                    <button className="theme-btn primary" onClick={handleSave}>
                        <span>💾</span> Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComponentSettings;
