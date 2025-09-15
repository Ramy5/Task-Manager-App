# Task Manager · Expo + React Native

Simple task manager. Local persistence. Light and dark theme. Expo Router. TypeScript.

## Overview

- Add tasks
- Edit tasks
- Toggle complete
- Delete tasks
- Persistent storage with AsyncStorage
- Theme follows system with manual toggle

Special instructions

- Tap the checkbox area to toggle a task
- Tap the pencil icon to edit
- Tap the trash icon to delete
- Tap the sun or moon icon to switch theme
- Title 2–60 characters
- Description empty or 2–160 characters

## Setup

```bash
npm install
npx expo install @react-native-async-storage/async-storage
```

## Run

```bash
npx expo start
```

Open on a device or simulator. Use a development build, Android emulator, iOS simulator, or Expo Go.

## How data is saved

- State serializes to JSON
- Saved under @tasks/v1
- Loaded on app launch and dispatched as HYDRATE
- Theme choice saved under @theme/v1
- Save uses a small debounce to reduce writes
- Reset during development
- Change the storage key suffix or clear app storage on the device

Reset during development

- Change the storage key suffix or clear app storage on the device

## Third-party libraries and purpose

- @react-native-async-storage/async-storage: Persistent storage
- expo:run the app and access native APIs
- expo-router: Navigation
- react-native-safe-area-context: Safe area insets
- expo-status-bar: Status bar
- @expo/vector-icons: Icons
