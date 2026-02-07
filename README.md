# Authentication App

## Prerequisites

Before you get started, make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Firebase project setup with authentication enabled

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/aljary12/auth-app.git
   cd auth-app
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your Firebase configuration details:

   ```plaintext
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSSAGING_SENDER_ID=your_messaging_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the Application**

   Start the Development Server

   ```bash
   npm start
   ```

   Or use specific commands:

   ```bash
   # Start on iOS simulator
   npm run ios

   # Start on Android emulator
   npm run android

   # Start on Web
   npm run web
   ```

## Features

- **User Registration and Login**: Users can create an account and log in using Firebase Authentication.
- **Form Validation**: The application includes form validation to ensure that all inputs are correct before submission. This includes:
  - Email format validation
  - Password strength validation
  - Required fields check
- **Firebase Auth Integration**: Leverages Firebase for user authentication with support for email/password sign-in.

## Conclusion

This app serves as a simple authentication solution utilizing Firebase for backend services and validation to ensure quality user input.

## Demo
https://github.com/user-attachments/assets/6609b89a-4305-41bc-b2a0-1a811c8801a4

