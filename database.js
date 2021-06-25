const pgp = require('pg-promise')()

const database = 'blankdatabase'

const connection = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${database}`

const db = pgp(connection)

module.exports = db