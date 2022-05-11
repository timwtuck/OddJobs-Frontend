import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { SocketContext } from '../../App';
import { getSingleMessage, postMessage } from '../../api';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

export const JobChatScreen = ({route, navigation}) => {

  const loginState = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const [conversation, setConversation] = React.useState(null);
  const [otherUser, setOtherUser] = React.useState(null);
  const [text, setText] = React.useState('');
  const isFocused = useIsFocused();


  React.useEffect(async () => {

    const res = await getSingleMessage(route.params.messageId);

    const otherUser = res.users[0].userId._id === loginState._id ?
      res.users[1] : res.users[0];

    setOtherUser(otherUser);
    navigation.setOptions({title: otherUser.userId.fullName});

    const formattedMessages = res.messages.map(message => {
      
      const messageObj = {...message};

      if (message.userId === loginState._id){
        // messages are sent from the logged in user
        messageObj.name = loginState.fullName;
        messageObj.style = styles.textBox_thisUser;
      }
      else if (message.userId === otherUser.userId._id) {
        //messages are sent from the other user
        messageObj.name = otherUser.userId.fullName;
        messageObj.style = styles.textBox_otherUser;
      } 

      return messageObj;
    });

    socket.socket.on('update-private-message', (info) => {
      
      const newMessage = {
        name: info.from,
        style: styles.textBox_otherUser,
        content: info.content
      }
      setConversation((current) =>{
        return [...current, newMessage]
      });

    });

    setConversation(formattedMessages);
  }, []);


  useFocusEffect(

    React.useCallback(() => {

      // if(!socket)
      //   return; // if it starts crashing, uncomment this

      // Do something when the screen is focused
        console.log('joining....')
        socket.socket.emit('join-private-chat', {user: loginState._id}); 

      return () => {
        
        // Do something when the screen is unfocused
        console.log('leaving....')
        socket.socket.emit('leave-private-chat',  {user: loginState._id});
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
          socket.socket.emit('send', {to: otherUser.userId._id, from: loginState._id, content: text} );
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
