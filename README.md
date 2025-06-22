#  Library Management API

A simple and clean REST API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** to manage library books and borrowing system.

---

## Features

- Add / Update / Delete Books
- Borrow a Book with quantity and due date
- Track available copies
- Automatically marks unavailable when copies = 0
- Get summary of total borrowed books with title & ISBN

---

## 🚀 API Endpoints

### ✅ POST `/api/books`
> Add a new book

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "isbn": "9780553380163",
  "copies": 10
}
