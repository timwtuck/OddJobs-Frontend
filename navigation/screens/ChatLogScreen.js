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

    const toSet = await getUserMessages(loginState._id);

    // count the number of notifications for the home bar
    const allNotifications = toSet.reduce((sum, m) => sum += m.unread, 0);
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
    });

  }, []);
 

return (
    <>
      <View style={styles.container}>

        {/* TIM: TO DO 
            CAN ADD USER AVATAR, TIME OF LAST MESSAGE WHEN READY IN API
          */}

          {messages && messages.map((message, i) => {

            const boxColour = i%2 ? '#FFEDDF90' : '#FEC89990';

            return <Pressable key={message.user.fullName} style={({pressed}) => 
              [styles.conversation_container, {backgroundColor: pressed? '#FEC899' : boxColour}]}
                onPressOut={() => {

                  setNotificationState(setNotifications, message.unread*-1, false);
                  message.unread = 0;

                  navigation.navigate('Chat', {
                    screen: 'JobChatScreen', 
                    params: {messageId: message._id }
                  })
                }}>
                <View>
                  <Text style={styles.chatName}>{message.user.fullName}</Text>
                  <Text style={styles.username}>{message.user.username}</Text>
                </View>
                {message.unread > 0 && <Text style={styles.unread}>{message.unread}</Text>}
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
  conversation_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#000',
    width: '98%',
    marginVertical: 2,
    paddingLeft: 10,
    minHeight: 70,
    borderRadius: 5,
  },
  chatName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  username: {
    fontSize: 15,
    fontStyle: 'italic'
  },
  unread: {
    height: 30,
    width: 30, 
    borderRadius: 15,
    color: '#FFF',
    backgroundColor: '#DC143C',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginRight: 10,
  },
  odds : {
    backgroundColor: '#FEC899'
  },
  odds_pressed: {
    backgroundColor: 'red'
  },
  evens: {
    backgroundColor: '#FFEDDF'
  }
});

