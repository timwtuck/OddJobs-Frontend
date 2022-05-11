import * as React from 'react';
import {
  Button,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { getSingleMessage, getUserMessages } from '../../api';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { JobChatScreen } from './JobChatScreen';
import { SocketContext } from '../../App';
import { SetNotificationContext } from '../../App';
import { SetAllMessagesContext } from '../../App';
import { AllMessagesContext } from '../../App';
import {setNotificationState} from '../../utils.js';
import { useIsFocused } from '@react-navigation/native';


export const ChatLogScreen = ({ navigation }) => {
  const loginState = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const setNotifications = useContext(SetNotificationContext);
  const isFocused = useIsFocused();
  const messages = useContext(AllMessagesContext);
  const setMessages = useContext(SetAllMessagesContext);

  // React.useEffect(async () => {

  //   socket.socket.on('update-chatlog', (info) => {

  //     setMessages((current) => {

  //       const update = [...current];

  //       for (const message of update) {
  //         if (message.userId === info.currentId) message.unread++;
  //       }

  //       return update;
  //     });
  //   });
  // }, []);

  return (
    <>
      <View style={styles.container}>
        {/* TIM: TO DO 
            CAN ADD USER AVATAR, TIME OF LAST MESSAGE WHEN READY IN API
          */}

        {messages &&
          messages.map(message => {
            return (
              <Pressable
                key={message.user.fullName}
                style={styles.conversation_container}
                onPressOut={() => {

                  navigation.navigate('Chat', {
                    screen: 'JobChatScreen',
                    params: { messageId: message._id },
                  });

                  if (message.unread > 0){
                    setNotificationState(setNotifications, -1, false);
                    message.unread = 0;
                  }
                }}>
                <View>
                  <Text>{message.user.fullName}</Text>
                  <Text> Unread: {message.unread}</Text>
                </View>
              </Pressable>
            );
          })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttons_login: {
    marginBottom: 5,
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
  },
});
