# 📚 Library Management System – Project Overview

### [Live Preview](https://library-management-client-eta.vercel.app/)

The **Library Management System** is a full-featured web application designed to streamline the management of books, borrowing activities, and overall library operations. Built using **React**, **Redux Toolkit Query (RTK Query)**, and **TypeScript**, this system offers a clean and responsive user interface along with efficient data handling for both users and administrators.

---

## ✅ Key Features

### 📘 Book Inventory Management

- Add, update, delete, and view books.
- Form validation with `react-hook-form`.
- Automatically update the "available" status based on the number of copies.

### 📗 Borrow Book System

- Borrow records are managed through a dedicated module.
- Data consistency ensured via tag invalidation and auto-fetching.

### 🔌 API Integration

- RESTful API calls via **Redux Toolkit Query** for all CRUD operations.
- Optimistic UI updates and cache invalidation handled using `providesTags` and `invalidatesTags`.

### 📖 Single Book View & Update

- Fetch single book data by ID for detailed view or editing.
- Dynamic form population using `react-hook-form` with auto-reset on data load.

### 📝 Form Handling & Validation

- Validations for all form inputs like title, author, genre, ISBN, copies, and description.
- Real-time error messages for a user-friendly experience.

### 🔔 Feedback and Alerts

- Integrated **SweetAlert2** for user feedback on successful or failed actions.

### ⏳ Loading State

- Reusable `Loader` component to indicate API loading states.

---

## 🧩 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **State Management & Data Fetching:** Redux Toolkit & RTK Query
- **Form Management:** React Hook Form
- **Alerts:** SweetAlert2
- **Backend API:** RESTful API (hosted on Vercel)
- **Backend:** Nodejs, Expressjs
- **Database:** MongoDB, Mongoose.

---

## 🚀 Deployment

The backend is hosted on **Vercel**, and the frontend can be deployed on platforms like **Netlify** or **Vercel**, ensuring scalability and performance for production use.

---

## 🔒 Code Structure Highlights

- `baseApi.tsx` centralizes all API endpoints with tag-based cache control.
- `AddBook.tsx` Add new book submits Books Added forms.
- `UpdateBook.tsx` dynamically populates and submits update forms.
- Organized folder structure for scalability and separation of concerns (components, API, pages).
