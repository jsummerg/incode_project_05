# Project 5

## INSTALLATION
```
npm install
```
- Copy .env.template and turn it into an .env file, then input variables
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
    - Error route must always be the last route or can cause bugs

## Commands
```
npm run create-database
npm run create-tables
npm run seed-tables
```
```
npm run dev
```