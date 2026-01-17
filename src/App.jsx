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
              backgroundColor: dynamicConfig.mainComponent.backgroundColor,
              backgroundOpacity: dynamicConfig.mainComponent.backgroundOpacity,
              transparent: dynamicConfig.mainComponent.transparent,
            });
          }
        }
      } catch (error) {
        console.error('Error during initApp:', error);
      }
    };

    initApp();
  }, []);

  // Keep window interactive when in edit mode
  useEffect(() => {
    if (isEditMode && ipcRenderer) {
      ipcRenderer.send('set-ignore-mouse-events', false);
    }
  }, [isEditMode]);

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
    setMainTheme(newTheme);
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
    if (mainTheme.transparent) return 'transparent';
    return mainTheme.backgroundColor || '#000000';
  };

  return (
    <div
      className="wallpaper-container"
      style={{
        backgroundColor: getBackgroundColor(),
      }}
    >
      <ActionButtons
        onSave={handleSave}
        onAdd={handleAdd}
        onTheme={handleTheme}
        onEdit={handleEdit}
        isEditMode={isEditMode}
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
