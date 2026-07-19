require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const pool = require("./db.js");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;
app.use(express.static("public"));

io.on("connection", async (socket) => {
    const conn = await pool.getConnection();
    const [results] = await conn.query("SELECT * FROM chat");
    results.forEach(row => {
        // results is an array here
        // row is every element of results
        // row is Object
        const msg = row.msg;
        socket.emit("showMsg", msg);
    });

    conn.release();

    socket.on("sendMsg", async (data) => {
        const msg = data;
        const conn = await pool.getConnection();
        const [results] = await conn.query("INSERT INTO chat (msg) VALUES (?)", [
            msg
        ]);
        io.emit("showMsg", data);
        conn.release();
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
