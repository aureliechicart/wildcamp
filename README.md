# wildcamp :tent:

## Introduction 📝

This project has been developed for learning purposes.  
Single Page Application enabling users to share their best camping spots and their comments.  
React front-end + Node API.

## Project details 🔍

## Stack :wrench:

### Backend

* NodeJS v16.14.0
* Express v4.17.1
* PostgreSQL 12
* pg (postgreSQL client) v8.7.1
* Sqitch 0.9999
* dotenv v10.0.0
* cors v2.8.5
* morgan v1.10.0
* helmet v4.6.0
* bcrypt v5.0.1
* concurrently v6.3.0
* cookie-parser v1.4.5
* jsonwebtoken v8.5.1
* express-swagger-generator v1.1.17

### Frontend

* Bootstrapped with create-react-app v4.0.3
* React v17.0.2
* React DOM v17.0.2
* React Router DOM v5.3.0
* React Redux v7.2.6
* axios v 0.24.0
* jwt-decode v3.1.2
* Sass
* Font Awesome icons for React

### Features

The visitor can access the home page containing a list of posted campgrounds. They can click on a campground to review the details about the spot and the comments shared by the community.

The visitor can create an account and log in.

The logged in user can post their own favourite campgrounds and add comments.

### Status

 The first version of hte application is available [here](https://wildcamp-app.herokuapp.com/).

:soon: Improvements and new features in store for the second version:

* User profile to access user info and the list of campgrounds they posted/commented, and campgrounds marked as 'favorite'
* Possibility to bookmark favorite campgrounds
* Ability to upload an image file
* Home page: list of campgrounds shown limited to ten most recent posts
* New page to browse all campgrounds in db with pagination 
* Search feature based on country or description content

## Learning goals

* Backend:
  * Developing a full __CRUD API__
  * Using __Active Record__ models (no ORM)
  * Using a __database versioning__ tool (sqitch)
  * __JWT__-based authentication: creating JWT on login and checking JWT validity on protected resources requests
  * Setting up __Joi validation__ on POST routes
* Developing a frontend using React + Redux :
  * using __Sass variables__
  * setting up __controlled inputs__
  * using effect hook, ref hook, lifecyle methods and conditional views
  * using container components to connect a presentational component with the Redux store
  * combining several reducers
  * setting up __Redux middleware__ for asynchronous API calls
  * using action creators
  * Adding JWT to HTTP header before sending requests to protected resources

## Install :construction_worker:

Clone the repository locally.

```bash
git clone <repo_url>
```

Access the *client* folder and install the dependencies.

```bash
cd client/ && yarn
```

Once the operation is completed, access the root and install the npm packages.

```bash
cd ../ && npm i
```

Create a PostgreSQL database and deploy the Sqitch migrations to it.

```bash
createdb wildcamp
sqitch deploy db:pg:<PG_connection_URI>
```

Make sure to configure PostgreSQL so createdb and sqitch commands can be executed.

### Importing data :floppy_disk:

Run the following command to import seeding data into your local database :

```bash
psql -d wildcamp -f /server/data/seeding.sql
```

### Setting environment variables

Copy the the .env.example file (/server/.env.example) to create a .env file with your own variables.

### Running the app :rocket:

This is a monorepo containg both the frontend project (client folder) and the backend project (server folder).
To launch the webpack server and the API server locally, access the server folder and run the following __script__:

```bash
cd server
npm run dev
```

To access the API Swagger documentation, go to `http://localhost:5000/api-docs`.
