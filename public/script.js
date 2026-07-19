const socket = io();

function send() {
    const msg = document.getElementById("msg").value;
    socket.emit("sendMsg", msg);
    document.getElementById("msg").value = "";
}

socket.on("showMsg", (data)=>{
    document.getElementById("chat-container").textContent += data;
})