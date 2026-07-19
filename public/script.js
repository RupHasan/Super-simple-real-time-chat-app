const socket = io();
const loded = false;

function send() {
    const msg = document.getElementById("msg").value;
    socket.emit("sendMsg", msg);
    document.getElementById("msg").value = "";
}

socket.on("showMsg", data => {
    const paragraph = document.createElement("p");
    paragraph.textContent = data;
    document.getElementById("chat-container").appendChild(paragraph);
});