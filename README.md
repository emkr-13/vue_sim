# Vue Inventory Management System

A Vue 3 TypeScript application for authentication and dashboard management.

## Project Structure

```
src/
├── assets/        # Static assets (images, fonts, etc.)
├── components/    # Reusable Vue components
├── layouts/       # Application layouts (Auth, Dashboard)
├── router/        # Vue Router configuration
├── services/      # API services and business logic
├── stores/        # Pinia stores for state management
├── types/         # TypeScript type definitions
└── views/         # Application pages
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

## Installation

1. Clone this repository

```bash
git clone https://github.com/emkr-13/vue_sim.git
cd vue-sim
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

5. Preview production build

```bash
npm run preview
```

## Tech Stack

- Vue 3.4
- TypeScript 5.5
- Vite 5.4
- Vue Router 4.2
- Pinia 2.1 (State Management)
- Axios 1.6

### Key Features

- User Authentication
- Dashboard Interface
- Persistent State Management
- Type-Safe Development
- Modern Development Experience with Vite

## Development

This project uses:
- `<script setup>` SFCs for better TypeScript integration
- Pinia for state management with persistence
- Vue Router for navigation
- Axios for API requests

## Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
