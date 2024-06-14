# User Management System

This is a simple User Management System built with Node.js, Express.js, MongoDB, and EJS templating engine. It allows you to perform CRUD (Create, Read, Update, Delete) operations on user data including name, email, phone number, and profile image.

## Features

- **Add User**: Allows adding a new user with name, email, phone, and profile image.
- **View Users**: Displays a list of all users stored in the database.
- **Edit User**: Enables editing user details including name, email, phone, and profile image.
- **Delete User**: Allows deleting a user from the system.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Make sure MongoDB server is running)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your_username/user-management-system.git
   ```

## Installation

1. Navigate to the project directory:

   ```bash
   cd user-management-system
   ```

2 Install dependencies:

```
npm install
```

3 Set up environment variables:

Create a .env file in the root directory and provide the following variables:

```
PORT=3000
DB_URI=your_mongodb_connection_uri
```

4. Run the application:

```
npm start
```

Open your web browser and visit http://localhost:3000 to access the application.

Usage
Click on "Add User" to add a new user.
Click on "View Users" to see the list of all users.
Click on "Edit" next to any user to update their details.
Click on "Delete" next to any user to remove them from the system.
