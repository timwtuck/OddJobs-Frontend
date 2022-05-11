import io from 'socket.io-client';
import {getUserMessages} from './api.js';

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

exports.updateUserMessages = async (setMessages, setNotifications, userId) => {

  const toSet = await getUserMessages(userId);

    // count the number of notifications for the home bar
    const allNotifications = toSet.reduce((sum, m) => 
      m.unread > 0 ? ++sum : sum , 0);

    exports.setNotificationState(setNotifications, allNotifications, true);
    setMessages(toSet);


    // socket.socket.on('update-chatlog', (info) => {

    //   setMessages((current) => {

    //     const update = [...current];

    //     for (const message of update){
    //       if (message.userId === info.currentId)
    //         message.unread++;
    //     }

    //     return update;
    //   });
}