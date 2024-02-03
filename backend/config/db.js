// Code to connect with the database.

const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config()

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
  port: process.env.db_port
})

module.exports = pool
