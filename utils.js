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
    socket.on('notification', (info) => {
        console.log(`incoming message from ${info}`)
        onNewNotification(info);
    });

    setSocket(socket);

}

exports.setNotificationState = (setState, amount, reset) => {

  setState((current) => {
    
        const options = {...current};
        
        // if doesn't exist create it
        if(!options.tabBarBadge || reset)
          options.tabBarBadge = 0;

        options.tabBarBadge += amount;

        //if no notifcations, delete it
        if(options.tabBarBadge <= 0)
          delete options.tabBarBadge;
        
        return options;
    });
}