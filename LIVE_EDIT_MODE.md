# New Workflow: Live Mode & Edit Mode

## 🎯 Two Modes System

### **Live Mode (Default)**
This is the normal wallpaper state.

**Buttons Visible:**
- ➕ **Add** - Add new component
- ✏️ **Edit** - Enter edit mode
- ❌ **Close** - Close app

**Behavior:**
- Buttons appear on hover (top-right corner)
- Buttons hide when mouse leaves
- Components visible but **NOT draggable**
- Wallpaper is click-through (desktop accessible)
- Saved components load automatically

---

### **Edit Mode**
Activated by clicking the Edit button.

**Buttons Visible:**
- 💾 **Save** - Save positions and exit edit mode
- ➕ **Add** - Add new component
- ❌ **Close** - Close app
- ✏️ **Edit button HIDDEN**

**Behavior:**
- Buttons **stay visible permanently**
- Components are **draggable**
- Can reposition components
- Window stays interactive
- Purple dashed borders on components
- Edit mode indicator at bottom

---

## 🔄 Workflow Steps

### **1. Starting the App**
```
App Starts
    ↓
Load saved components from localStorage
    ↓
Enter LIVE MODE
    ↓
Components visible at saved positions
    ↓
Buttons hidden (appear on hover)
```

### **2. Adding First Component**
```
Hover top-right corner
    ↓
Click Add button
    ↓
New component appears
    ↓
Auto-enter EDIT MODE
    ↓
Drag to position
    ↓
Click Save
    ↓
Return to LIVE MODE
```

### **3. Editing Existing Layout**
```
LIVE MODE
    ↓
Hover top-right corner
    ↓
Click Edit button
    ↓
Enter EDIT MODE
    ↓
Drag components to new positions
    ↓
Click Save
    ↓
Positions saved to localStorage
    ↓
Return to LIVE MODE
```

### **4. Adding More Components**
```
EDIT MODE (or enter via Edit button)
    ↓
Click Add button
    ↓
New component appears
    ↓
Drag to position
    ↓
Click Add again (add more)
    ↓
Click Save when done
    ↓
Return to LIVE MODE
```

---

## 💾 Data Persistence

### **What Gets Saved:**
```json
[
  {
    "id": 1,
    "name": "Component 1",
    "position": { "x": 100, "y": 100 },
    "size": { "width": 200, "height": 200 },
    "backgroundColor": "#ffffff"
  },
  {
    "id": 2,
    "name": "Component 2",
    "position": { "x": 320, "y": 120 },
    "size": { "width": 200, "height": 200 },
    "backgroundColor": "#ffffff"
  }
]
```

### **When Saved:**
- Click Save button in Edit Mode
- Stored in `localStorage`
- Key: `life-wallpaper-components`

### **When Loaded:**
- App startup
- Automatic
- Components appear at saved positions

---

## 🎨 Visual Indicators

### **Live Mode:**
- No edit mode indicator
- Components have normal appearance
- Buttons fade in/out on hover

### **Edit Mode:**
- Purple badge at bottom: "Edit Mode Active"
- Components have dashed purple borders
- Drag icon in component corner
- Buttons always visible
- Move cursor on component hover

---

## 🔘 Button Behavior Summary

| Button | Live Mode | Edit Mode | Action |
|--------|-----------|-----------|--------|
| 💾 Save | Hidden | Visible | Save & return to Live Mode |
| ➕ Add | Visible | Visible | Add component & enter Edit Mode |
| ✏️ Edit | Visible | Hidden | Enter Edit Mode |
| ❌ Close | Visible | Visible | Close app |

---

## ✅ User Experience Flow

**Clean Wallpaper Experience:**
1. App starts in Live Mode
2. Wallpaper looks clean (no visible buttons)
3. Desktop fully accessible
4. Components visible at saved positions

**Quick Editing:**
1. Hover top-right → buttons appear
2. Click Edit → enter edit mode
3. Drag components
4. Click Save → back to clean wallpaper

**Adding Components:**
1. Click Add (from any mode)
2. Auto-enter edit mode
3. Position new component
4. Click Save → done!

---

## 🎯 Key Features

✅ **Auto-save on Save button** - All positions stored
✅ **Auto-load on startup** - Components appear where you left them
✅ **Auto-enter edit mode** - When adding first component
✅ **Auto-exit edit mode** - After saving
✅ **Clean wallpaper** - Buttons hidden by default
✅ **Easy editing** - One click to edit mode
✅ **Persistent data** - Survives app restarts

---

## 🧪 Testing Checklist

- [ ] App starts in Live Mode
- [ ] Buttons appear on hover
- [ ] Click Edit → enters Edit Mode
- [ ] Save button appears in Edit Mode
- [ ] Edit button hidden in Edit Mode
- [ ] Components draggable in Edit Mode
- [ ] Click Save → returns to Live Mode
- [ ] Positions saved to localStorage
- [ ] Restart app → components load correctly
- [ ] Desktop still accessible in Live Mode
