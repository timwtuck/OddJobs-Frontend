import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { getSingleMessage } from '../../api';

export const JobChatScreen = ({route, navigation}) => {

  const loginState = useContext(AuthContext);
  const [conversation, setConversation] = React.useState(null);
  const [otherUser, setOtherUser] = React.useState(null);

  console.log(route)

  React.useEffect(async () => {

    const res = await getSingleMessage(route.params.messageId);
    console.log('>>>', res);
    setConversation(res.messages);

    const user = res.users[0]._id === loginState._id ?
      res.users[1]._id : res.users[0]._id;

    setOtherUser(user);
    console.log("user: ",user)
    navigation.setOptions({title: user});
  }, []);


  return (
    <>
      <View style={styles.container}>
        {conversation &&
        conversation.map(convo => 
          <View style={styles.textBox} >
            <Text>{convo.content}</Text>
          </View>)
        }
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput}></TextInput>
          <Button title="Send"></Button>
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
    borderWidth: 1,
    borderColor: `#000`,
    borderRadius: 10,
    width: `95%`,
    minHeight:50,
    textAlign: 'left',
    paddingLeft: 10
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
