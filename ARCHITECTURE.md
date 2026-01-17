# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Windows Desktop Layer                     │
│  ┌──────┐  ┌──────┐  ┌──────┐                              │
│  │ Icon │  │ Icon │  │ Icon │  ← Desktop Icons (On Top)    │
│  └──────┘  └──────┘  └──────┘                              │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Right-Click Menu (Works Normally)          │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Life Live Wallpaper Window                      │
│  ┌──────────────────────────────────────────────────┐ [X]  │
│  │                                                   │      │
│  │          Dark Black Background Layer              │      │
│  │                                                   │      │
│  │              (Transparent Window)                 │      │
│  │                                                   │      │
│  │         Future Widgets Will Go Here               │      │
│  │                                                   │      │
│  └──────────────────────────────────────────────────┘      │
│                                                              │
│  Close Button (Top Right Corner) ──────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Component Structure

```
App.jsx (Main Component)
├── wallpaper-container (Full Screen)
│   ├── close-button (Top Right)
│   │   └── X Icon (SVG)
│   └── content (Center)
│       ├── welcome-text
│       └── subtitle
```

## Electron Process Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Main Process (Node.js)                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │  electron/main.js                                  │    │
│  │  - Creates BrowserWindow                           │    │
│  │  - Detects screen dimensions                       │    │
│  │  - Configures transparent, frameless window        │    │
│  │  - Handles IPC communication                       │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕ IPC
┌─────────────────────────────────────────────────────────────┐
│                 Renderer Process (Browser)                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │  React App (Vite Dev Server)                       │    │
│  │  - Renders UI                                      │    │
│  │  - Handles user interactions                       │    │
│  │  - Sends close signal via IPC                      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

```
LifeLiveWallpapper/
│
├── electron/                    # Electron main process
│   ├── main.js                 # Window creation & management
│   └── preload.js              # Security bridge (future)
│
├── src/                        # React application
│   ├── App.jsx                 # Main component
│   ├── App.css                 # Styling
│   ├── index.css               # Global styles
│   ├── main.jsx                # React entry point
│   └── assets/                 # Images, fonts, etc.
│
├── public/                     # Static assets
│
├── dist/                       # Production build (generated)
│
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration
├── README.md                   # Documentation
└── PROJECT_PLAN.md             # Project roadmap
```

## Data Flow

```
User Clicks Close Button
        ↓
    App.jsx (handleClose)
        ↓
    ipcRenderer.send('close-app')
        ↓
    IPC Channel
        ↓
    electron/main.js (ipcMain.on('close-app'))
        ↓
    app.quit()
        ↓
    Application Closes
```

## Window Configuration

```javascript
{
  width: screen.width,          // Auto-detect
  height: screen.height,        // Auto-detect
  frame: false,                 // No title bar
  transparent: true,            // See-through
  skipTaskbar: true,            // Not in taskbar
  alwaysOnTop: false,           // Behind other windows
  resizable: false,             // Fixed size
  movable: false,               // Can't move
}
```

## CSS Architecture

```
Global Styles (index.css)
    ↓
App Styles (App.css)
    ├── wallpaper-container (Full screen, black background)
    ├── close-button (Glassmorphic, top-right)
    └── content (Centered text, low opacity)
```

## Future Widget System (Phase 2)

```
┌─────────────────────────────────────────────────────────────┐
│                    Wallpaper Container                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Todo List   │  │    Goals     │  │    Photos    │     │
│  │   Widget     │  │   Widget     │  │   Widget     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │    Clock     │  │    Habits    │                        │
│  │   Widget     │  │   Widget     │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Each widget will be:
- Draggable
- Resizable
- Customizable
- Data-persistent
```

## Technology Stack

- **Electron**: Desktop application framework
- **React**: UI component library
- **Vite**: Fast build tool and dev server
- **Node.js**: Backend runtime
- **CSS**: Styling (with glassmorphism effects)

## Key Features Implemented

✅ Transparent, frameless window
✅ Auto-detects monitor dimensions
✅ Dark black background
✅ Glassmorphic close button
✅ Desktop icons visible on top
✅ Right-click menu works
✅ IPC communication
✅ Development workflow
