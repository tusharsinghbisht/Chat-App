const socket = io('http://localhost:8000');

const form = document.getElementById('msg-form');
const messageInp = document.getElementById('msg');
const container = document.querySelector('.message-box');


const append = (msg, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = msg;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.append(messageElement);
}

form.addEventListener('submit', (e) => {
    const message = messageInp.value;
    if (message == '') {
        e.preventDefault();
    } else {
        e.preventDefault();
        append(`You : ${message}`, 'right');
        socket.emit('send', message);
        messageInp.value = '';
    }
});

const name = prompt('Enter Your Name to join.');
socket.emit('new-User-join', name);

socket.on('user-join', name => {
    append(`${name} joined the Chat`, 'left');
});

socket.on('recive', data => {
    append(`${data.name} : ${data.msg}`, 'left');
});

socket.on('left', name => {
    append(`${name} Left the Chat.`, 'left');
});