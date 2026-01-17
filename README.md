# Life Live Wallpaper

A customizable live wallpaper application for Windows that sits on your desktop and allows you to add interactive widgets for goals, todos, photo collages, and more.

## 🚀 Features (Phase 1 - Basic Setup)

- ✅ Dark black fullscreen background
- ✅ Sits behind desktop icons (wallpaper behavior)
- ✅ Corner close button (X) with glassmorphic design
- ✅ Right-click menu works normally
- ✅ Desktop icons visible on top

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

Run the app in development mode:

```bash
npm run electron:dev
```

This will:
1. Start the Vite dev server
2. Wait for it to be ready
3. Launch the Electron app

## 🏗️ Build

Build the production app:

```bash
npm run electron:build
```

## 🎯 Project Structure

```
LifeLiveWallpapper/
├── electron/
│   ├── main.js          # Electron main process
│   └── preload.js       # Preload script
├── src/
│   ├── App.jsx          # Main React component
│   ├── App.css          # App styles
│   ├── index.css        # Global styles
│   └── main.jsx         # React entry point
├── package.json
└── vite.config.js
```

## 🔧 Technical Details

- **Electron**: Creates a transparent, frameless window that sits behind other windows
- **React + Vite**: Fast, modern frontend development
- **Wallpaper Behavior**: Window is set to `alwaysOnBottom` to act like a wallpaper
- **Interactive Elements**: Close button is fully interactive while maintaining wallpaper behavior

## 📝 Next Steps

- [ ] Add widget system
- [ ] Create todo list widget
- [ ] Create goals tracker widget
- [ ] Create photo collage widget
- [ ] Add drag-and-drop functionality
- [ ] Add theme customization
- [ ] Add settings panel

## 🎨 Customization

The wallpaper is fully customizable. Future updates will include:
- Multiple themes
- Custom backgrounds
- Widget library
- Layout presets
