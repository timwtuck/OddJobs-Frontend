import io from 'socket.io-client';

exports.setUpSocket = (setSocket, userId, onNewNotification) => {

    console.log(1)
    const ROOT_URL = 'https://oddjobs-test.herokuapp.com';

    const socket = io(ROOT_URL, {      
      transports: ['websocket']});  

      console.log(2)
    socket.connect(); 
console.log(3)
    socket.on('connect', () => { 
      console.log('connected to socket server');
      socket.emit('user-info', {user: userId});
    });

    socket.on('recieve', (info) => {

        console.log(`incoming message from ${info}`)
  //    if(info === userId){
        // send notification
        onNewNotification(info);
   //   }
    });

    console.log(4)
    setSocket(socket);
    console.log(5)
}