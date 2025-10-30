# TicketApp - Vue 3 Implementation

A modern, responsive ticket management web application built with Vue 3, TypeScript, and Tailwind CSS. This implementation features a clean, DRY architecture with reusable components and comprehensive functionality.

🌐 **Live Demo:** [https://ticket-management-app-vue.netlify.app/](https://ticket-management-app-vue.netlify.app/)

## 🚀 Features

- **Modern Landing Page**: Beautiful hero section with wavy SVG background and decorative elements
- **Authentication System**: Secure login/signup with form validation and session management
- **Dashboard**: Comprehensive overview with ticket statistics and quick actions
- **Ticket Management**: Full CRUD operations (Create, Read, Update, Delete) with real-time validation
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Error Handling**: Comprehensive error handling with toast notifications and inline validation
- **Accessibility**: Semantic HTML, focus states, and proper color contrast

## 🏗️ Architecture

This project follows a clean, modular architecture with clear separation of concerns:

### **Component Structure**
```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.vue         # Consistent button styling
│   │   ├── Input.vue          # Form input with validation
│   │   ├── Textarea.vue       # Textarea with error handling
│   │   ├── Select.vue          # Dropdown select component
│   │   ├── Card.vue           # Card container component
│   │   ├── Modal.vue          # Modal dialog component
│   │   ├── index.ts           # Component exports
│   └── layout/                # Layout components
│       ├── Navigation.vue     # Unified navigation
│       ├── Footer.vue         # Reusable footer
│       ├── DecorativeElements.vue # SVG backgrounds & circles
│       ├── WavyBackground.vue # Hero wave SVG
│       └── index.ts           # Layout exports
├── composables/               # Reusable composition functions
│   └── useFormValidation.ts  # Form validation logic
├── stores/                    # Pinia state management
│   ├── auth.ts               # Authentication state
│   └── tickets.ts            # Ticket state management
├── utils/                     # Utility functions
│   ├── validation.ts         # Form validation utilities
│   └── ticketUtils.ts        # Ticket data operations
├── types/                     # TypeScript interfaces
│   └── index.ts              # Type definitions
├── constants/                 # Application constants
│   └── index.ts              # Configuration & constants
├── router/                   # Vue Router configuration
│   └── index.ts              # Route definitions & guards
└── pages/                     # Main application pages
    ├── LandingPage.vue
    ├── LoginPage.vue
    ├── SignupPage.vue
    ├── Dashboard.vue
    └── TicketManagement.vue
```

### **Key Design Principles**

- **DRY (Don't Repeat Yourself)**: All repeated code extracted to reusable components
- **Single Responsibility**: Each component has one clear purpose
- **Type Safety**: Comprehensive TypeScript interfaces and type checking
- **Consistent Styling**: Unified design system with Tailwind CSS
- **Maintainable Code**: Clear structure and separation of concerns
- **Composition API**: Modern Vue 3 approach with reactive refs and computed properties

## 🛠️ Technologies Used

- **Vue 3.4.21** - Progressive framework with Composition API
- **TypeScript 5.9.3** - Type-safe JavaScript development
- **Vite 7.1.7** - Fast build tool and development server
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Vue Router 4.2.5** - Official router for Vue.js
- **Pinia 2.1.7** - Official state management for Vue 3
- **Vue Toastification 2.0.0** - Toast notifications
- **UUID 13.0.0** - Unique identifier generation

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ticket-app-vue
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 🔐 Test Credentials

The application includes demo accounts for testing:

### Admin Account
- **Email**: `admin@ticketapp.com`
- **Password**: `password123`

### User Account
- **Email**: `user@ticketapp.com`
- **Password**: `password123`

### Sign Up
You can also create a new account using the signup form with any email and password (minimum 6 characters).

## 🎨 Design System

### Layout Requirements
- **Max Width**: 1440px, centered on large screens
- **Responsive**: Mobile-first design with breakpoints for tablet and desktop
- **Hero Section**: Wavy SVG background with decorative circles
- **Cards**: Rounded corners with shadows for content sections

### Color Scheme
- **Primary**: Blue tones (#0284c7)
- **Success**: Green tones (#16a34a) - for "open" status
- **Warning**: Amber tones (#d97706) - for "in_progress" status
- **Danger**: Red tones (#dc2626) - for errors and high priority
- **Gray**: Neutral tones for "closed" status

### Status Colors
- **Open**: Green (`#16a34a`)
- **In Progress**: Amber (`#d97706`)
- **Closed**: Gray (`#6b7280`)

## 🔧 Key Features Implementation

### Authentication
- Session management using localStorage with key `ticketapp_session`
- Protected routes that redirect unauthorized users to `/auth/login`
- Form validation with inline error messages
- Toast notifications for success/error feedback
- Demo credentials for quick testing

### Ticket Management
- **Create**: Modal form with validation for title and status
- **Read**: Card-based grid layout with status and priority indicators
- **Update**: Edit existing tickets with pre-filled form data
- **Delete**: Confirmation dialog before deletion
- **Validation**: Required fields (title, status) with real-time feedback

### Data Persistence
- Tickets stored in localStorage for persistence across sessions
- Automatic data loading on application startup
- Real-time updates to dashboard statistics

## 🎯 Validation Rules

### Authentication Forms
- **Email**: Required, valid email format
- **Password**: Required, minimum 6 characters for signup
- **Name**: Required, minimum 2 characters for signup
- **Confirm Password**: Must match password for signup

### Ticket Forms
- **Title**: Required field
- **Status**: Required, must be one of: "open", "in_progress", "closed"
- **Description**: Optional
- **Priority**: Optional, one of: "low", "medium", "high"

## 🚨 Error Handling

### Form Validation
- Inline error messages below form fields
- Real-time validation on form submission
- Clear error styling with red borders and text

### Authentication Errors
- "Invalid email or password" for login failures
- "Password must be at least 6 characters long" for signup
- Session expiration handling with automatic redirect
- Protected routes redirect unauthorized users to login

### Network/API Errors
- Toast notifications for failed operations
- Graceful fallbacks for localStorage operations
- User-friendly error messages
- Console error logging for debugging

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of headings, labels, and form elements
- **Focus States**: Visible focus indicators for keyboard navigation
- **Color Contrast**: Sufficient contrast ratios for text and backgrounds
- **Alt Text**: Descriptive aria-hidden attributes for decorative elements
- **ARIA Labels**: Proper labeling for interactive elements
- **Keyboard Navigation**: Full support for tab navigation and form submissions

## 📱 Responsive Design

### Mobile (< 768px)
- Stacked layout for navigation
- Single column grid for tickets
- Collapsible mobile menu
- Touch-friendly button sizes
- Hamburger menu for navigation

### Tablet (768px - 1024px)
- Two-column grid for tickets
- Adjusted spacing and typography
- Optimized form layouts
- Responsive navigation bar

### Desktop (> 1024px)
- Three-column grid for tickets
- Full navigation menu
- Maximum width container (1440px)
- Hover effects and animations
- Expanded information display

## 🧪 Testing

### Manual Testing Checklist
- [ ] Landing page loads with wavy background and decorative elements
- [ ] Login form validates email and password
- [ ] Signup form validates all required fields
- [ ] Dashboard displays correct ticket statistics
- [ ] Ticket creation form validates required fields
- [ ] Ticket editing pre-fills form data
- [ ] Ticket deletion shows confirmation dialog
- [ ] Logout clears session and redirects to login screen
- [ ] Protected routes redirect unauthorized users
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Toast notifications display correctly
- [ ] Form validation errors show inline messages

## 🚀 Deployment

### Build Process
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Environment Variables
No environment variables are required for this implementation as it uses localStorage for data persistence.

## 🔄 State Management

The application uses Pinia for global state management:

- **Auth Store**: Manages user authentication state and session
- **Tickets Store**: Manages ticket data and statistics
- **Computed Properties**: Derived state using Vue's reactivity system
- **Local State**: Component-level state for forms and UI interactions
- **LocalStorage**: Persistent storage for tickets and user sessions

## 🎯 Vue 3 Specific Features

### Composition API
- **`<script setup>`**: Modern single-file component syntax
- **Reactive References**: Using `ref()` for mutable state
- **Computed Properties**: Using `computed()` for derived state
- **Lifecycle Hooks**: `onMounted`, `onUnmounted`, `watch`
- **Teleport**: Used in Modal component for rendering outside DOM hierarchy

### Vue Router
- **Route Guards**: `beforeEach` navigation guard for protected routes
- **Programmatic Navigation**: `router.push()` for redirects
- **Route Meta**: `requiresAuth` meta for route protection
- **History Mode**: Using `createWebHistory()` for clean URLs

### Pinia Stores
- **Setup Stores**: Using setup syntax for stores
- **Reactive State**: Automatic reactivity with `ref` and `computed`
- **Actions**: Methods for mutations and async operations
- **Getters**: Computed state derived from store data

## 📝 Vue vs React Differences

### Component Syntax
- **React**: JSX with `className`, `onClick`, controlled inputs
- **Vue**: Template syntax with `:class`, `@click`, `v-model`

### State Management
- **React**: Context API with `useContext` and `useState`
- **Vue**: Pinia stores with `useAuthStore()` and `ref()`

### Form Handling
- **React**: Controlled components with `value` and `onChange`
- **Vue**: Two-way binding with `v-model`

### Lifecycle
- **React**: `useEffect`, `useState`, dependency arrays
- **Vue**: `onMounted`, `onUnmounted`, `watch`, automatic cleanup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the HNG Internship Frontend Stage 2 task.

## 🎯 Framework Consistency

This Vue implementation maintains identical functionality and design with the React version:
- ✅ Same max-width (1440px) layout
- ✅ Identical hero section with wavy SVG background
- ✅ Same decorative elements and color scheme
- ✅ Matching validation rules and error handling
- ✅ Consistent responsive breakpoints
- ✅ Identical authentication flow and protected routes
- ✅ Same CRUD operations and user experience

## 🔗 Related Implementations

This is part of a multi-framework project. Other implementations include:
- **React Version**: Modern React with Context API and hooks
- **Twig Version**: Server-side rendering with PHP (upcoming)

Each implementation delivers identical functionality and design while showcasing framework-specific patterns and best practices.

---

**Note**: This is a demonstration project for educational purposes. In a production environment, proper backend integration, database persistence, and additional security measures would be implemented.
