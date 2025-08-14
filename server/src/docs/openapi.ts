
export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'QuickCal AI API',
    version: '1.0.0',
    description: 'AI-powered health tracking and nutrition API'
  },
  servers: [
    {
      url: '/api',
      description: 'API Base'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      Profile: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          age: { type: 'integer' },
          gender: { type: 'string' },
          heightCm: { type: 'integer' },
          weightKg: { type: 'number' },
          activity: { type: 'string', enum: ['sedentary', 'light', 'moderate', 'active'] }
        }
      },
      Mood: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          category: { type: 'string', enum: ['stressed', 'low_energy', 'sad', 'excited', 'anxious', 'happy'] },
          note: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      Meal: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          time: { type: 'string', format: 'date-time' },
          totalKcal: { type: 'integer' },
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/MealItem' }
          }
        }
      },
      MealItem: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          quantity: { type: 'number' },
          kcal: { type: 'number' },
          protein: { type: 'number' },
          carbs: { type: 'number' },
          fat: { type: 'number' }
        }
      }
    }
  },
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register new user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User created successfully'
          }
        }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Login user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login successful'
          }
        }
      }
    },
    '/profile': {
      get: {
        summary: 'Get user profile',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Profile data',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Profile' }
              }
            }
          }
        }
      }
    }
  }
};
