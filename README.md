# wildcamp

## Project overview 📝

Wildcamp enables travelers all over the world to share their best camping spots with the community. This project was developed for educational puposes. 

## Project details 🔍

### Fonctionality
Without logging in, the visitor can access the home page containing a list of posted campgrounds. They can click on a campground to review the details about the spot and the comments shared by the community.

If the visitor creates an account and logs in, they can post their own favourite campgrounds and add comments regarding other users'campgrounds.

## Project status

 The first version of hte application is available at this [address](https://wildcamp-app.herokuapp.com/).

:soon: Improvements and new features in store for the second version:
     
     * User profile to access user info, a list of campgrounds they posted/commented, and/or campgrounds marked as 'favorite'
     * Ability to upload an image file
     * Home page: list of campgrounds shown limited to ten most recent posts
     * New page to browse all campgrounds in db with pagination with search funcionality based on country

## Stack :wrench:

* [NodeJS 16.3.0](https://nodejs.org/fr/download/)
* [NPM 7.15.1](https://www.npmjs.com/get-npm)
* [PostgreSQL 12.7](https://www.postgresql.org/download/)
* [Sqitch 0.9999](https://sqitch.org/download/)

These tools are required for the app to run. __Please install them beforehand__.

## Install :construction_worker:

__Clone__ the repository locally (for now, the "develop" branch).

```bash
git clone <url de ce repo>
```
Access the *client* folder and __install the dependencies__.


```bash
cd client/ && yarn
```

Once the operation is completed, access the root and __install the npm packages__.


```bash
cd ../ && npm i
```

Finally, __create__ [a PostgreSQL database](https://www.postgresql.org/docs/12/app-createdb.html) and __deploy__ the Sqitch migrations to it.

```bash
createdb oap
sqitch deploy db:pg:oap
```
Make sure to __configure__ PostgreSQL so createdb and sqitch commands can be executed.

## Importing data :floppy_disk:

Run the following command to import seeding data into your local database :

```bash
psql -d oap -f /server/data/import.sql
```

## Running the app :rocket:

To launch the webpack server and the API server locally, run the following __script__ while at the root of the app:
```bash
npm run dev
```