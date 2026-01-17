// Storage utility for saving and loading components
const STORAGE_KEY = 'life-wallpaper-components';

export const saveComponents = (components) => {
    try {
        const data = JSON.stringify(components, null, 2);
        localStorage.setItem(STORAGE_KEY, data);
        console.log('Components saved successfully:', components);
        return true;
    } catch (error) {
        console.error('Error saving components:', error);
        return false;
    }
};

export const loadComponents = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const components = JSON.parse(data);
            console.log('Components loaded successfully:', components);
            return components;
        }
        return [];
    } catch (error) {
        console.error('Error loading components:', error);
        return [];
    }
};

export const clearComponents = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('Components cleared successfully');
        return true;
    } catch (error) {
        console.error('Error clearing components:', error);
        return false;
    }
};

export const exportComponents = () => {
    try {
        const components = loadComponents();
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
