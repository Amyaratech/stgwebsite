import React, { useState, useEffect } from 'react';
import './ThemeSettings.css';
import { themePresets, applyThemePreset } from '../data/themePresets';

const ThemeSettings = ({ isOpen, onClose, onSave, currentSettings, targetType = 'main' }) => {
    const [activeTab, setActiveTab] = useState('presets'); // Changed to 'presets' as default
    const [settings, setSettings] = useState({
        backgroundColor: '#000000',
        backgroundOpacity: 1,
        transparent: false,
        borderRadius: 0,
        borderWidth: 0,
        borderColor: '#ffffff',
        borderStyle: 'solid',
        blur: 0,
        brightness: 1,
        contrast: 1,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 0,
        headerBackgroundColor: 'transparent',
        headerTextColor: '#000000',
        ...currentSettings
    });

    // Update settings only when popup opens to avoid overwriting active user input
    useEffect(() => {
        if (isOpen && currentSettings) {
            setSettings(prev => ({ ...prev, ...currentSettings }));
        }
    }, [isOpen, currentSettings]);

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

    const handleApplyPreset = (preset) => {
        const applied = applyThemePreset(preset);
        onSave(applied.theme);
        onClose();
    };

    // Predefined color palette
    const colorPalette = [
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF', '#C0C0C0', '#808080',
        '#800000', '#808000', '#008000', '#008080', '#000080',
        '#800080', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739',
        '#52B788', '#E63946', '#457B9D', '#F4A261', '#2A9D8F',
        'transparent'
    ];

    return (
        <div className="theme-overlay" onClick={onClose}>
            <div className="theme-popup" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="theme-header">
                    <div className="header-title-area">
                        <span className="header-icon">🎨</span>
                        <div>
                            <h2>Theme Settings</h2>
                            <p className="theme-subtitle">
                                {targetType === 'main' ? 'Main Window' : 'Component'} Customization
                            </p>
                        </div>
                    </div>
                    <button className="theme-close" onClick={onClose}>×</button>
                </div>

                {/* Tabs */}
                <div className="theme-tabs">
                    <button
                        className={`theme-tab ${activeTab === 'presets' ? 'active' : ''}`}
                        onClick={() => setActiveTab('presets')}
                    >
                        ✨ Presets
                    </button>
                    <button
                        className={`theme-tab ${activeTab === 'background' ? 'active' : ''}`}
                        onClick={() => setActiveTab('background')}
                    >
                        🎨 Background
                    </button>
                    {targetType === 'component' && (
                        <button
                            className={`theme-tab ${activeTab === 'header' ? 'active' : ''}`}
                            onClick={() => setActiveTab('header')}
                        >
                            🏷️ Header
                        </button>
                    )}
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
                    {/* Presets Tab */}
                    {activeTab === 'presets' && (
                        <div className="theme-section fade-in">
                            <h3>✨ Theme Presets</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px', fontSize: '14px' }}>
                                Select from our curated collection of professional themes.
                                Each preset applies beautiful 3D card styling, colors, and effects instantly.
                            </p>

                            <div className="theme-presets-grid-large">
                                {themePresets.map((preset) => (
                                    <div
                                        key={preset.id}
                                        className="theme-preset-card-large"
                                        onClick={() => handleApplyPreset(preset)}
                                    >
                                        <div className="preset-header-row">
                                            <div className="preset-emoji-large">{preset.emoji}</div>
                                            <div className="preset-info-large">
                                                <h4 className="preset-name-large">{preset.name}</h4>
                                                <p className="preset-description-large">{preset.description}</p>
                                            </div>
                                        </div>

                                        <div className="preset-widget-preview">
                                            <div
                                                className="preview-widget-container"
                                                style={{
                                                    backgroundColor: preset.container.backgroundColor,
                                                    opacity: preset.container.backgroundOpacity,
                                                    borderRadius: `${preset.container.borderRadius}px`,
                                                    borderWidth: `${preset.container.borderWidth}px`,
                                                    borderColor: preset.container.borderColor,
                                                    borderStyle: preset.container.borderStyle,
                                                    filter: `brightness(${preset.container.brightness}) contrast(${preset.container.contrast})`,
                                                    boxShadow: `${preset.container.shadowX / 2}px ${preset.container.shadowY / 2}px ${preset.container.shadowBlur / 2}px ${preset.container.shadowColor}`
                                                }}
                                            >
                                                <div
                                                    className="preview-widget-header"
                                                    style={{
                                                        backgroundColor: preset.container.headerBackgroundColor,
                                                        color: preset.container.headerTextColor
                                                    }}
                                                >
                                                    PREVIEW
                                                </div>
                                                <div className="preview-widget-content">
                                                    <div
                                                        className="preview-time"
                                                        style={{
                                                            color: preset.clock.timeColor,
                                                            fontFamily: preset.clock.fontFamily
                                                        }}
                                                    >
                                                        12:49
                                                    </div>
                                                    <div
                                                        className="preview-location"
                                                        style={{ color: preset.clock.locationColor }}
                                                    >
                                                        Theme Preview
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="preset-click-hint">Click to apply →</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Header Tab */}
                    {activeTab === 'header' && targetType === 'component' && (
                        <div className="theme-section fade-in">
                            <h3>Header Customization</h3>

                            <div className="setting-card">
                                <div className="color-grid-container">
                                    <p className="label-text">Header Background Color</p>
                                    <div className="color-palette">
                                        {colorPalette.map((color) => (
                                            <button
                                                key={color}
                                                className={`color-swatch ${settings.headerBackgroundColor === color ? 'selected' : ''}`}
                                                style={{ backgroundColor: color === 'transparent' ? 'rgba(0,0,0,0.1)' : color }}
                                                onClick={() => updateSetting('headerBackgroundColor', color)}
                                                title={color}
                                            >
                                                {color === 'transparent' && <span style={{ fontSize: '10px', color: 'white' }}>None</span>}
                                                {settings.headerBackgroundColor === color && <span className="check-icon">✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="custom-color-area">
                                    <p className="label-text">Header Text Color</p>
                                    <div className="color-inputs">
                                        <input
                                            type="color"
                                            value={settings.headerTextColor}
                                            onChange={(e) => updateSetting('headerTextColor', e.target.value)}
                                            className="color-picker-input"
                                        />
                                        <input
                                            type="text"
                                            value={settings.headerTextColor}
                                            onChange={(e) => updateSetting('headerTextColor', e.target.value)}
                                            className="color-hex-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Background Tab */}
                    {activeTab === 'background' && (
                        <div className="theme-section fade-in">
                            <h3>Background Appearance</h3>

                            <div className="setting-card">
                                <div className="setting-row">
                                    <label className="setting-label toggle-label">
                                        <span>Transparent Background</span>
                                        <input
                                            type="checkbox"
                                            className="ios-toggle"
                                            checked={settings.transparent}
                                            onChange={(e) => updateSetting('transparent', e.target.checked)}
                                        />
                                    </label>
                                </div>

                                {!settings.transparent && (
                                    <>
                                        <div className="color-grid-container">
                                            <p className="label-text">Select Color</p>
                                            <div className="color-palette">
                                                {colorPalette.map((color) => (
                                                    <button
                                                        key={color}
                                                        className={`color-swatch ${settings.backgroundColor === color ? 'selected' : ''}`}
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => updateSetting('backgroundColor', color)}
                                                        title={color}
                                                    >
                                                        {settings.backgroundColor === color && <span className="check-icon">✓</span>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="custom-color-area">
                                            <p className="label-text">Custom Hex</p>
                                            <div className="color-inputs">
                                                <input
                                                    type="color"
                                                    value={settings.backgroundColor}
                                                    onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                                                    className="color-picker-input"
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.backgroundColor}
                                                    onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                                                    className="color-hex-input"
                                                    placeholder="#000000"
                                                />
                                            </div>
                                        </div>

                                        <div className="slider-container">
                                            <div className="slider-header">
                                                <p className="label-text">Opacity</p>
                                                <span className="slider-value">{Math.round(settings.backgroundOpacity * 100)}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={settings.backgroundOpacity}
                                                onChange={(e) => updateSetting('backgroundOpacity', parseFloat(e.target.value))}
                                                className="pro-slider"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Border Tab */}
                    {activeTab === 'border' && (
                        <div className="theme-section fade-in">
                            <h3>Border & Corners</h3>
                            <div className="setting-card">
                                <div className="slider-container">
                                    <div className="slider-header">
                                        <p className="label-text">Corner Radius</p>
                                        <span className="slider-value">{settings.borderRadius}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="50"
                                        value={settings.borderRadius}
                                        onChange={(e) => updateSetting('borderRadius', parseInt(e.target.value))}
                                        className="pro-slider"
                                    />
                                </div>

                                <div className="slider-container">
                                    <div className="slider-header">
                                        <p className="label-text">Border Width</p>
                                        <span className="slider-value">{settings.borderWidth}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        value={settings.borderWidth}
                                        onChange={(e) => updateSetting('borderWidth', parseInt(e.target.value))}
                                        className="pro-slider"
                                    />
                                </div>

                                <div className="custom-color-area">
                                    <p className="label-text">Border Color</p>
                                    <div className="color-inputs">
                                        <input
                                            type="color"
                                            value={settings.borderColor}
                                            onChange={(e) => updateSetting('borderColor', e.target.value)}
                                            className="color-picker-input"
                                        />
                                        <input
                                            type="text"
                                            value={settings.borderColor}
                                            onChange={(e) => updateSetting('borderColor', e.target.value)}
                                            className="color-hex-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Effects Tab */}
                    {activeTab === 'effects' && (
                        <div className="theme-section fade-in">
                            <h3>Visual Effects</h3>
                            <div className="setting-card">
                                <div className="slider-container">
                                    <div className="slider-header">
                                        <p className="label-text">Backdrop Blur (Glass Effect)</p>
                                        <span className="slider-value">{settings.blur}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="20"
                                        value={settings.blur}
                                        onChange={(e) => updateSetting('blur', parseInt(e.target.value))}
                                        className="pro-slider"
                                    />
                                </div>

                                <div className="slider-container">
                                    <div className="slider-header">
                                        <p className="label-text">Brightness</p>
                                        <span className="slider-value">{Math.round(settings.brightness * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={settings.brightness}
                                        onChange={(e) => updateSetting('brightness', parseFloat(e.target.value))}
                                        className="pro-slider"
                                    />
                                </div>

                                <div className="slider-container">
                                    <div className="slider-header">
                                        <p className="label-text">Contrast</p>
                                        <span className="slider-value">{Math.round(settings.contrast * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2"
                                        step="0.1"
                                        value={settings.contrast}
                                        onChange={(e) => updateSetting('contrast', parseFloat(e.target.value))}
                                        className="pro-slider"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="theme-footer">
                    <button className="theme-btn secondary" onClick={onClose}>
                        Discard
                    </button>
                    <button className="theme-btn primary" onClick={handleSave}>
                        <span>💾</span> Apply & Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeSettings;




