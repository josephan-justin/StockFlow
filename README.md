# StockFlow

StockFlow is a web-based Inventory Management System designed to simplify inventory management for businesses. The application allows users to manage products, categories, suppliers, users, and stock transactions with authentication, search, pagination, and image upload features.

Built with Express.js, PostgreSQL, Sequelize, EJS, and Bootstrap.

---

## Features

### Authentication
- Register
- Login
- Logout
- Password Hashing with bcrypt
- Session Authentication
- Role-based Authorization

### Dashboard
- Inventory Summary
- Total Products
- Total Categories
- Total Suppliers
- Total Transactions
- Low Stock Information

### Product Management
- Create Product
- Read Product
- Update Product
- Delete Product
- Product Image Upload
- Automatic Image Replacement
- Automatic Old Image Deletion
- Search Products
- Pagination

### Category Management
- Create Category
- Read Category
- Update Category
- Delete Category
- Search Categories

### Supplier Management
- Create Supplier
- Read Supplier
- Update Supplier
- Delete Supplier
- Search Suppliers

### Inventory Transactions
- Stock In
- Stock Out
- Transaction History
- Transaction Detail
- Transaction Search
- Stock Validation

### User Management
- View Users
- Search Users
- Activate User
- Deactivate User

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- EJS
- Bootstrap 5
- Express Session
- Connect Flash
- Multer
- BcryptJS

---

## Project Structure

```
StockFlow
├── config
├── controllers
├── middlewares
├── migrations
├── models
├── public
├── routes
├── seeders
├── views
├── app.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/stockflow.git
```

Install dependencies:

```bash
npm install
```

Create the database:

```bash
npx sequelize db:create
```

Run migrations:

```bash
npx sequelize db:migrate
```

Run seeders:

```bash
npx sequelize db:seed:all
```

Start the application:

```bash
npm start
```

or

```bash
nodemon app.js
```

---

## Future Improvements

- Dashboard Charts
- Export to Excel/PDF
- Email Notifications
- Barcode Scanner Integration
- REST API

---

## Author

Josephan Justin