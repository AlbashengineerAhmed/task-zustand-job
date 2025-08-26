# Lead Management Dashboard

A modern, responsive lead management application built with React, Vite, and Zustand for state management.

## Features

- **Responsive Design**: Fully responsive table that transforms into mobile-friendly cards on smaller screens
- **Lead Management**: View, select, and export leads with comprehensive information
- **Modern UI**: Clean, professional interface with Tailwind CSS styling
- **State Management**: Efficient state management using Zustand
- **Pagination**: Smart pagination with ellipsis for large datasets
- **Selection System**: Multi-select functionality with "Select All" option
- **Export Functionality**: Individual lead export capabilities

## Responsive Design

The application features a dual-layout system:

- **Desktop (md+)**: Traditional table layout with all columns visible
- **Mobile (< md)**: Card-based layout optimized for touch interaction

## Tech Stack

- **Frontend**: React 18 with Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **Build Tool**: Vite with HMR (Hot Module Replacement)
- **Linting**: ESLint with React rules

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-zustand-job
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── Table.jsx
│   ├── LeadsTable.jsx      # Main leads table component
│   ├── NavigationTabs.jsx  # Navigation component
│   └── Sidebar.jsx         # Sidebar navigation
├── pages/
│   └── Dashboard.jsx       # Main dashboard page
├── store/
│   └── leadsStore.js       # Zustand store for leads
├── services/
│   ├── api.js             # API configuration
│   └── leadsService.js    # Lead-related API calls
├── lib/
│   └── utils.js           # Utility functions
├── App.jsx                # Main app component
└── main.jsx              # Application entry point
```

## Key Components

### LeadsTable Component
- **Responsive Design**: Renders desktop table or mobile cards based on screen size
- **Selection Management**: Checkbox selection with bulk operations
- **Export Functionality**: Individual lead export buttons
- **Pagination**: Smart pagination with page numbers and ellipsis

### Zustand Store (leadsStore.js)
- **State Management**: Centralized state for leads, pagination, and selections
- **Actions**: CRUD operations, pagination, and selection management
- **Persistence**: Maintains state across component re-renders

## Data Structure

Each lead contains the following information:
- **id**: Unique identifier
- **name**: Lead's full name
- **email**: Contact email
- **tags**: Array of associated tags
- **connectedWith**: Person/entity connected to the lead
- **createdAt**: Creation timestamp

## Styling

The application uses Tailwind CSS for styling with:
- **Responsive breakpoints**: `sm`, `md`, `lg`, `xl` for different screen sizes
- **Color scheme**: Professional blue and gray palette
- **Interactive states**: Hover effects and focus states
- **Accessibility**: Proper contrast ratios and keyboard navigation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Mobile Optimization

The mobile experience includes:
- **Card Layout**: Each lead displayed as an individual card
- **Touch-Friendly**: Larger touch targets for mobile interaction
- **Optimized Information**: Prioritized information display
- **Smooth Animations**: Transition effects for better UX

## Performance Features

- **Pagination**: Efficient rendering of large datasets
- **Lazy Loading**: Components loaded as needed
- **Optimized Re-renders**: Zustand's selective subscriptions
- **Responsive Images**: Optimized avatar placeholders

## 🔮 Future Enhancements

- Search and filtering functionality
- Bulk export operations
- Lead editing capabilities
- Real-time updates
- Advanced sorting options
- Data visualization charts

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the excellent framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first CSS framework
- Zustand for simple state management
