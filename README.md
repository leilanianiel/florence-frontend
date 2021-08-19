# Florence Fridge App 

#### This app was created as a Capstone project for Ada Developer Academy. The purpose of the app is to reduce food waste by organizing and planning.

Florence FridgeApp can assist in making our lives easier and more efficient. This app would minimize the amount of food waste in everyday homes. Similar to smart fridges; Florence would keep an inventory of the food that is stored in your fridge. The app would keep baseline expiration dates of foods and also be able to add inventory, sort by food item and more. When food is closest to expiring it would be pushed to the a new category with a notification. With the inventory being stored, Florence would suggest recipes based on categories and keywords. This would be an affordable alternative to a smart fridge and would help everyday users take the stress out of cooking and food waste.


![Florence_home](https://user-images.githubusercontent.com/62310329/129987335-dc632ad2-4162-4dc8-9cb8-87196a0dd759.png)
![Florence_Fridge](https://user-images.githubusercontent.com/62310329/129987338-1561807f-b73a-4fe7-9a6e-fe80fc458fbc.png)


# Front-End Environment & Set-up

# Feature Set

* OAuth secure Login.
* Create and store food items.
* Recieve expiration notification.
* Sorted by catergories.
* Recipe API "Spoonacular"
* Barcode Scanner "quaggaJS" 
 

### Managing Dependencies

Florence Fridge App relies on:
```bash
  - react 
  - axios
  - Google OAuth
  - Flask
  - Yarn
  - Material-ui
  - SQLAlchemy
  - React
  - QuaggasJS
  - reportWebVitals
  - moment
  ```


### Scaffold the App

Create a new React app within this project folder. **You must perform this within this front-end project folder**.

```bash
$ npx create-react-app .
```

### Add `axios`

Install axios:

```bash
$ yarn add axios
```

### Creating a `.env` File

Create a file named `.env`.

The front-end layer needs to send API requests to the back-end layer. In order to handle this, the front-end layer repo **must** include a `.env` file with this line:

```
REACT_APP_BACKEND_URL=http://localhost:5000
```

Use this environment variable to send your API requests. You can read it by using the expression `process.env.REACT_APP_BACKEND_URL`. For example, we may use it like this in any component:

```js
axios.get(`${process.env.REACT_APP_BACKEND_URL}/florence-fridge`, {
    // ...
```

This will make Heroku deployment easier.


### Commit and Push

Commit and push your files to your repo, especially including the `package.json` file!

</details>


# Back-End Environment & Set-up

### Setup

The goal for setup is to cover all of the set up needed at the beginning of this project, which includes:

1. Forking and cloning
1. Managing dependencies
1. Setting up development and test databases
1. Setting up a `.env` file
1. Running `$ flask db init`
1. Running `$ flask run` and `$ FLASK_ENV=development flask run`

### Requirements

### Fork and Clone

1. Fork this project repo to your own personal account
1. Clone this new forked project

### Managing Dependencies

Create a virtual environment:

```bash
$ python3 -m venv venv
$ source venv/bin/activate
(venv) $ # You're in activated virtual environment!
```

Install dependencies (we've already gathered them all into a `requirements.txt` file):

```bash
(venv) $ pip install -r requirements.txt
```

### Setting Up Development and Test Databases

Create a database:

1. A development database named `your_database_name`

### Creating a `.env` File

Create a file named `.env`.

Create two environment variables that will hold your database URLs.

1. `SQLALCHEMY_DATABASE_URI` to hold the path to your development database
1. [OPTIONAL] `SQLALCHEMY_TEST_DATABASE_URI` to hold the path to your development database

Your `.env` may look like this:

```
SQLALCHEMY_DATABASE_URI=postgresql+psycopg2://postgres:postgres@localhost:5432/your_database_name
```





