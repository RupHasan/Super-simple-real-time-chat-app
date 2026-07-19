require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const pool = require("./db.js")
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;
app.use(express.static("public"));

io.on("connection", (socket)=>{
    socket.on("sendMsg", (data)=>{
        const msg = data;
        io.emit("showMsg", data);
    })
})

server.listen(port, ()=>{
	console.log(`Server is running on port ${port}`);
})