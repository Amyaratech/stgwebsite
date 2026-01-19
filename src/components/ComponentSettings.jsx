import React, { useState, useEffect } from 'react';
import './ComponentSettings.css';
import { timezones, clockFormats, clockFonts, defaultWorldClockConfig } from '../data/timezones';
import WorldClockWidget from './WorldClockWidget';

const ComponentSettings = ({ isOpen, onClose, onSave, component, availableTypes }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('None');
    const [typeConfig, setTypeConfig] = useState({});

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
            // Also set a default name
            const tzData = timezones.find(t => t.value === defaultWorldClockConfig.timezone);
            if (tzData) {
                const parts = tzData.label.split(') ');
                const cityName = parts.length > 1 ? parts[1].split(',')[0].trim() : 'Kolkata';
                setName(`${cityName} Time`);
            }
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

    const getPreviewThemeStyle = (theme) => {
        if (!theme) return {};

        const hex = theme.backgroundColor || '#ffffff';
        let bgColor = hex;
        if (theme.transparent) {
            bgColor = 'transparent';
        } else if (theme.backgroundOpacity < 1) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            bgColor = `rgba(${r}, ${g}, ${b}, ${theme.backgroundOpacity})`;
        }

        return {
            backgroundColor: bgColor,
            borderRadius: `${theme.borderRadius}px`,
            border: !theme.transparent && theme.borderWidth > 0
                ? `${theme.borderWidth}px ${theme.borderStyle} ${theme.borderColor}`
                : 'none',
            backdropFilter: !theme.transparent && theme.blur > 0 ? `blur(${theme.blur}px)` : 'none',
            filter: !theme.transparent ? `brightness(${theme.brightness}) contrast(${theme.contrast})` : 'none',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '220px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        };
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
                                            onChange={(e) => {
                                                const newTz = e.target.value;
                                                updateTypeConfig('timezone', newTz);

                                                // Sync Header name with selected timezone
                                                const tzData = timezones.find(t => t.value === newTz);
                                                if (tzData) {
                                                    // Extract main city name from label: "(UTC+05:30) Kolkata" -> "Kolkata Time"
                                                    const parts = tzData.label.split(') ');
                                                    const cityName = parts.length > 1 ? parts[1].split(',')[0].trim() : newTz;
                                                    setName(`${cityName} Time`);
                                                }
                                            }}
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

                                    <div className="config-field">
                                        <label className="toggle-setting">
                                            <input
                                                type="checkbox"
                                                className="ios-toggle"
                                                checked={typeConfig.showFlag || false}
                                                onChange={(e) => updateTypeConfig('showFlag', e.target.checked)}
                                            />
                                            <span className="config-label" style={{ marginBottom: 0 }}>Show Country Flag Next to City</span>
                                        </label>
                                    </div>

                                    {typeConfig.showFlag && (
                                        <div className="config-field">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <label className="config-label" style={{ marginBottom: 0 }}>Flag Opacity</label>
                                                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#8b5cf6' }}>
                                                    {Math.round((typeConfig.flagOpacity || 0.15) * 100)}%
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                className="pro-range-slider"
                                                min="0.1"
                                                max="1.0"
                                                step="0.05"
                                                value={typeConfig.flagOpacity || 1.0}
                                                onChange={(e) => updateTypeConfig('flagOpacity', parseFloat(e.target.value))}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="config-column preview-column">
                                    <div className="config-preview-label">Live Preview</div>
                                    <div className="config-preview">
                                        <div style={getPreviewThemeStyle(component?.theme)}>
                                            <div style={{
                                                backgroundColor: component?.theme?.headerBackgroundColor || 'transparent',
                                                color: component?.theme?.headerTextColor || '#000000',
                                                padding: '8px 16px',
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                borderBottom: '1px solid rgba(0,0,0,0.05)'
                                            }}>
                                                {name || 'Widget Preview'}
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <WorldClockWidget
                                                    config={{
                                                        timezone: typeConfig.timezone || defaultWorldClockConfig.timezone,
                                                        format: typeConfig.format || defaultWorldClockConfig.format,
                                                        timeColor: typeConfig.timeColor || defaultWorldClockConfig.timeColor,
                                                        locationColor: typeConfig.locationColor || defaultWorldClockConfig.locationColor,
                                                        fontFamily: typeConfig.fontFamily || defaultWorldClockConfig.fontFamily,
                                                        showFlag: typeConfig.showFlag,
                                                        flagOpacity: typeConfig.flagOpacity
                                                    }}
                                                    size={{ width: 300, height: 160 }}
                                                />
                                            </div>
                                        </div>
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
                            <div className="config-grid">
                                <div className="config-column">
                                    <div className="config-field">
                                        <label className="config-label">Image Folder Path</label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <input
                                                type="text"
                                                className="config-select"
                                                value={typeConfig.folderPath || 'No folder selected'}
                                                readOnly
                                                placeholder="Click Browse to select folder"
                                                style={{ flex: 1, cursor: 'default' }}
                                            />
                                            <button
                                                className="browse-folder-btn"
                                                onClick={async () => {
                                                    if (window.require) {
                                                        const { ipcRenderer } = window.require('electron');
                                                        const result = await ipcRenderer.invoke('select-folder');
                                                        if (result) {
                                                            updateTypeConfig('folderPath', result);
                                                        }
                                                    }
                                                }}
                                                style={{
                                                    padding: '8px 16px',
                                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7e22ce 100%)',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                            >
                                                📁 Browse
                                            </button>
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                                            Select a folder containing your images (JPG, PNG, GIF, WEBP)
                                        </p>
                                    </div>

                                    <div className="config-field">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <label className="config-label" style={{ marginBottom: 0 }}>Slideshow Interval</label>
                                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#8b5cf6' }}>
                                                {typeConfig.slideshowInterval || 5}s
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            className="pro-range-slider"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={typeConfig.slideshowInterval || 5}
                                            onChange={(e) => updateTypeConfig('slideshowInterval', parseInt(e.target.value))}
                                        />
                                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                                            Time in seconds between each image transition
                                        </p>
                                    </div>
                                </div>

                                <div className="config-column preview-column">
                                    <div className="config-preview-label">Gallery Preview</div>
                                    <div className="config-preview">
                                        <div style={getPreviewThemeStyle(component?.theme)}>
                                            <div style={{
                                                backgroundColor: component?.theme?.headerBackgroundColor || 'transparent',
                                                color: component?.theme?.headerTextColor || '#000000',
                                                padding: '8px 16px',
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                borderBottom: '1px solid rgba(0,0,0,0.05)'
                                            }}>
                                                {name || 'Photo Gallery'}
                                            </div>
                                            <div style={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(126, 34, 206, 0.1) 100%)',
                                                padding: '20px'
                                            }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ fontSize: '48px', marginBottom: '8px' }}>🖼️</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)', fontWeight: '600' }}>
                                                        {typeConfig.folderPath ? 'Slideshow Ready' : 'Select Folder'}
                                                    </div>
                                                    {typeConfig.folderPath && (
                                                        <div style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.4)', marginTop: '4px' }}>
                                                            {typeConfig.slideshowInterval || 5}s intervals
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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



                <div className="component-settings-content">
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
                            {typeOptions.map((typeOption) => {
                                let icon = '❓';
                                if (typeOption === 'None') icon = '⚪';
                                if (typeOption === 'WorldClock') icon = '🌍';
                                if (typeOption === 'YearTaskTracker') icon = '📅';
                                if (typeOption === 'StickyNotes') icon = '📝';
                                if (typeOption === 'PhotoGallery') icon = '🖼️';

                                return (
                                    <label
                                        key={typeOption}
                                        className={`type-chip ${type === typeOption ? 'selected' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name="componentType"
                                            value={typeOption}
                                            checked={type === typeOption}
                                            onChange={() => handleTypeChange(typeOption)}
                                        />
                                        <div className="chip-content">
                                            <span className="chip-icon">{icon}</span>
                                            <span className="chip-label">{typeOption}</span>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {type !== 'None' && (
                        <div className="settings-section configuration-section modern-card">
                            <h3 className="section-title">⚙️ Configuration</h3>
                            {renderTypeConfiguration()}
                        </div>
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
