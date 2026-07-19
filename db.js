require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "test"
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to local database:", err.message);
    } else {
        console.log("Successfully connected to local database!");
        connection.release();
    }
});

module.exports = pool.promise();
