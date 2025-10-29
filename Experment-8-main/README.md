# Create Login Form with React State Management
## Objective

Learn how to build a login form in React using basic state management with the useState hook.
This project demonstrates how to capture and handle form input data, manage local component state, and respond to user actions in a React application.

## Task Description

In this project, you will:

Create a simple login form component in React that includes fields for username and password.

Use the useState hook to manage form data locally.

Update the state in real time as the user types in the input fields.

Implement a submit button that:

Logs the entered username and password to the console.

Displays a validation message if either field is left empty when submitting.

Test your form by entering different values and checking the browser console to ensure that state updates correctly and validation works as expected.

## Technologies Used

React.js

JavaScript (ES6)

HTML

CSS

## How to Run the Project

Create a new React project using Create React App:

npx create-react-app login-form-demo
cd login-form-demo


Create a new file named LoginForm.jsx inside the src folder and paste the login form code.

Update the App.js file to import and render the LoginForm component:

import React from "react";
import LoginForm from "./LoginForm";

function App() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default App;


Start the development server:

npm start


Open your browser and go to http://localhost:3000 to view the login form.
