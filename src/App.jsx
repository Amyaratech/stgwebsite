import { useState, useEffect } from 'react';
import './App.css';
import ActionButtons from './components/ActionButtons';
import DraggableWidget from './components/DraggableWidget';
import config from './config/config.json';
import { saveComponents, loadComponents } from './utils/storage';

const { ipcRenderer } = window.require('electron');

function App() {
  const [components, setComponents] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [nextId, setNextId] = useState(1);

  // Load components on mount
  useEffect(() => {
    const savedComponents = loadComponents();
    if (savedComponents && savedComponents.length > 0) {
      setComponents(savedComponents);
      const maxId = Math.max(...savedComponents.map(c => c.id), 0);
      setNextId(maxId + 1);
    }
  }, []);

  // Keep window interactive when in edit mode
  useEffect(() => {
    if (isEditMode) {
      ipcRenderer.send('set-ignore-mouse-events', false);
    }
  }, [isEditMode]);

  // Handle Save
  const handleSave = () => {
    console.log('Saving components:', components);
    const success = saveComponents(components);
    if (success) {
      // Visual feedback
      alert('✅ All components saved successfully!');
      // Auto-switch back to Live Mode
      setIsEditMode(false);
    } else {
      alert('❌ Error saving components');
    }
  };

  // Handle Add New Component
  const handleAdd = () => {
    console.log('Add button clicked!');
    console.log('Current components:', components);
    console.log('Next ID:', nextId);

    const newComponent = {
      id: nextId,
      name: `Component ${nextId}`,
      position: {
        x: config.defaultWidget.defaultPosition.x + (nextId * 20),
        y: config.defaultWidget.defaultPosition.y + (nextId * 20),
      },
      size: {
        width: config.defaultWidget.width,
        height: config.defaultWidget.height,
      },
      backgroundColor: config.defaultWidget.backgroundColor,
    };

    console.log('New component:', newComponent);
    setComponents([...components, newComponent]);
    setNextId(nextId + 1);

    // Auto-enable edit mode when adding
    if (!isEditMode) {
      setIsEditMode(true);
    }

    console.log('Components after add:', [...components, newComponent]);
  };

  // Handle Edit Mode Toggle
  const handleEdit = () => {
    console.log('Edit button clicked, entering edit mode');
    setIsEditMode(true);
  };

  // Handle Component Drag
  const handleComponentDrag = (id, newPosition) => {
    setComponents(components.map(comp =>
      comp.id === id
        ? { ...comp, position: newPosition }
        : comp
    ));
  };

  return (
    <div className="wallpaper-container">
      {/* Action Buttons */}
      <ActionButtons
        onSave={handleSave}
        onAdd={handleAdd}
        onEdit={handleEdit}
        isEditMode={isEditMode}
      />

      {/* Draggable Components */}
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

      {/* Welcome Content (shown when no components) */}
      {components.length === 0 && (
        <div className="content">
          <h1 className="welcome-text">Life Live Wallpaper</h1>
          <p className="subtitle">Hover over the top-right corner to see action buttons</p>
          <p className="subtitle">Click "Add" to create your first component</p>
        </div>
      )}

      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="edit-mode-indicator">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          <span>Edit Mode Active - Drag components to reposition</span>
        </div>
      )}
    </div>
  );
}

export default App;
