import React, { useState } from 'react';
import './ThemeSettings.css';

const ThemeSettings = ({ isOpen, onClose, onSave, currentSettings, targetType = 'main' }) => {
    const [activeTab, setActiveTab] = useState('background');
    const [settings, setSettings] = useState(currentSettings);

    if (!isOpen) return null;

    const handleColorChange = (color) => {
        setSettings({
            ...settings,
            backgroundColor: color,
        });
    };

    const handleOpacityChange = (opacity) => {
        setSettings({
            ...settings,
            backgroundOpacity: opacity,
        });
    };

    const handleTransparentToggle = () => {
        setSettings({
            ...settings,
            transparent: !settings.transparent,
        });
    };

    const handleSave = () => {
        onSave(settings);
        onClose();
    };

    // Predefined color palette (like MS Paint)
    const colorPalette = [
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF', '#C0C0C0', '#808080',
        '#800000', '#808000', '#008000', '#008080', '#000080',
        '#800080', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739',
        '#52B788', '#E63946', '#457B9D', '#F4A261', '#2A9D8F'
    ];

    return (
        <div className="theme-overlay" onClick={onClose}>
            <div className="theme-popup" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="theme-header">
                    <h2>🎨 Theme Settings</h2>
                    <p className="theme-subtitle">
                        {targetType === 'main' ? 'Main Window' : 'Component'} Customization
                    </p>
                    <button className="theme-close" onClick={onClose}>×</button>
                </div>

                {/* Tabs */}
                <div className="theme-tabs">
                    <button
                        className={`theme-tab ${activeTab === 'background' ? 'active' : ''}`}
                        onClick={() => setActiveTab('background')}
                    >
                        🎨 Background
                    </button>
                    <button
                        className={`theme-tab ${activeTab === 'border' ? 'active' : ''}`}
                        onClick={() => setActiveTab('border')}
                    >
                        🔲 Border
                    </button>
                    <button
                        className={`theme-tab ${activeTab === 'effects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('effects')}
                    >
                        ✨ Effects
                    </button>
                </div>

                {/* Content */}
                <div className="theme-content">
                    {activeTab === 'background' && (
                        <div className="theme-section">
                            <h3>Background Color</h3>

                            {/* Transparent Toggle */}
                            <div className="setting-row">
                                <label className="setting-label">
                                    <input
                                        type="checkbox"
                                        checked={settings.transparent}
                                        onChange={handleTransparentToggle}
                                    />
                                    <span>Transparent Background</span>
                                </label>
                            </div>

                            {/* Color Picker Grid */}
                            {!settings.transparent && (
                                <>
                                    <div className="color-palette">
                                        {colorPalette.map((color) => (
                                            <button
                                                key={color}
                                                className={`color-swatch ${settings.backgroundColor === color ? 'selected' : ''}`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => handleColorChange(color)}
                                                title={color}
                                            />
                                        ))}
                                    </div>

                                    {/* Custom Color Input */}
                                    <div className="setting-row">
                                        <label className="setting-label">Custom Color:</label>
                                        <input
                                            type="color"
                                            value={settings.backgroundColor}
                                            onChange={(e) => handleColorChange(e.target.value)}
                                            className="color-input"
                                        />
                                        <input
                                            type="text"
                                            value={settings.backgroundColor}
                                            onChange={(e) => handleColorChange(e.target.value)}
                                            className="color-text-input"
                                            placeholder="#000000"
                                        />
                                    </div>

                                    {/* Opacity Slider */}
                                    <div className="setting-row">
                                        <label className="setting-label">
                                            Opacity: {Math.round(settings.backgroundOpacity * 100)}%
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={settings.backgroundOpacity}
                                            onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
                                            className="opacity-slider"
                                        />
                                    </div>

                                    {/* Preview */}
                                    <div className="setting-row">
                                        <label className="setting-label">Preview:</label>
                                        <div
                                            className="color-preview"
                                            style={{
                                                backgroundColor: settings.backgroundColor,
                                                opacity: settings.backgroundOpacity,
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'border' && (
                        <div className="theme-section">
                            <h3>Border Settings</h3>
                            <p className="coming-soon">Coming soon...</p>
                        </div>
                    )}

                    {activeTab === 'effects' && (
                        <div className="theme-section">
                            <h3>Visual Effects</h3>
                            <p className="coming-soon">Coming soon...</p>
                        </div>
                    )}
                </div>

                {/* Footer with Save Button */}
                <div className="theme-footer">
                    <button className="theme-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="theme-save" onClick={handleSave}>
                        💾 Save Theme
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeSettings;
