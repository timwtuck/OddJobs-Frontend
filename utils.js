import io from 'socket.io-client';

exports.setUpSocket = (setSocket, userId, onNewNotification) => {

    const ROOT_URL = 'https://oddjobs-test.herokuapp.com';
    const socket = io(ROOT_URL, {
      transports: ['websocket']});

    socket.connect();

    socket.on('connect', () => {
      console.log('connected to socket server');
      socket.emit('user-info', {user: userId});
    });
    socket.on('recieve', (info) => {
        console.log(`incoming message from ${info}`)
        onNewNotification(info);
    });

    setSocket(socket);

}