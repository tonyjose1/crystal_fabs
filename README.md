# Crystal Fabs Website

This project is a full-stack web application for Crystal Fabs, a company specializing in custom fabrications. The application includes a frontend built with Next.js and a backend built with Node.js and Express.

## Technologies Used

### Backend

*   **Node.js:** JavaScript runtime environment
*   **Express.js:** Web framework for Node.js
*   **Prisma:** Modern database toolkit for PostgreSQL
*   **PostgreSQL:** Open-source relational database
*   **Multer:** Middleware for handling `multipart/form-data`, used for file uploads
*   **Nodemailer:** Module for sending emails
*   **dotenv:** Module for loading environment variables from a `.env` file
*   **CORS:** Middleware for enabling Cross-Origin Resource Sharing

### Frontend

*   **Next.js:** React framework for building server-side rendered and static web applications
*   **React:** JavaScript library for building user interfaces
*   **TypeScript:** Typed superset of JavaScript
*   **Tailwind CSS:** Utility-first CSS framework
*   **ESLint:** Pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript
*   **Swiper:** Modern touch slider for mobile websites
*   **React Responsive Masonry:** A responsive masonry component for React

## Project Structure

The project is divided into two main parts: a `backend` and a `frontend`.

### Backend Structure

```
backend/
├── config/
│   └── db.js           # Database connection
├── controllers/
│   ├── productController.js
│   ├── projectController.js
│   ├── quoteController.js
│   └── testimonialController.js
├── middlewares/
│   ├── cors.js
│   ├── errorHandler.js
│   ├── upload.js
│   └── validation.js
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── seed.ts
├── routes/
│   ├── productRoutes.js
│   ├── projectRoutes.js
│   ├── quoteRoutes.js
│   └── testimonialRoutes.js
├── services/
│   ├── productService.js
│   ├── projectService.js
│   ├── quoteService.js
│   └── testimonialService.js
├── utils/
│   └── emailService.js
├── .env                  # Environment variables
├── app.js                # Express application setup
├── package.json
└── server.js             # Server entry point
```

### Frontend Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── products/
│   │   ├── projects/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── FeatureList.tsx
│   │   ├── Footer.tsx
│   │   ├── GalleryCard.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ImageWithFallback.tsx
│   │   ├── InfoCard.tsx
│   │   ├── Modal.tsx
│   │   ├── ProductCard.tsx
│   │   ├── QuoteForm.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── TeamCard.tsx
│   │   └── TestimonialCard.tsx
│   ├── styles/
│   └── utils/
│       └── api.ts
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

### Prerequisites

*   Node.js and npm
*   PostgreSQL

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/crystal-fabs.git
    cd crystal-fabs
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
    ```

5.  **Run database migrations:**

    ```bash
    cd backend
    npx prisma migrate dev
    ```

### Running the Application

1.  **Start the backend server:**

    ```bash
    cd backend
    npm start
    ```

2.  **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Endpoints

*   `GET /api/products`: Get all products
*   `GET /api/products/:id`: Get a single product
*   `POST /api/products`: Create a new product
*   `PUT /api/products/:id`: Update a product
*   `DELETE /api/products/:id`: Delete a product
*   `GET /api/projects`: Get all projects
*   `GET /api/projects/:id`: Get a single project
*   `POST /api/projects`: Create a new project
*   `PUT /api/projects/:id`: Update a project
*   `DELETE /api/projects/:id`: Delete a project
*   `GET /api/testimonials`: Get all testimonials
*   `POST /api/testimonials`: Create a new testimonial
*   `POST /api/quote`: Submit a new quote request
*   `POST /api/admin/login`: Login as an admin
*   `GET /api/categories`: Get all categories

## Database Schema

The database schema is defined in `backend/prisma/schema.prisma`.

### Models

*   **Category:**
    *   `id`: String (UUID)
    *   `name`: String
*   **Product:**
    *   `id`: String (UUID)
    *   `name`: String
    *   `description`: String (optional)
    *   `imageUrl`: String (optional)
    *   `categoryId`: String (foreign key to Category)
*   **Project:**
    *   `id`: String (UUID)
    *   `name`: String
    *   `description`: String (optional)
    *   `imageUrl`: String (optional)
    *   `category`: String (optional)
    *   `client`: String (optional)
    *   `testimonial`: String (optional)
*   **Testimonial:**
    *   `id`: String (UUID)
    *   `author`: String
    *   `content`: String
    *   `rating`: Int (default: 5)
*   **Quote:**
    *   `id`: String (UUID)
    *   `name`: String
    *   `phone`: String
    *   `category`: String
    *   `message`: String (optional)
    *   `attachments`: String (optional)
*   **Admin:**
    *   `id`: String (UUID)
    *   `username`: String
    *   `password`: String
