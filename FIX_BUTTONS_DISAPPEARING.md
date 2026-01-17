# Fix: Action Buttons Disappearing on Click

## Problem
When clicking the **Add** button, the action buttons would disappear immediately because:
1. Mouse movement during click triggered `onMouseLeave`
2. Buttons were hidden when mouse left the area
3. This made it difficult to interact with multiple buttons

## Solution
Implemented **persistent visibility in Edit Mode**:

### Changes Made:

#### 1. ActionButtons.jsx
```javascript
// Keep buttons visible when in edit mode
const handleMouseLeave = () => {
    if (!isEditMode) {
        setIsHovered(false);
        ipcRenderer.send('set-ignore-mouse-events', true, { forward: true });
    }
};

// Show buttons if hovered OR in edit mode
<div className={`action-buttons ${isHovered || isEditMode ? 'visible' : ''}`}>
```

#### 2. App.jsx
```javascript
// Keep window interactive when in edit mode
useEffect(() => {
    if (isEditMode) {
        ipcRenderer.send('set-ignore-mouse-events', false);
    }
}, [isEditMode]);
```

## Behavior Now:

### **View Mode** (Edit button OFF):
- ✅ Buttons appear on hover (top-right corner)
- ✅ Buttons hide when mouse leaves
- ✅ Window is click-through (desktop accessible)

### **Edit Mode** (Edit button ON):
- ✅ Buttons **stay visible** permanently
- ✅ Buttons remain interactive
- ✅ Window stays interactive for dragging
- ✅ Can click Add multiple times easily

## User Experience:

1. **Hover top-right** → Buttons appear
2. **Click Add** → Component added, Edit mode ON
3. **Buttons stay visible** → Can click Add again!
4. **Click Edit** to toggle off → Buttons hide on mouse leave

This makes it much easier to:
- Add multiple components quickly
- Switch between buttons without losing them
- Work in edit mode comfortably

## Testing:
- [x] Buttons appear on hover
- [x] Buttons stay visible in edit mode
- [x] Can click Add multiple times
- [x] Buttons hide when leaving edit mode
- [x] Window interactivity works correctly
