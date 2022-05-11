import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { SocketContext } from '../../App';
import { getSingleMessage, postMessage } from '../../api';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { SetNotificationContext } from '../../App';
import {setNotificationState} from '../../utils.js';

export const JobChatScreen = ({route, navigation}) => {

  const loginState = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const setNotifications = useContext(SetNotificationContext);
  const [conversation, setConversation] = React.useState(null);
  const [otherUser, setOtherUser] = React.useState(null);
  const [text, setText] = React.useState('');
  const isFocused = useIsFocused();


  React.useEffect(async () => {

    
  }, []);


  useFocusEffect(

    React.useCallback(() => {

      // reload when in focus

      async function setUpChat() {

        // get messages from api
        const res = await getSingleMessage(route.params.messageId);

        // find who the user we're talking to is (2 entries from api call, one is us!)
        const otherUser = res.users[0].userId._id === loginState._id ?
          res.users[1] : res.users[0];
        setOtherUser(otherUser);

        navigation.setOptions({title: otherUser.userId.fullName});

        // format the messages
        const formattedMessages = res.messages.map(message => {
          
          const messageObj = {...message};

          if (message.userId === loginState._id){
            messageObj.name = loginState.fullName;
            messageObj.style = styles.textBox_thisUser;
          }
          else if (message.userId === otherUser.userId._id) {
            messageObj.name = otherUser.userId.fullName;
            messageObj.style = styles.textBox_otherUser;
          } // might still be undefined!

          return messageObj;
        });

        setConversation(formattedMessages);

        // set up event listener for our private messages
        // (message from otherUser will get routed through to here 
        // by our server as long as we're focused on this page!)
        socket.socket.on('update-private-message', (info) => {

          const newMessage = {
            name: info.from,
            style: styles.textBox_otherUser,
            content: info.content,
            _id: info._id
          }
          
          setConversation((current) =>{

            const lastEl = current.length -1;
            if (current[lastEl]._id !== newMessage._id){
              return [...current, newMessage]
            }
          });

        });

        // finally, join private chat
        socket.socket.emit('join-private-chat', {to: otherUser.userId._id, from: loginState._id}); 
        console.log('joining chat with ', {to: otherUser.userId._id, from: loginState._id} );
      }

      setUpChat();

      return () => {
        
        // make sure leave private chat when unfocused, ready to recieve notifications
        socket.socket.emit('leave-private-chat', {from: loginState._id});
      };
    }, []));


  const sendMessage = () => {

    if(!text)
      return;

    postMessage(loginState._id, route.params.messageId, text)
      .then(() => {
        // successful post to db!
        const newMessage = {
          _id: new Date().toString(),
          style: styles.textBox_thisUser,
          content: text,
        };

        if (socket) { // should have connection established, but just in case...
          console.log( {to: otherUser.userId._id, from: loginState._id, content: text, _id: newMessage._id})
          socket.socket.emit('send', {to: otherUser.userId._id, from: loginState._id, content: text, _id: newMessage._id} );
        }

        setConversation((current) => [...current, newMessage]);
        setText('');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <View style={styles.container}>
        {conversation &&
        conversation.map(convo => 
          <View key={convo._id} style={[styles.textBox, convo.style]} >
            <Text>{convo.content}</Text>
          </View>)
        }
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} value={text} 
            onChangeText={(newText) => setText(newText)}></TextInput>
          <Button title="Send" onPress={() => sendMessage()}></Button>
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
    paddingLeft: 10,
    width: '80%',
    minHeight: 50,
    borderRadius: 15,
  },
  textBox: {
    flexDirection: 'row-reverse',
    borderWidth: 1,
    borderColor: `#000`,
    borderRadius: 10,
    width: `95%`,
    minHeight:50,
    padding: 10,
    margin:3,
    textAlign: 'center'
  },
  textBox_thisUser: {
    justifyContent: 'flex-end'
  },
  textBox_otherUser: {
    justifyContent: 'flex-start',
  },
  textInputContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: `#000`,
    width: `100%`,
    minHeight:50,
    marginTop: 20
  },
});
