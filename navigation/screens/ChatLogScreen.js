import * as React from 'react';
import { Button, Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { getSingleMessage, getUserMessages } from '../../api';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { JobChatScreen } from './JobChatScreen';
import { SocketContext } from '../../App';
import { SetNotificationContext } from '../../App';
import {setNotificationState} from '../../utils.js';


export const ChatLogScreen = ({ navigation }) => {


  const loginState = useContext(AuthContext);
  const [messages, setMessages] = React.useState(null);
  const socket = useContext(SocketContext);
  const setNotifications = useContext(SetNotificationContext);

  React.useEffect(async () => {

      const res = await getUserMessages(loginState._id);

      const promises = res.map(m => getSingleMessage(m._id));
      const allMessages = await Promise.all(promises);

      // fitler to format data as wanted
      const toSet = allMessages.map(message => { 
        
        const convoBox = {_id: message._id};

        if(message.users[0].userId._id === loginState._id) {

          convoBox.user = message.users[1].userId;
          convoBox.unread = message.users[0].unread;
        } 
        else {
          convoBox.user = message.users[0].userId;
          convoBox.unread = message.users[1].unread;
        }

        return convoBox;
      });

    // count the number of notifications for the home bar
    const allNotifications = toSet.reduce((sum, m) => sum += m.unread, 0);
    console.log(allNotifications);
    setNotificationState(setNotifications, allNotifications, true);

    setMessages(toSet);

    socket.socket.on('update-chatlog', (info) => {

      setMessages((current) => {

        const update = [...current];

        for (const message of update){
          if (message.userId === info.currentId)
            message.unread++;
        }

        return update;
      });

      console.log('I am ', loginState.fullName, 'and I am focused: ', navigation.isFocused())
    });

  }, []);
 

return (
    <>
      <View style={styles.container}>

        {/* TIM: TO DO 
            CAN ADD USER AVATAR, TIME OF LAST MESSAGE WHEN READY IN API
          */}

          {messages && messages.map(message => {
            return <Pressable key={message.user.fullName} style={styles.conversation_container}
                onPressOut={() => {

                  setNotificationState(setNotifications, message.unread*-1, false);
                  message.unread = 0;

                  navigation.navigate('Chat', {
                    screen: 'JobChatScreen', 
                    params: {messageId: message._id }
                  })
                }}>
                <View >
                  <Text >{message.user.fullName}</Text>
                  <Text> Unread: {message.unread}</Text>
                </View>
              </Pressable>
            })
          }
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  buttons_login: {
    marginBottom:5
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 20,
  },
  formInput: {
    borderWidth: 2,
    borderColor: '#000',
    width: '80%',
    marginVertical: 15,
    padding: 10,
    borderRadius: 15,
  },
  gesture: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  tokenInfo: {
    width: '60%',
    fontSize: 12,
    color: '#00000080',
    justifyContent: 'flex-end',
  },
  tokenContainer: {
    width: '40%',
  },
  tokenForm: {
    borderWidth: 2,
    borderColor: '#000',
    width: '80%',
    marginTop: 15,
    padding: 10,
    borderRadius: 15,
  },
  submit: {
    padding: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#000',
    width: '80%',
    height: '25%',
    marginVertical: 15,
    paddingTop: 10,
    padding: 10,
    borderRadius: 15,
  },
  conversation_container: {
    borderWidth: 2,
    borderColor: '#000',
    width: '98%',
    marginVertical: 2,
    paddingLeft: 10,
    minHeight: 70,
  }
});

