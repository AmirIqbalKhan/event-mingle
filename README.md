# EventMingle Platform

A comprehensive event management platform consisting of three interconnected applications:
- EventMingle (Main Application)
- Event Manager
- Master Admin

## Project Structure

```
event-mingle/
├── apps/
│   ├── event-mingle/     # Main application
│   ├── event-manager/    # Event management application
│   └── master-admin/     # Administrative application
├── packages/
│   ├── config/          # Shared configuration
│   ├── database/        # Shared database package
│   ├── ui/             # Shared UI components
│   └── shared/         # Shared utilities and types
└── package.json
```

## Shared Packages

### Config Package
- Environment variable validation using Zod
- Configuration schemas for database, auth, and API
- Type-safe configuration management

### Database Package
- Shared database schema using Drizzle ORM
- Database client configuration
- Common database operations

### UI Package
- Reusable React components
- Shared theme configuration
- Tailwind CSS setup
- Common utility functions

### Shared Package
- Common TypeScript types and interfaces
- Shared API client
- Authentication context
- Utility functions

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create `.env` files in each application directory with the following variables:
```env
# Database
DATABASE_URL=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=

# Auth
JWT_SECRET=
JWT_EXPIRES_IN=
REFRESH_TOKEN_EXPIRES_IN=

# API
API_BASE_URL=
API_TIMEOUT=

# App
NODE_ENV=development
PORT=3000
```

3. Start development servers:
```bash
# Start all applications
npm run dev

# Start specific application
npm run dev:event-mingle
npm run dev:event-manager
npm run dev:master-admin
```

## Development

### Adding New Features
1. Create feature branch from `main`
2. Implement changes
3. Add tests
4. Create pull request

### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages

### Testing
```bash
# Run all tests
npm test

# Run tests for specific package
npm test --workspace=@event-mingle/config
```

## Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
- Set `NODE_ENV=production`
- Configure production database
- Set up proper JWT secrets
- Configure API endpoints

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## License

MIT 