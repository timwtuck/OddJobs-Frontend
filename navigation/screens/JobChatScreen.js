import * as React from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { SocketContext } from '../../App';
import { getSingleMessage, postMessage } from '../../api';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

// Custom Fonts
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

export const JobChatScreen = ({ route, navigation }) => {
  const loginState = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const [conversation, setConversation] = React.useState(null);
  const [otherUser, setOtherUser] = React.useState(null);
  const [text, setText] = React.useState('');
  const isFocused = useIsFocused();

  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  React.useEffect(async () => {
    const res = await getSingleMessage(route.params.messageId);

    const otherUser =
      res.users[0].userId._id === loginState._id ? res.users[1] : res.users[0];

    setOtherUser(otherUser);
    navigation.setOptions({ title: otherUser.userId.fullName });

    const formattedMessages = res.messages.map(message => {
      const messageObj = { ...message };

      if (message.userId === loginState._id) {
        // messages are sent from the logged in user
        messageObj.name = loginState.fullName;
        messageObj.style = styles.textBox_thisUser;
      } else if (message.userId === otherUser.userId._id) {
        //messages are sent from the other user
        messageObj.name = otherUser.userId.fullName;
        messageObj.style = styles.textBox_otherUser;
      }

      return messageObj;
    });

    socket.socket.on('update-private-message', info => {
      const newMessage = {
        name: info.from,
        style: styles.textBox_otherUser,
        content: info.content,
      };
      setConversation(current => {
        return [...current, newMessage];
      });
    });

    setConversation(formattedMessages);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // if(!socket)
      //   return; // if it starts crashing, uncomment this

      // Do something when the screen is focused
      socket.socket.emit('join-private-chat', { user: loginState._id });

      return () => {
        // Do something when the screen is unfocused
        socket.socket.emit('leave-private-chat', { user: loginState._id });
      };
    }, []),
  );

  const sendMessage = () => {
    if (!text) return;

    postMessage(loginState._id, route.params.messageId, text)
      .then(() => {
        // successful post to db!
        const newMessage = {
          _id: new Date().toString(),
          style: styles.textBox_thisUser,
          content: text,
        };

        if (socket) {
          // should have connection established, but just in case...
          socket.socket.emit('send', {
            to: otherUser.userId._id,
            from: loginState._id,
            content: text,
          });
        }

        setConversation(current => [...current, newMessage]);
        setText('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          {conversation &&
            conversation.map(convo => (
              <View style={[{ flexDirection: 'row' }, convo.style]}>
                {convo.style === styles.textBox_otherUser && (
                  <View style={styles.avatar} /> // add image code here
                )}
                <View key={convo._id} style={[styles.textBoxes]}>
                  <Text style={styles.bodyText}>{convo.content}</Text>
                </View>
              </View>
            ))}
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={newText => setText(newText)}></TextInput>
          <Pressable
            style={styles.sendMessage}
            onPressOut={() => sendMessage()}>
            <Text style={styles.sendMessage}>Send</Text>
          </Pressable>
          {/* <Button title="Send" onPress={() => sendMessage()}></Button> */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },

  //---- Message Section ----//
  messageContainer: {
    width: Dimensions.get('window').width * 0.9,
  },

  textBoxes: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: `#000`,
    borderRadius: 10,
    width: 'auto',
    maxWidth: '70%',
    minHeight: 50,
    padding: 10,
    margin: 3,
    alignItems: 'center',
  },
  textBox_thisUser: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    backgroundColor: '#FFEDDF',
  },
  textBox_otherUser: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },

  //---- FORM ENTRY ---//
  textInputContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#000',
    minHeight: 50,
    marginVertical: 20,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  textInput: {
    paddingLeft: 10,
    width: '80%',
    minHeight: 50,
    // backgroundColor: 'pink',
  },
  sendMessage: {
    fontFamily: 'Inter_600SemiBold',
    backgroundColor: '#E1F7FD',
    fontSize: 16,
    paddingVertical: 10,
    // marginLeft: 0,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },

  //---- TEXT STYLING ----//

  bodyText: {
    fontSize: 16,
  },

  avatar: {
    backgroundColor: 'grey',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignSelf: 'center',
    marginRight: 3,
  },
});
