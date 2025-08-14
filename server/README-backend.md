
# QuickCal AI Backend

A production-ready Node.js backend for the QuickCal AI health tracking application.

## Features

- **Authentication**: JWT-based auth with bcrypt password hashing
- **Database**: PostgreSQL with Prisma ORM (SQLite fallback for development)
- **API Documentation**: OpenAPI/Swagger at `/api/docs`
- **Security**: Helmet, CORS, rate limiting, input validation
- **Health Tracking**: Mood tracking, meal logging, nutrition lookup
- **AI Integration**: Coach recommendations and assistant chat
- **Food Recognition**: Image-based food detection (pluggable)

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** (using Replit Secrets):
   ```
   DATABASE_URL=postgresql://user:pass@host:port/db
   JWT_SECRET=your-super-secret-key
   OPENAI_API_KEY=sk-... (optional)
   USDA_API_KEY=... (optional)
   ```

3. **Initialize database**:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   npm run prisma:seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

The server will start on port 5000 with API docs at http://localhost:5000/api/docs

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

### Mood Tracking
- `POST /api/mood` - Log mood entry
- `GET /api/mood/today` - Get today's moods
- `GET /api/mood/timeline` - Get mood history

### Meals & Nutrition
- `POST /api/meals` - Log a meal
- `GET /api/meals/:id` - Get specific meal
- `GET /api/meals/day` - Get meals for a day
- `GET /api/nutrition/search` - Search foods
- `POST /api/nutrition/calc` - Calculate nutrition totals

### AI Features
- `POST /api/coach/recommendations` - Get personalized recommendations
- `POST /api/assistant/chat` - Chat with AI assistant
- `POST /api/recognition/photo` - Recognize food from image

## Database Schema

The app uses Prisma with the following main models:
- **User**: Authentication and basic info
- **Profile**: Health metrics and preferences
- **Mood**: Mood tracking entries
- **Meal/MealItem**: Food logging
- **Recommendation**: AI coach suggestions
- **ChatMessage**: Assistant conversations

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | SQLite fallback |
| `JWT_SECRET` | Secret for JWT tokens | 'super-secret-change-me' |
| `PORT` | Server port | 5000 |
| `OPENAI_API_KEY` | OpenAI API key (optional) | - |
| `USDA_API_KEY` | USDA nutrition API key (optional) | - |
| `MODEL_SERVER_URL` | Food recognition API URL (optional) | - |

## Production Deployment

1. **Build the server**:
   ```bash
   npm run build:server
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Environment setup**: Ensure all production environment variables are set via Replit Secrets.

## Architecture

- **Express.js** - Web framework
- **Prisma** - Database ORM
- **Zod** - Request validation
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Swagger UI** - API documentation

## Security Features

- Input validation with Zod schemas
- Rate limiting (100 req/15min general, 5 req/15min auth)
- CORS configured for development and production
- Helmet for security headers
- JWT token expiration (7 days)
- Password hashing with bcrypt (12 rounds)

## Error Handling

All errors are handled consistently:
- Validation errors return 400 with details
- Authentication errors return 401
- Not found errors return 404
- Server errors return 500 (sanitized in production)

## Testing

Run tests with:
```bash
npm test
```

## API Documentation

Interactive API documentation is available at `/api/docs` when the server is running.
