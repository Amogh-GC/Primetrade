# Primetrade.ai - Full Stack Task Management Application

A modern, full-stack task management web application built with Next.js 14, Express.js, MongoDB, and JWT authentication. This project demonstrates best practices in full-stack development with secure authentication, CRUD operations, and a responsive user interface.

## 🎯 Project Overview

This application was built as a take-home assignment for a Frontend Developer Intern position. It showcases proficiency in:

- Modern React patterns with Next.js 14 App Router
- RESTful API design with Express.js
- MongoDB database modeling and operations
- JWT-based authentication and authorization
- Form validation and error handling
- Responsive UI design with TailwindCSS

## 🚀 Features

### Authentication

- ✅ User registration with input validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing using bcryptjs
- ✅ Protected routes and middleware
- ✅ Auto-redirect for authenticated users

### User Profile Management

- ✅ View user profile information
- ✅ Update profile (name, bio)
- ✅ Responsive profile UI

### Task Management (CRUD)

- ✅ Create tasks with title, description, status, priority, and due date
- ✅ View all tasks in a clean, organized layout
- ✅ Edit existing tasks
- ✅ Delete tasks with confirmation
- ✅ Filter tasks by status and priority
- ✅ Search tasks by title or description
- ✅ Color-coded status and priority badges

### UX Enhancements

- ✅ Loading spinners for async operations
- ✅ Toast notifications for success/error feedback
- ✅ Form validation with React Hook Form
- ✅ Responsive design for mobile and desktop
- ✅ Smooth transitions and hover effects

## 🛠️ Tech Stack

### Frontend

- **Next.js 14+**: React framework with App Router for modern web applications
- **React 18**: UI library with hooks and functional components
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Axios**: Promise-based HTTP client for API requests
- **React Hook Form**: Performant form validation library
- **React Hot Toast**: Beautiful toast notifications
- **JS Cookie**: Simple cookie handling

### Backend

- **Node.js**: JavaScript runtime for server-side code
- **Express.js**: Fast, minimalist web framework
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: Elegant MongoDB object modeling
- **JWT (jsonwebtoken)**: Secure token-based authentication
- **bcryptjs**: Password hashing for security
- **express-validator**: Middleware for input validation

### Security & Middleware

- **Helmet**: Security headers for Express
- **CORS**: Cross-Origin Resource Sharing
- **Morgan**: HTTP request logger
- **dotenv**: Environment variable management

## 📁 Project Structure

```
Primetrade.ai/
├── client/                 # Next.js Frontend
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.js    # Dashboard with profile & tasks
│   │   ├── login/
│   │   │   └── page.js    # Login page
│   │   ├── signup/
│   │   │   └── page.js    # Signup page
│   │   ├── layout.js       # Root layout with Toaster
│   │   ├── page.js         # Landing page
│   │   └── globals.css     # Global styles with Tailwind
│   ├── components/
│   │   ├── Navbar.js       # Navigation bar
│   │   ├── TaskForm.js     # Task create/edit form
│   │   ├── TaskList.js     # Task list with actions
│   │   └── Spinner.js      # Loading spinner
│   ├── lib/
│   │   ├── api.js          # Axios instance with interceptors
│   │   └── auth.js         # Auth utilities (token, user)
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                 # Express.js Backend
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── models/
│   │   ├── User.js         # User schema & methods
│   │   └── Task.js         # Task schema
│   ├── routes/
│   │   ├── auth.js         # Signup & login routes
│   │   ├── profile.js      # User profile routes
│   │   └── tasks.js        # Task CRUD routes
│   ├── utils/
│   │   └── jwt.js          # JWT utilities
│   ├── index.js            # Express server entry point
│   ├── package.json
│   └── .env.example        # Environment variables template
│
└── README.md               # This file
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   cd "d:\Documents\Web Development\Primetrade.ai"
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/primetrade
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

   For MongoDB Atlas:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/primetrade
   ```

3. **Setup Frontend**

   ```bash
   cd ../client
   npm install
   ```

   Create a `.env.local` file in the `client` directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd server
   npm run dev
   ```

   Server will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**

   ```bash
   cd client
   npm run dev
   ```

   Application will run on `http://localhost:3000`

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - Create a new account or login
   - Start managing your tasks!

## 🔑 API Endpoints

### Authentication

- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user

### Profile

- `GET /api/v1/me` - Get current user profile (Protected)
- `PUT /api/v1/me` - Update user profile (Protected)

### Tasks

- `GET /api/v1/tasks` - Get all tasks for user (Protected)
  - Query params: `status`, `priority`, `search`
- `GET /api/v1/tasks/:id` - Get single task (Protected)
- `POST /api/v1/tasks` - Create new task (Protected)
- `PUT /api/v1/tasks/:id` - Update task (Protected)
- `DELETE /api/v1/tasks/:id` - Delete task (Protected)

### Health Check

- `GET /api/v1/health` - Server health check

## 📊 Database Schema

### User Model

```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, validated),
  password: String (required, hashed, min 6 chars),
  bio: String (optional, max 500 chars),
  avatar: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model

```javascript
{
  title: String (required, 3-100 chars),
  description: String (optional, max 500 chars),
  status: Enum ['pending', 'in-progress', 'completed'],
  priority: Enum ['low', 'medium', 'high'],
  dueDate: Date (optional),
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Middleware validation
- **Input Validation**: express-validator on backend, React Hook Form on frontend
- **CORS Configuration**: Restricted origins
- **Helmet**: Security headers
- **Error Handling**: Comprehensive try-catch blocks
- **SQL Injection Prevention**: Mongoose ODM
- **XSS Protection**: Input sanitization

## 🚢 Scalability & Production

### Deployment Strategies

#### 1. **Frontend Deployment (Vercel)**

Vercel is the recommended platform for Next.js applications:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel
```

**Environment Variables on Vercel:**

- `NEXT_PUBLIC_API_URL`: Your production API URL

**Benefits:**

- Automatic deployments from Git
- Edge network for global performance
- Built-in SSL certificates
- Preview deployments for PRs

#### 2. **Backend Deployment (Railway/Render/Heroku)**

**Railway Example:**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
cd server
railway login
railway init
railway up
```

**Environment Variables:**

- Set all `.env` variables in Railway dashboard
- Update `MONGODB_URI` to MongoDB Atlas connection string
- Update `CORS_ORIGIN` to your Vercel frontend URL

**Alternative Platforms:**

- **Render**: Free tier with auto-deploy from Git
- **Heroku**: Established platform with add-ons
- **DigitalOcean App Platform**: Simple deployment with scaling

#### 3. **Database (MongoDB Atlas)**

- Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Whitelist IP addresses or use `0.0.0.0/0` for all IPs
- Use connection string in environment variables
- Enable authentication and create database user

### Docker Deployment

**Dockerfile (Backend)**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
```

**Dockerfile (Frontend)**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

**docker-compose.yml**

```yaml
version: "3.8"
services:
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://admin:password@mongodb:27017/primetrade?authSource=admin
      - JWT_SECRET=${JWT_SECRET}
      - CORS_ORIGIN=http://localhost:3000
    depends_on:
      - mongodb

  frontend:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
    depends_on:
      - backend

volumes:
  mongo-data:
```

**Run with Docker:**

```bash
docker-compose up -d
```

### Performance Optimization

#### Caching Strategies

1. **Redis for Session Storage**

   ```javascript
   // Install redis
   npm install redis

   // Cache user sessions
   const redis = require('redis');
   const client = redis.createClient();

   // Cache frequently accessed data
   await client.set(`user:${userId}`, JSON.stringify(userData), {
     EX: 3600 // 1 hour expiry
   });
   ```

2. **API Response Caching**

   ```javascript
   // Use middleware for caching
   const cache = require("express-redis-cache")();

   router.get("/tasks", authMiddleware, cache.route(), getTasks);
   ```

3. **Next.js Static Generation**
   ```javascript
   // For public pages
   export const revalidate = 60; // Revalidate every 60 seconds
   ```

#### Database Optimization

1. **Indexing**

   ```javascript
   // Already implemented in Task model
   taskSchema.index({ user: 1, createdAt: -1 });

   // Add compound indexes for complex queries
   taskSchema.index({ user: 1, status: 1, priority: 1 });
   ```

2. **Pagination**

   ```javascript
   // Add to tasks route
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;
   const skip = (page - 1) * limit;

   const tasks = await Task.find(filter)
     .sort({ createdAt: -1 })
     .skip(skip)
     .limit(limit);
   ```

3. **Aggregation Pipeline**
   ```javascript
   // For analytics
   const stats = await Task.aggregate([
     { $match: { user: userId } },
     {
       $group: {
         _id: "$status",
         count: { $sum: 1 },
       },
     },
   ]);
   ```

### Monitoring & Logging

1. **Application Performance Monitoring (APM)**
   - **Sentry**: Error tracking and performance monitoring
   - **New Relic**: Full-stack observability
   - **Datadog**: Infrastructure and application monitoring

2. **Logging**

   ```javascript
   // Use Winston for structured logging
   const winston = require("winston");

   const logger = winston.createLogger({
     level: "info",
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: "error.log", level: "error" }),
       new winston.transports.File({ filename: "combined.log" }),
     ],
   });
   ```

3. **Health Checks**
   - Already implemented at `/api/v1/health`
   - Add database connectivity check
   - Monitor memory usage and response times

### CI/CD Pipeline

**GitHub Actions Example (.github/workflows/deploy.yml)**

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          cd server
          npm install
          npm test

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: |
          npm i -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        run: |
          npm i -g vercel
          cd client
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### Security Best Practices for Production

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, random JWT secrets (32+ characters)
   - Rotate secrets regularly

2. **Rate Limiting**

   ```javascript
   const rateLimit = require("express-rate-limit");

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
   });

   app.use("/api/", limiter);
   ```

3. **HTTPS Only**
   - Enforce HTTPS in production
   - Use security headers (already implemented with Helmet)
   - Set secure cookie flags

4. **Input Sanitization**
   - Validate all inputs (already implemented)
   - Sanitize HTML content
   - Use parameterized queries (Mongoose handles this)

### Scaling Strategies

1. **Horizontal Scaling**
   - Deploy multiple backend instances behind a load balancer
   - Use session store (Redis) for shared state
   - Implement sticky sessions if needed

2. **Vertical Scaling**
   - Increase server resources (CPU, RAM)
   - Optimize MongoDB queries
   - Use connection pooling

3. **Microservices (Future)**
   - Separate authentication service
   - Task management service
   - Notification service
   - API Gateway for routing

4. **CDN for Static Assets**
   - Cloudflare, AWS CloudFront, or Vercel Edge Network
   - Cache images, CSS, and JavaScript
   - Reduce server load and improve latency

## 📝 Development Notes

### Code Quality

- Consistent code formatting
- Comprehensive error handling
- Detailed comments for complex logic
- Modular and reusable components
- RESTful API design principles

### Future Enhancements

- [ ] Task categories/tags
- [ ] Task sharing and collaboration
- [ ] Email notifications
- [ ] File attachments
- [ ] Dark mode
- [ ] Advanced analytics dashboard
- [ ] Real-time updates with WebSockets
- [ ] Mobile app (React Native)

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this project for learning purposes.

## 👨‍💻 Developer

Built with ❤️ as a take-home assignment demonstrating full-stack development skills.

---

**Note**: This project demonstrates proficiency in modern web development technologies and best practices. It's production-ready with proper security measures, error handling, and scalable architecture.
