import { useState, useEffect } from 'react';
import './App.css';
import ActionButtons from './components/ActionButtons';
import DraggableWidget from './components/DraggableWidget';
import ThemeSettings from './components/ThemeSettings';
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
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

  // Load components and theme on mount
  useEffect(() => {
    console.log('App mounting, starting initApp...');
    const initApp = async () => {
      try {
        // Load Components
        const savedComponents = await loadComponents();
        console.log('Loaded components:', savedComponents);
        if (savedComponents && savedComponents.length > 0) {
          setComponents(savedComponents);
          const maxId = Math.max(...savedComponents.map(c => c.id), 0);
          setNextId(maxId + 1);
        }

        // Load Theme from config file
        if (ipcRenderer) {
          const dynamicConfig = await ipcRenderer.invoke('load-config-file');
          console.log('Loaded config:', dynamicConfig);
          if (dynamicConfig && dynamicConfig.mainComponent) {
            setMainTheme({
              ...mainTheme,
              ...dynamicConfig.mainComponent
            });
          }
        }
      } catch (error) {
        console.error('Error during initApp:', error);
      }
    };

    initApp();
  }, []);

  // Keep window interactive when in edit mode or theme is open
  useEffect(() => {
    const shouldBeInteractive = isEditMode || isThemeOpen;
    if (ipcRenderer) {
      ipcRenderer.send('set-ignore-mouse-events', !shouldBeInteractive, { forward: true });
    }
  }, [isEditMode, isThemeOpen]);

  // Handle Save
  const handleSave = () => {
    console.log('Saving components:', components);
    const success = saveComponents(components);
    if (success) {
      alert('✅ All components saved successfully!');
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
      position: {
        x: (config.defaultWidget?.defaultPosition?.x || 100) + (nextId * 20),
        y: (config.defaultWidget?.defaultPosition?.y || 100) + (nextId * 20),
      },
      size: {
        width: config.defaultWidget?.width || 200,
        height: config.defaultWidget?.height || 200,
      },
      backgroundColor: config.defaultWidget?.backgroundColor || '#ffffff',
    };

    setComponents([...components, newComponent]);
    setNextId(nextId + 1);
    setIsEditMode(true);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleTheme = () => {
    setIsThemeOpen(true);
  };

  const handleThemeSave = async (newTheme) => {
    console.log('Saving theme to config:', newTheme);
    setMainTheme(newTheme);

    // Auto-switch to Live Mode on theme save for best UX
    setIsEditMode(false);
    if (ipcRenderer) {
      ipcRenderer.send('set-ignore-mouse-events', true, { forward: true });
    }

    if (ipcRenderer) {
      try {
        const currentConfig = await ipcRenderer.invoke('load-config-file');
        if (currentConfig) {
          currentConfig.mainComponent = {
            ...currentConfig.mainComponent,
            ...newTheme
          };
          ipcRenderer.send('save-config-file', currentConfig);
        }
      } catch (e) {
        console.error('Error saving config:', e);
      }
    }
  };

  const handleComponentDrag = (id, newPosition) => {
    setComponents(components.map(comp =>
      comp.id === id ? { ...comp, position: newPosition } : comp
    ));
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

      {components.map(component => (
        <DraggableWidget
          key={component.id}
          id={component.id}
          position={component.position}
          size={component.size}
          backgroundColor={component.backgroundColor}
          onDrag={handleComponentDrag}
          isEditMode={isEditMode}
        />
      ))}

      {components.length === 0 && (
        <div className="content">
          <h1 className="welcome-text">Life Live Wallpaper</h1>
          <p className="subtitle">Hover over the top-right corner to see action buttons</p>
          <p className="subtitle">Click "Add" to create your first component</p>
        </div>
      )}

      {isEditMode && (
        <div className="edit-mode-indicator">
          <span>Edit Mode Active - Drag components to reposition</span>
        </div>
      )}

      <ThemeSettings
        isOpen={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
        onSave={handleThemeSave}
        currentSettings={mainTheme}
        targetType="main"
      />
    </div>
  );
}

export default App;
