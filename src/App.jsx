import React, { useState, useEffect } from 'react';
import './App.css';
import ActionButtons from './components/ActionButtons';
import DraggableWidget from './components/DraggableWidget';
import ThemeSettings from './components/ThemeSettings';
import ComponentSettings from './components/ComponentSettings';
import config from './config/config.json';
import { saveComponents, loadComponents } from './utils/storage';

// Safe IPC access
const getIpc = () => {
  try {
    if (window.require) {
      return window.require('electron').ipcRenderer;
    }
  } catch (e) {
    console.warn('IPC not available');
  }
  return null;
};

const ipcRenderer = getIpc();

function App() {
  const [components, setComponents] = useState([]);
  const componentsRef = React.useRef([]); // Ref to always have latest state for saving

  // Sync ref whenever state changes
  useEffect(() => {
    componentsRef.current = components;
  }, [components]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isComponentSettingsOpen, setIsComponentSettingsOpen] = useState(false);
  const [themingComponentId, setThemingComponentId] = useState(null);
  const [editingComponentId, setEditingComponentId] = useState(null);
  const [mainTheme, setMainTheme] = useState({
    backgroundColor: config.mainComponent.backgroundColor || '#000000',
    backgroundOpacity: config.mainComponent.backgroundOpacity ?? 1,
    transparent: config.mainComponent.transparent ?? false,
    borderRadius: config.mainComponent.borderRadius ?? 0,
    borderWidth: config.mainComponent.borderWidth ?? 0,
    borderColor: config.mainComponent.borderColor || '#ffffff',
    borderStyle: config.mainComponent.borderStyle || 'solid',
    blur: config.mainComponent.blur ?? 0,
    brightness: config.mainComponent.brightness ?? 1,
    contrast: config.mainComponent.contrast ?? 1,
  });

  // EFFECT: Global Mouse Event Manager
  // Ensures window is click-through when NOT editing or theming.
  // This is critical for desktop icons and right-click menu to work.
  useEffect(() => {
    if (ipcRenderer) {
      const isWindowInteractive = isEditMode || isThemeOpen || isComponentSettingsOpen;
      console.log(`[App] Updating window interactivity: ${isWindowInteractive ? 'INTERACTIVE' : 'CLICK-THROUGH'}`);
      ipcRenderer.send('set-ignore-mouse-events', !isWindowInteractive, { forward: true });
    }
  }, [isEditMode, isThemeOpen, isComponentSettingsOpen]);

  // Load components and theme on mount
  useEffect(() => {
    console.log('App mounting, starting initApp...');
    const initApp = async () => {
      try {
        // Load Components
        const savedComponents = await loadComponents();
        console.log('Loaded components:', savedComponents);
        if (savedComponents && savedComponents.length > 0) {
          console.log('[Init] Raw saved components:', savedComponents);
          // Ensure each component has default theme properties and minimum size if missing
          const normalizedComponents = savedComponents.map(c => {
            const normalized = {
              ...c,
              isVisible: c.isVisible ?? true,
              size: {
                width: Math.max(300, c.size?.width || 300),
                height: Math.max(300, c.size?.height || 300)
              },
              theme: c.theme || {
                backgroundColor: c.backgroundColor || '#ffffff',
                backgroundOpacity: 1,
                transparent: false,
                borderRadius: 8,
                borderWidth: 0,
                borderColor: '#ffffff',
                borderStyle: 'solid',
                blur: 0,
                brightness: 1,
                contrast: 1,
                headerBackgroundColor: 'transparent',
                headerTextColor: '#000000',
              }
            };
            console.log(`[Init] Component ${c.id} normalized size:`, normalized.size);
            return normalized;
          });
          setComponents(normalizedComponents);
          const maxId = Math.max(...normalizedComponents.map(c => c.id), 0);
          setNextId(maxId + 1);
        }

        // Load Theme from config file
        if (ipcRenderer) {
          const dynamicConfig = await ipcRenderer.invoke('load-config-file');
          if (dynamicConfig && dynamicConfig.mainComponent) {
            setMainTheme(prev => ({ ...prev, ...dynamicConfig.mainComponent }));
          }
        }
      } catch (error) {
        console.error('Error during initApp:', error);
      }
    };

    initApp();
  }, []);

  // Handle Save
  const handleSave = () => {
    console.log('[App] handleSave triggered. Current components in Ref:', componentsRef.current);
    const success = saveComponents(componentsRef.current);
    if (success) {
      alert('✅ All components and settings saved successfully!');
      setIsEditMode(false);
    } else {
      alert('❌ Error saving components');
    }
  };

  // Handle Add New Component
  const handleAdd = () => {
    const newComponent = {
      id: nextId,
      name: `Component ${nextId}`,
      isVisible: true,
      position: {
        x: (config.defaultWidget?.defaultPosition?.x || 100) + (nextId * 20),
        y: (config.defaultWidget?.defaultPosition?.y || 100) + (nextId * 20),
      },
      size: {
        width: 300,
        height: 300,
      },
      theme: {
        backgroundColor: '#ffffff',
        backgroundOpacity: 1,
        transparent: false,
        borderRadius: 8,
        borderWidth: 0,
        borderColor: '#ffffff',
        borderStyle: 'solid',
        blur: 0,
        brightness: 1,
        contrast: 1,
        headerBackgroundColor: 'transparent',
        headerTextColor: '#000000',
      }
    };

    setComponents(prev => [...prev, newComponent]);
    setNextId(nextId + 1);
    setIsEditMode(true);
  };

  const handleEdit = () => setIsEditMode(true);

  const handleTheme = () => {
    setThemingComponentId(null); // Null means main window
    setIsThemeOpen(true);
  };

  const handleThemeSave = async (newTheme) => {
    if (themingComponentId === null) {
      // Main Wallpaper Theme
      setMainTheme(newTheme);
      setIsEditMode(false);
      if (ipcRenderer) {
        // No need to manually send here, the useEffect above handles it
        try {
          const currentConfig = await ipcRenderer.invoke('load-config-file');
          if (currentConfig) {
            currentConfig.mainComponent = { ...currentConfig.mainComponent, ...newTheme };
            ipcRenderer.send('save-config-file', currentConfig);
          }
        } catch (e) {
          console.error('Error saving config:', e);
        }
      }
    } else {
      // Individual Component Theme
      setComponents(prev => prev.map(comp =>
        comp.id === themingComponentId ? { ...comp, theme: newTheme } : comp
      ));
    }
  };

  const handleComponentSettingsSave = (newSettings) => {
    setComponents(prev => prev.map(comp =>
      comp.id === editingComponentId ? { ...comp, ...newSettings } : comp
    ));
    setIsComponentSettingsOpen(false);
  };

  const handleComponentAction = (id, action, data) => {
    switch (action) {
      case 'close':
        setComponents(prev => prev.map(comp => comp.id === id ? { ...comp, isVisible: false } : comp));
        break;
      case 'delete':
        setComponents(prev => prev.filter(comp => comp.id !== id));
        break;
      case 'theme':
        setThemingComponentId(id);
        setIsThemeOpen(true);
        break;
      case 'edit':
        setEditingComponentId(id);
        setIsComponentSettingsOpen(true);
        break;
      case 'resize':
        console.log(`Updating component ${id} size to:`, data);
        setComponents(prev => prev.map(comp => comp.id === id ? { ...comp, size: data } : comp));
        break;
      case 'drag':
        setComponents(prev => prev.map(comp => comp.id === id ? { ...comp, position: data } : comp));
        break;
      default:
        break;
    }
  };

  const getBackgroundColor = () => {
    if (mainTheme.transparent) return 'rgba(0,0,0,0)';
    const hex = mainTheme.backgroundColor || '#000000';
    if (mainTheme.backgroundOpacity < 1) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${mainTheme.backgroundOpacity})`;
    }
    return hex;
  };

  const containerStyle = {
    backgroundColor: getBackgroundColor(),
    borderRadius: `${mainTheme.borderRadius}px`,
    border: !mainTheme.transparent && mainTheme.borderWidth > 0 ? `${mainTheme.borderWidth}px ${mainTheme.borderStyle} ${mainTheme.borderColor}` : 'none',
    backdropFilter: !mainTheme.transparent && mainTheme.blur > 0 ? `blur(${mainTheme.blur}px)` : 'none',
    filter: !mainTheme.transparent ? `brightness(${mainTheme.brightness}) contrast(${mainTheme.contrast})` : 'none',
  };

  useEffect(() => {
    console.log('Final Container Style:', containerStyle);
  }, [mainTheme]);

  return (
    <div
      className="wallpaper-container"
      style={containerStyle}
    >
      <ActionButtons
        onSave={handleSave}
        onAdd={handleAdd}
        onTheme={handleTheme}
        onEdit={handleEdit}
        isEditMode={isEditMode}
        isThemeOpen={isThemeOpen}
      />

      {components.filter(c => c.isVisible !== false).map(component => (
        <DraggableWidget
          key={component.id}
          id={component.id}
          name={component.name}
          type={component.type}
          position={component.position}
          size={component.size}
          theme={component.theme}
          typeConfig={component.typeConfig}
          onAction={handleComponentAction}
          isEditMode={isEditMode}
        />
      ))}

      {isEditMode && (
        <div className="edit-mode-indicator">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <span>Edit Mode: Components are Draggable & Resizable</span>
        </div>
      )}

      <ThemeSettings
        isOpen={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
        onSave={handleThemeSave}
        targetType={themingComponentId === null ? 'main' : 'component'}
        currentSettings={themingComponentId === null ? mainTheme : components.find(c => c.id === themingComponentId)?.theme}
      />

      <ComponentSettings
        isOpen={isComponentSettingsOpen}
        onClose={() => setIsComponentSettingsOpen(false)}
        onSave={handleComponentSettingsSave}
        component={components.find(c => c.id === editingComponentId)}
        availableTypes={config.componentMetadata?.availableTypes || []}
      />
    </div>
  );
}

export default App;
