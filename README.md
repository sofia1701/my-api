# my-api

Simple express app which uses sequelize to interact with a MySQL database.

### Install
- Fork this repository
- `git clone git@github.com:<your-github-username>/my-api.git`
- `npm install`

Create a .env and a .env.test file with the following variables:

    DB_PASSWORD=PASSWORD
    DBNAME=APPNAME
    DB_USER=root
    DB_HOST=localhost
    DB_PORT=3306

Make sure the DBNAME in you .env.test has a different name.

In order to setup and start the database:

- docker run -d -p 3306:3306 --name my_api -e MYSQL_ROOT_PASSWORD=<YOUR_PASSWORD> mysql
- docker start my_api

### Running the API

- `npm test` uses [Mocha](https://mochajs.org/) and [Supertest](https://www.npmjs.com/package/supertest) to run e2e tests defined in `tests` directory

You can then fire up the API with `npm start`.