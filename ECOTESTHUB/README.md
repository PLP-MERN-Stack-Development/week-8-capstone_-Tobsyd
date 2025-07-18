# 🚀 ECOTESTHUB

**An online platform for practicing past questions and trial tests.**

---

## 📝 **Table of Contents**

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Live Demo](#live-demo)
- [Video Demo](#video-demo)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## 📖 **About**

ECOTESTHUB is a full-stack MERN application that allows users to:

- Access categorized past exam questions
- Take timed trial tests
- Track progress and performance
- Prepare more efficiently for exams through realistic practice

This project was developed as a **capstone project** to demonstrate MERN skills including API development, authentication, real-time features, testing, and deployment.

---

## 🌟 **Features**

- User authentication (JWT)
- Browse past questions by subject, exam type, and year
- Take real-time trial tests with a countdown timer
- Automatic scoring and performance feedback
- Admin dashboard to manage questions and users
- Responsive and accessible UI
- Performance tracking for users

---

## 🛠 **Tech Stack**

**Frontend:**

- React
- React Router
- Context API / Redux
- Tailwind CSS
- Axios

**Backend:**

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Socket.io (optional for real-time tests)

**Testing:**

- Jest
- Supertest
- Cypress

**Deployment:**

- Frontend: Vercel / Netlify
- Backend: Render / Railway
- Database: MongoDB Atlas
- CI/CD: GitHub Actions

---

## ⚙️ **Setup Instructions**

1️⃣ **Clone Repository:**

```bash
git clone https://github.com/yourusername/ecotesthub.git
cd ecotesthub
```

2️⃣ **Backend Setup:**

```bash
cd backend
npm install
npm run dev
```

3️⃣ **Frontend Setup:**

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 **Environment Variables**

### Backend `.env` example:

```
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:3000
```

### Frontend `.env` example:

```
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 **API Documentation**

### 🔑 **Authentication Endpoints**

#### **Register New User**

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "id": "userId",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "JWT_TOKEN"
}
```

---

#### **Login User**

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "id": "userId",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "JWT_TOKEN"
}
```

---

### 📚 **Questions Endpoints**

#### **Get All Questions**

```http
GET /api/questions
Authorization: Bearer <JWT_TOKEN>
```

**Response:**

```json
[
  {
    "id": "questionId",
    "subject": "Mathematics",
    "year": 2023,
    "examType": "WAEC",
    "questionText": "What is 2 + 2?",
    "options": ["1", "2", "3", "4"],
    "correctAnswer": "4"
  }
]
```

---

#### **Create a New Question (Admin Only)**

```http
POST /api/questions
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "subject": "Physics",
  "year": 2022,
  "examType": "NECO",
  "questionText": "What is Newton's First Law?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Option B"
}
```

**Response:**

```json
{
  "message": "Question created successfully"
}
```

---

### 📝 **Trial Test Endpoints**

#### **Start a New Trial Test**

```http
POST /api/tests/start
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "subject": "Biology",
  "examType": "JAMB",
  "numberOfQuestions": 10
}
```

**Response:**

```json
{
  "questions": [
    {
      "id": "questionId",
      "questionText": "What is photosynthesis?",
      "options": ["A", "B", "C", "D"]
    }
  ]
}
```

---

#### **Submit a Test**

```http
POST /api/tests/submit
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**

```json
{
  "answers": [
    {
      "questionId": "abc123",
      "selectedAnswer": "A"
    },
    {
      "questionId": "def456",
      "selectedAnswer": "B"
    }
  ]
}
```

**Response:**

```json
{
  "score": 8,
  "timeTaken": "00:15:32",
  "createdAt": "2025-07-18T10:20:00Z"
}
```

---

#### **Get User Performance History**

```http
GET /api/users/performance
Authorization: Bearer <JWT_TOKEN>
```

**Response:**

```json
[
  {
    "score": 9,
    "timeTaken": "00:14:10",
    "createdAt": "2025-07-10T08:00:00Z"
  },
  {
    "score": 7,
    "timeTaken": "00:20:45",
    "createdAt": "2025-07-12T10:30:00Z"
  }
]
```

---

### 🔐 **Authorization**

Most endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

Tokens are provided upon login or registration.

---

## 🖼 **Screenshots**

### 📌 Home Page



### 📌 Trial Test Interface



### 📌 Results / Performance



---

## 🌐 **Live Demo**

[🔗 https://ecotesthub.vercel.app](https://your-live-app-url.com)

---

## 🎥 **Video Demo (5-10 minutes)**

[📺 Watch Demo on YouTube](https://your-demo-video-link.com)

---

## 🚧 **Future Improvements**

- Leaderboards for users
- Certificates after completing tests
- Export results as PDF
- Mobile app version (React Native)

---

## 🪪 **License**

MIT License

