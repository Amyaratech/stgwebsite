import React, { useState, useEffect } from 'react';
import './ComponentSettings.css';
import { timezones, clockFormats, clockFonts, defaultWorldClockConfig } from '../data/timezones';
import WorldClockWidget from './WorldClockWidget';

const ComponentSettings = ({ isOpen, onClose, onSave, component, availableTypes }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('None');
    const [typeConfig, setTypeConfig] = useState({});
    const [activeTab, setActiveTab] = useState('identity'); // Changed from 'presets' to 'identity'

    useEffect(() => {
        if (isOpen && component) {
            setName(component.name || '');
            setType(component.type || 'None');
            setTypeConfig(component.typeConfig || {});
        }
    }, [isOpen, component]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({
            name,
            type: type === 'None' ? '' : type,
            typeConfig
        });
    };

    const handleTypeChange = (newType) => {
        setType(newType);
        if (newType === 'WorldClock') {
            setTypeConfig(defaultWorldClockConfig);
        } else {
            setTypeConfig({});
        }
    };

    const updateTypeConfig = (key, value) => {
        setTypeConfig(prev => ({
            ...prev,
            [key]: value
        }));
    };


    // Render configuration area based on selected type
    const renderTypeConfiguration = () => {
        switch (type) {
            case 'WorldClock':
                return (
                    <div className="type-config-area">
                        <h4 className="config-title">🌍 World Clock Configuration</h4>
                        <p className="config-description">Configure your world clock settings below</p>
                        <div className="config-content">
                            <div className="config-grid">
                                <div className="config-column">
                                    <div className="config-field">
                                        <label className="config-label">Timezone</label>
                                        <select
                                            className="config-select"
                                            value={typeConfig.timezone || defaultWorldClockConfig.timezone}
                                            onChange={(e) => updateTypeConfig('timezone', e.target.value)}
                                        >
                                            {timezones.map(tz => (
                                                <option key={tz.value} value={tz.value}>
                                                    {tz.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="config-field">
                                        <label className="config-label">Display Format</label>
                                        <select
                                            className="config-select"
                                            value={typeConfig.format || defaultWorldClockConfig.format}
                                            onChange={(e) => updateTypeConfig('format', e.target.value)}
                                        >
                                            {clockFormats.map(fmt => (
                                                <option key={fmt.value} value={fmt.value}>
                                                    {fmt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="config-field">
                                        <label className="config-label">Font Family</label>
                                        <select
                                            className="config-select"
                                            value={typeConfig.fontFamily || defaultWorldClockConfig.fontFamily}
                                            onChange={(e) => updateTypeConfig('fontFamily', e.target.value)}
                                        >
                                            {clockFonts.map(font => (
                                                <option key={font.value} value={font.value}>
                                                    {font.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="config-field">
                                        <label className="config-label">Time Color</label>
                                        <div className="color-picker-group">
                                            <input
                                                type="color"
                                                className="color-picker"
                                                value={typeConfig.timeColor || defaultWorldClockConfig.timeColor}
                                                onChange={(e) => updateTypeConfig('timeColor', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="color-hex-input"
                                                value={typeConfig.timeColor || defaultWorldClockConfig.timeColor}
                                                onChange={(e) => updateTypeConfig('timeColor', e.target.value)}
                                                placeholder="#000000"
                                            />
                                        </div>
                                    </div>

                                    <div className="config-field">
                                        <label className="config-label">Location Color</label>
                                        <div className="color-picker-group">
                                            <input
                                                type="color"
                                                className="color-picker"
                                                value={typeConfig.locationColor || defaultWorldClockConfig.locationColor}
                                                onChange={(e) => updateTypeConfig('locationColor', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="color-hex-input"
                                                value={typeConfig.locationColor || defaultWorldClockConfig.locationColor}
                                                onChange={(e) => updateTypeConfig('locationColor', e.target.value)}
                                                placeholder="#666666"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="config-column preview-column">
                                    <div className="config-preview-label">Live Preview</div>
                                    <div className="config-preview">
                                        <WorldClockWidget
                                            config={{
                                                timezone: typeConfig.timezone || defaultWorldClockConfig.timezone,
                                                format: typeConfig.format || defaultWorldClockConfig.format,
                                                timeColor: typeConfig.timeColor || defaultWorldClockConfig.timeColor,
                                                locationColor: typeConfig.locationColor || defaultWorldClockConfig.locationColor,
                                                fontFamily: typeConfig.fontFamily || defaultWorldClockConfig.fontFamily
                                            }}
                                            size={{ width: 300, height: 200 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'YearTaskTracker':
                return (
                    <div className="type-config-area">
                        <h4 className="config-title">📅 Year Task Tracker Configuration</h4>
                        <p className="config-description">Configure your task tracker settings below</p>
                        <div className="config-content">
                            <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '40px 20px' }}>
                                Task tracker configuration options coming soon...
                            </p>
                        </div>
                    </div>
                );

            case 'StickyNotes':
                return (
                    <div className="type-config-area">
                        <h4 className="config-title">📝 Sticky Notes Configuration</h4>
                        <p className="config-description">Configure your sticky notes settings below</p>
                        <div className="config-content">
                            <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '40px 20px' }}>
                                Sticky notes configuration options coming soon...
                            </p>
                        </div>
                    </div>
                );

            case 'PhotoGallery':
                return (
                    <div className="type-config-area">
                        <h4 className="config-title">🖼️ Photo Gallery Configuration</h4>
                        <p className="config-description">Configure your photo gallery settings below</p>
                        <div className="config-content">
                            <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '40px 20px' }}>
                                Photo gallery configuration options coming soon...
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const typeOptions = ['None', ...(availableTypes || [])];

    return (
        <div className="component-settings-overlay" onClick={onClose}>
            <div className="component-settings-popup" onClick={(e) => e.stopPropagation()}>
                <div className="component-settings-header">
                    <div className="header-title-area">
                        <span className="header-icon">⚙️</span>
                        <div>
                            <h2>Component Settings</h2>
                            <p className="settings-subtitle">Configure identity and behavior</p>
                        </div>
                    </div>
                    <button className="settings-close" onClick={onClose}>×</button>
                </div>

                <div className="settings-tabs">
                    <button
                        className={`tab-button ${activeTab === 'presets' ? 'active' : ''}`}
                        onClick={() => setActiveTab('presets')}
                    >
                        🎨 Theme Presets
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'identity' ? 'active' : ''}`}
                        onClick={() => setActiveTab('identity')}
                    >
                        📝 Identity & Type
                    </button>
                </div>

                <div className="component-settings-content">
                    {activeTab === 'presets' && (
                        <div className="theme-presets-section">
                            <div className="presets-header">
                                <h3 className="section-title">🎨 Choose a Theme Preset</h3>
                                <p className="section-description">
                                    Select from our curated collection of professional themes.
                                    Each preset applies beautiful 3D card styling, colors, effects, and typography to your widget.
                                </p>
                            </div>

                            <div className="theme-presets-grid">
                                {themePresets.map((preset) => (
                                    <div
                                        key={preset.id}
                                        className="theme-preset-card"
                                        onClick={() => handleApplyThemePreset(preset)}
                                    >
                                        <div className="preset-emoji">{preset.emoji}</div>
                                        <div className="preset-info">
                                            <h4 className="preset-name">{preset.name}</h4>
                                            <p className="preset-description">{preset.description}</p>
                                        </div>
                                        <div className="preset-preview-colors">
                                            <div
                                                className="preview-color"
                                                style={{ backgroundColor: preset.container.backgroundColor }}
                                                title="Background"
                                            />
                                            <div
                                                className="preview-color"
                                                style={{ backgroundColor: preset.clock.timeColor }}
                                                title="Time Color"
                                            />
                                            <div
                                                className="preview-color"
                                                style={{ backgroundColor: preset.clock.locationColor }}
                                                title="Location Color"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'identity' && (
                        <>
                            <div className="settings-section">
                                <h3 className="section-title">📝 Identity</h3>
                                <div className="setting-group">
                                    <label className="setting-label">Widget Name (Header)</label>
                                    <input
                                        type="text"
                                        className="setting-input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter widget name..."
                                    />
                                </div>
                            </div>

                            <div className="settings-section">
                                <h3 className="section-title">🎯 Component Type</h3>
                                <div className="type-selector">
                                    {typeOptions.map((typeOption) => (
                                        <label
                                            key={typeOption}
                                            className={`type-radio-option ${type === typeOption ? 'selected' : ''}`}
                                        >
                                            <input
                                                type="radio"
                                                name="componentType"
                                                value={typeOption}
                                                checked={type === typeOption}
                                                onChange={() => handleTypeChange(typeOption)}
                                            />
                                            <span className="radio-label">{typeOption}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {type !== 'None' && (
                                <div className="settings-section configuration-section">
                                    <h3 className="section-title">⚙️ Configuration</h3>
                                    {renderTypeConfiguration()}
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="component-settings-footer">
                    <button className="settings-btn cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="settings-btn save-btn" onClick={handleSave}>
                        💾 Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComponentSettings;
