// Storage utility for saving and loading components using Electron's file system

// Safe IPC access
const getIpc = () => {
    try {
        if (window.require) {
            return window.require('electron').ipcRenderer;
        }
    } catch (e) {
        console.warn('IPC not available in storage.js');
    }
    return null;
};

const ipcRenderer = getIpc();

// Save to file system via Electron IPC
export const saveComponents = (components) => {
    try {
        if (!ipcRenderer) {
            console.warn('Cannot save: IPC not available');
            // Fallback to localStorage for web testing
            localStorage.setItem('life-wallpaper-components', JSON.stringify(components));
            return true;
        }
        ipcRenderer.send('save-components-file', components);
        console.log('Components save request sent to Electron:', components);
        return true;
    } catch (error) {
        console.error('Error saving components:', error);
        return false;
    }
};

// Load from file system primarily (via Electron)
export const loadComponents = async () => {
    try {
        if (!ipcRenderer) {
            console.warn('Loading components from localStorage fallback');
            const local = localStorage.getItem('life-wallpaper-components');
            return local ? JSON.parse(local) : [];
        }
        const fileComponents = await ipcRenderer.invoke('load-components-file');
        if (fileComponents) {
            console.log('Components loaded from file system:', fileComponents);
            return fileComponents;
        }
        return [];
    } catch (error) {
        console.error('Error loading components:', error);
        return [];
    }
};

// These are no longer used for local storage but kept for API compatibility if needed
export const clearComponents = () => {
    return saveComponents([]);
};

export const exportComponents = async () => {
    try {
        const components = await loadComponents();
        const dataStr = JSON.stringify(components, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'wallpaper-components.json';
        link.click();
        URL.revokeObjectURL(url);
        return true;
    } catch (error) {
        console.error('Error exporting components:', error);
        return false;
    }
};
