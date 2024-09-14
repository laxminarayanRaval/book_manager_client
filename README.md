# Book Manager Frontend

This project is a React-based frontend for a Book Management application. It showcases advanced React patterns, state management with Redux Toolkit, and modern web development practices.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/book-manager-frontend.git
   cd book-manager-frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

   Adjust the URL if your backend is hosted elsewhere.

4. Start the development server:

   ```
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/        # Reusable components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API and other services
├── store/             # Redux store setup and slices
├── utils/             # Utility functions
├── App.js             # Main App component
├── index.js           # Entry point
└── theme.js           # Material-UI theme configuration
```

## Key Features

- Redux Toolkit for state management
- JWT authentication with refresh tokens
- Infinite scrolling for book list
- Form validation using custom hooks
- Compound components for forms
- Lazy loading and code splitting
- Global error boundary
- Accessibility features

## Testing

Run the test suite with:

```
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
