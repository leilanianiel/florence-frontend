# Florence Fridge App 

Florence FridgeApp can assist in making our lives easier and more efficient. This app would minimize the amount of food waste in everyday homes. Similar to smart fridges; Florence would keep an inventory of the food that is stored in your fridge. The app would keep baseline expiration dates of foods and also be able to add inventory, sort by food item and more. When food is closest to expiring it would be pushed to the a new category with a notification. With the inventory being stored, Florence would suggest recipes based on categories and keywords. This would be an affordable alternative to a smart fridge and would help everyday users take the stress out of cooking and food waste.

## Feature Set

* OAuth secure Login.
* Create and store food items.
* Recieve expiration notification.
* Sorted by catergories.
* Recipe API "Spoonacular"
* Barcode Scanner "" 

# FlorenceFrontend
Florence Fridge App
This app was created as a Capstone project for Ada Developer Academy. The purpose of the app is to reduce food waste by organizing and planning. 

<img src="/Images/Welcome.png" alt="Welcome" width="250" height="500">.  <img src="/Images/Navigator.png" alt="Navigator" width="250" height="500">.  <img src="/Images/Trash_Report.png" alt="Trash Report" width="250" height="500">



### 
Provides a map marked with locations of the nearest trash cans and bathrooms, along with a navigation route to them. All users can help contribute to the map by adding in markers for trash cans and bathrooms. 

### Trash Report
Provides a map to be marked with reports of trash in the area (i.e. excessive litter, abandoned furniture). Any user can help contribute to the map by making reports of where they notice trash. Reports include the location, description, and image of the trash. Once a report is saved, any user can see the annotation on the map and click on it for more information. 

## Dependencies
Florence Fridge App relies on:

  - Google OAuth
  - Flask
  - Yarn
  - Material-ui
  - SQLAlchemy
  - React

## Environment Set-up Frontend

## Enviroment Set-up Backend 
# Setup

## Goal

The goal for setup is to cover all of the set up needed at the beginning of this project, which includes:

1. Forking and cloning
1. Managing dependencies
1. Setting up development and test databases
1. Setting up a `.env` file
1. Running `$ flask db init`
1. Running `$ flask run` and `$ FLASK_ENV=development flask run`

# Requirements

## Fork and Clone

1. Fork this project repo to your own personal account
1. Clone this new forked project

## Managing Dependencies

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

## Setting Up Development and Test Databases

Create a database:

1. A development database named `video_store_api_development`
1. [OPTIONAL] A test database named `video_store_api_test`
    - There are no Pytest tests for this project.  If you choose to write your own using the tests from Task List as a model, we recommend you also use a testing database

## Creating a `.env` File

Create a file named `.env`.

Create two environment variables that will hold your database URLs.

1. `SQLALCHEMY_DATABASE_URI` to hold the path to your development database
1. [OPTIONAL] `SQLALCHEMY_TEST_DATABASE_URI` to hold the path to your development database

Your `.env` may look like this:

```
SQLALCHEMY_DATABASE_URI=postgresql+psycopg2://postgres:postgres@localhost:5432/your_database_name

```





