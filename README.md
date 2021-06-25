# Blank Project

## INSTALLATION
```
npm install
```
- Copy .env.template and turn it into an .env file, then input variables
- Change database name in create-database.sql
- Change database.js file to include the new database name
    - Eg. const database = 'blankdatabase'
    - Replace "blankdatabase" with new database name
- Change package.json file all scripts with -d to include the new database name
    - Eg. "seed-tables": "psql -U postgres -h localhost -d blankdatabase -f sql/seed-tables.sql"
    - Replace "blankdatabase" with new database name
- Run commands to create database and fill the tables
- Sign up and create a new user to login

## RULES
- In the route files the router.get file must define "title" and "req: req"
    - Eg. 
    ``` 
        router.get('/', (req, res) => {
        res.render('pages/home', {
            title: "homepage",
            req: req
        })
    })
    ```
- Routes defined in index.js file

## Commands
```
npm run create-database
npm run create-tables
npm run seed-tables
```
```
npm run dev
```