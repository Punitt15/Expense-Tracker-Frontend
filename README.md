# Expense Tracker Frontend

A modern, responsive expense management application built with React and TypeScript. This app helps users track their expenses with filtering capabilities, real-time statistics, and a clean, intuitive interface.

## Features

### 📊 Dashboard Overview
- **Real-time expense tracking** with filtering by user, category, and date range
- **Interactive statistics** showing top spending days, monthly changes, and predictions
- **Responsive design** that works seamlessly across desktop, tablet, and mobile devices

### 💰 Expense Management
- **Add new expenses** with user-friendly modal forms
- **Edit existing expenses** with inline editing capabilities
- **Delete expenses** with confirmation dialogs
- **Filter expenses** by user, category, and custom date ranges

### 📈 Analytics & Insights
- **Top spending days** grouped by user with detailed breakdowns
- **Monthly change percentages** showing spending trends
- **Next month predictions** based on historical data
- **Visual data presentation** with clean, organized layouts

### 🎨 User Experience
- **Toast notifications** for all user actions (add, edit, delete)
- **Loading states** with animated spinners
- **Error handling** with user-friendly error messages
- **Modal dialogs** with backdrop blur and scroll prevention
- **Responsive design** optimized for all screen sizes

## Tech Stack

### Frontend Framework
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development with strict type checking
- **Vite** - Fast build tool and development server

### State Management
- **Redux Toolkit** - Modern Redux with simplified setup
- **React Redux** - Official React bindings for Redux
- **Async Thunks** - For handling API calls and async operations

### Styling & UI
- **CSS Modules** - Scoped styling for components
- **Custom CSS** - Tailored responsive design
- **CSS Animations** - Smooth transitions and loading states

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **TypeScript ESLint** - Type-aware linting rules
- **PostCSS** - CSS processing and optimization

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ExpenseModal.tsx    # Add/Edit expense modal
│   ├── ExpenseTable.tsx    # Data table with actions
│   ├── ExpenseFilters.tsx  # Filter controls
│   ├── Toast.tsx          # Notification component
│   └── Loader.tsx         # Loading spinner
├── pages/               # Page components
│   └── Dashboard.tsx     # Main dashboard page
├── redux/               # State management
│   ├── store.ts         # Redux store configuration
│   ├── slices/          # Redux slices
│   │   ├── expenseSlice.ts
│   │   ├── statsSlice.ts
│   │   └── generalSlice.ts
│   └── api/             # API functions
│       ├── expenseApi.ts
│       ├── statsApi.ts
│       └── generalApi.ts
├── types/               # TypeScript interfaces
│   ├── expense.interface.ts
│   ├── stats.interface.ts
│   ├── general.interface.ts
│   └── dashboard.interface.ts
├── utils/               # Utility functions
│   └── dateHelpers.ts   # Date manipulation helpers
└── assets/              # Static assets
```

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## API Integration

The application expects a RESTful API with the following endpoints:

### Expenses
- `GET /api/expenses` - Fetch expenses with optional filters
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/{id}` - Update existing expense
- `DELETE /api/expenses/{id}` - Delete expense

### Statistics
- `GET /api/stats/top-days` - Get top spending days
- `GET /api/stats/monthly-change` - Get monthly change percentages
- `GET /api/stats/predict-next-month` - Get next month predictions

### General Data
- `GET /api/user` - Fetch users list
- `GET /api/category` - Fetch categories list

## Key Features Explained

### Responsive Design
The app uses a mobile-first approach with CSS Grid and Flexbox for layouts. Statistics cards automatically adjust from 1 column on mobile to 3 columns on desktop.

### State Management
Redux Toolkit manages three main slices:
- **Expense Slice**: Handles CRUD operations for expenses
- **Stats Slice**: Manages analytics and statistics data
- **General Slice**: Handles users and categories data

### Error Handling
Comprehensive error handling with:
- Network error detection
- User-friendly error messages
- Toast notifications for all states
- Graceful fallbacks for missing data

### Performance Optimizations
- Lazy loading of components
- Optimized re-renders with React.memo
- Efficient state updates with Redux Toolkit
- Minimal bundle size with Vite

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue in the repository or contact the development team.
