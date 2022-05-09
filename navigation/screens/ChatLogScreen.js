import * as React from 'react';
import { Button, Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { getUserMessages } from '../../api';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { JobChatScreen } from './JobChatScreen';


export const ChatLogScreen = ({ navigation }) => {


  const loginState = useContext(AuthContext);
  const [messages, setMessages] = React.useState(null);

  React.useEffect(() => {

    //  const res = await getUserMessages(loginState._id);
    //  console.log(res);

    const mockDBCall = [
    {
      _id: "627968816380e2689926b9ab",
      users: [
        { userId: "6272a5463c6c76416c3ac4e1", fullName: 'Timmy', isRead: true },
        { userId: "6272a5963c6c76416c3ac4e5", fullName: 'Shaun Clarke', isRead: true },
      ],
    },
     {
      _id: "627968816380e2689926b9ab",
      users: [
        { userId: "6272a5463c6c76416c3ac4e1", fullName: 'Timmy', isRead: true },
        { userId: "6272a5963c6c76416c3ac4e5", fullName: 'Akin', isRead: true },
      ],
    }
    ];

    // fitler to get rid of us
    const toSet = mockDBCall.map(message => { 
        message.user = message.users[0].userId === loginState._id ? 
          message.users[1] : message.users[0];
          delete message.users;
        return message;
    });

    setMessages(toSet);
  }, []);

  React.useEffect(() => {
    console.log(messages);
  }, [messages]);


return (
    <>
      <View style={styles.container}>

        {/* TIM: TO DO 
            CAN ADD USER AVATAR, TIME OF LAST MESSAGE AND UNREAD MESSAGES WHEN READY IN API
          */}

          {messages && messages.map(message => {
            return <Pressable key={message.user.fullName} style={styles.conversation_container}
                onPressOut={() => {
                  navigation.navigate(JobChatScreen);
                }}>
                <View >
                  <Text >{message.user.fullName}</Text>
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

