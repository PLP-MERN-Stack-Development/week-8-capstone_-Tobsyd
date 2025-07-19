name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  # 1. Lint and Test Backend
  backend:
    name: Lint & Test Backend
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        working-directory: ./backend
        run: |
          npm ci

      - name: Run Lint
        working-directory: ./backend
        run: |
          npm run lint

      - name: Run Tests
        working-directory: ./backend
        env:
          MONGO_URI: ${{ secrets.TEST_MONGO_URI }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
        run: |
          npm test

  # 2. Lint and Test Frontend
  frontend:
    name: Lint & Test Frontend
    runs-on: ubuntu-latest
    needs: backend
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        working-directory: ./frontend
        run: |
          npm ci

      - name: Run Lint
        working-directory: ./frontend
        run: |
          npm run lint

      - name: Run Tests
        working-directory: ./frontend
        run: |
          npm test

  # 3. Deploy Backend to Render
  deploy-backend:
    name: Deploy Backend to Render
    runs-on: ubuntu-latest
    needs: [ backend, frontend ]
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy Backend to Render
        uses: renderinc/render-deploy@v1
        with:
          api_key: ${{ secrets.RENDER_API_KEY }}
          service_id: ${{ secrets.RENDER_BACKEND_SERVICE_ID }}

  # 4. Deploy Frontend to Render
  deploy-frontend:
    name: Deploy Frontend to Render
    runs-on: ubuntu-latest
    needs: [ backend, frontend ]
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy Frontend to Render
        uses: renderinc/render-deploy@v1
        with:
          api_key: ${{ secrets.RENDER_API_KEY }}
          service_id: ${{ secrets.RENDER_FRONTEND_SERVICE_ID }}

