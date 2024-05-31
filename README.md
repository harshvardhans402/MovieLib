# Movie Playlist Management Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

- [Contributing](#contributing)


## Introduction
This application allows users to create and manage playlists of movies. Users can search for movies, add them to playlists, and make these playlists public or private. The application uses the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS for styling.

## Features
- User authentication and authorization
- Create, read, update, and delete playlists
- Add movies to playlists
- Public and private playlists
- Responsive design with Tailwind CSS

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **HTTP Client**: Axios
- **State Management**: Redux Toolkit

## Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Install dependencies:**
    ```bash
    npm install
    cd frontend
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application:**
    ```bash
    

    # In the frontend directory, start the React application
    cd frontend
    npm run dev
    # In the backend directory, start the Node application
    cd backend
    npm start
    ```

## Usage
1. **Register and log in:**
    - Users can register a new account and log in to the application.
    
2. **Create a playlist:**
    - Use the "Create Playlist" button to create a new playlist. Enter the name and set the visibility (public or private).

3. **Add movies to a playlist:**
    - Search for movies using the search bar.
    - Add movies to the desired playlist from the search results.

4. **View playlists:**
    - View all created playlists in the user profile.
    - Public playlists can be viewed by any user.

## API Endpoints
- **User Authentication:**
    - `POST /api/auth/register`: Register a new user
    - `POST /api/auth/login`: Log in a user



    ```


## Contributing
1. **Fork the repository.**
2. **Create a new branch:**
    ```bash
    git checkout -b my-feature-branch
    ```
3. **Make your changes and commit them:**
    ```bash
    git commit -m 'Add new feature'
    ```
4. **Push to the branch:**
    ```bash
    git push origin my-feature-branch
    ```
5. **Submit a pull request.**

6. #live at :https://movie-lib-front.vercel.app/


