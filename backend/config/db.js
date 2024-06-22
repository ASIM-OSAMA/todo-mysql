// Code to connect with the database.

const dotenv = require("dotenv");
const Pool = require("pg").Pool;

dotenv.config();

const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_database = process.env.DB_NAME;
const db_port = process.env.DB_PORT;
try {
  var pool = new Pool({
    host: db_host,
    user: db_user,
    password: db_password,
    database: db_database,
    port: db_port,
  });
  console.log("DB Connected.");
} catch (error) {
  console.log(error);
}

module.exports = { pool };
