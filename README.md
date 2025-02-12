# User Dashboard Application

A modern React-based dashboard application that demonstrates how to build a user management interface with features like:
- Fetching users from an API
- Searching, sorting, and paginating users
- Inline editing with Material UI components
- Custom deletion confirmation using Material UI dialogs and snackbars
- Creating a new user using a dialog-based form integrated with an API

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [License](#license)

## Overview

This project is a user dashboard that allows you to:
- **View** a list of users retrieved from an external API.
- **Search** for users by name or email.
- **Sort** users by name or email.
- **Paginate** through the user list.
- **Edit** user details inline with custom Material UI text fields (with rounded borders).
- **Delete** users using a custom confirmation dialog and display a snackbar notification.
- **Create** new users using a form dialog that integrates with an API (using `axios`).

## Features

- **API Integration:**  
  - Fetch users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).
  - Create users via a simulated API endpoint.
- **User Management:**  
  - List, search, sort, and paginate users.
  - Inline editing and deletion with confirmation.
- **Material UI Components:**  
  - Uses Material UI for styling, dialogs, buttons, icons, and snackbars.
- **Modular Code Structure:**  
  - Components for the dashboard, user rows, search input, and user creation form are separated.
  - Styled components (using Material UI's `styled` API) encapsulate all styling.
- **User-Friendly UI:**  
  - Floating Action Button (FAB) to open the "Create User" form.
  - Custom confirmation dialog for deletion.
  - Snackbar notifications to inform about deletion events.

## Technologies

- **React** (with TypeScript)
- **Material UI** (v5+)
- **Axios** for API calls
- **React Icons** for icons (e.g., edit, delete, add)
- **JSONPlaceholder API** (for user data simulation)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

2. **Install dependencies:**

npm install
# or
yarn install

3. **Start the development server:**
 npm start
# or
yarn start

4. **API Integration

This project uses axios to perform API calls. The two main functions are:**

The createUser endpoint is currently set to JSONPlaceholder. If you have your own backend server, update the URL to your API endpoint (e.g., /api/users), and ensure that your server is configured to handle POST requests.


