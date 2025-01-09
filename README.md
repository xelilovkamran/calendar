# Calendar

A modern task management and calendar application built with React, TypeScript, and Vite.

## 🚀 Features

- Interactive calendar interface with month navigation
- Task management with drag-and-drop functionality
- Task creation, editing, and deletion
- Responsive design
- TypeScript integration
- Fast development with Vite HMR
- ESLint

## 🛠️ Technology Stack

- React ^18.3.1
- TypeScript ~5.6.2
- Vite ^6.0.5
- @emotion/react ^11.14.0
- @emotion/styled ^11.14.0
- date-fns ^4.1.0
- react-icons ^5.4.0
- uuid ^11.0.4

## 📋 Prerequisites

- Node.js (latest LTS version)
- npm (latest version)

## 🔧 Installation

1. Clone the repository

```bash
git clone https://github.com/xelilovkamran/calendar.git
```

2. Navigate to the project directory

```bash
cd calendar
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

## 📁 Project Structure

```
calendar/
├── src/
│   ├── components/
│   │   ├── Calendar.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskModal.tsx
│   │   ├── TaskCard.tsx
│   │   └── ConfirmModal.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── favicon.ico
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.app.json
├── vite.config.ts
├── .eslint.config.js
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## 🔍 Component Overview

### Calendar Component (`Calendar.tsx`)

The main calendar interface that provides:

- Month navigation
- Task organization by date
- Task creation and management
- Drag and drop functionality

### TaskList Component (`TaskList.tsx`)

Manages tasks within each day:

- Task display
- Drag and drop reordering
- Task management interface

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes TypeScript build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### ESLint Configuration

The project uses ESLint with:

- TypeScript support
- React Hooks rules
- React Refresh plugin

## 🎨 Styling

The project uses @emotion/styled for:

- Styled components
- Global styles
- Responsive design
- Modern UI components

## 📈 Future Enhancements

- Dark mode support
- Multiple calendar views
- Task categories
- Drag and drop interface improvements
- Calendar sharing
- Export functionality
