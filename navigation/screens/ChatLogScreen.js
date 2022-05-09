import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet, Pressable} from 'react-native';
import { useState } from 'react/cjs/react.development';

export const ChatLogScreen = ({route}) => {

  const [username, setUsername] = useState();

  /* DUMMY API CALL */
  /* This will be replaced with api call eventually*/
  const conversations = [];
  conversations.push({name: 'Tim', id:1});
  conversations.push({name: 'John', id: 2});
  conversations.push({name: 'Akin', id: 3});
  conversations.push({name: 'Vicky', id: 4});
  conversations.push({name: 'Shuan', _id: 5});
  //////////////////////////////////////////////////

  const onLogIn = () => {
    route.params.setUser(username);
    setUsername('')
  }



{/* <Pressable onPressOut={() => alert('offer camera or upload photo')}>
          <View style={styles.avatar}></View>
        </Pressable> */}
  return (
    <>
      <View style={styles.container}>
      <TextInput style={styles.textInput} value={username} 
        onChangeText={(text) => setUsername(text)}/>
    
            <Button onPress={onLogIn} title="Log In"/>

        <Text>Chat Log Screen</Text>
          {conversations.map(convo => {
            return <Pressable key={convo.name} style={styles.conversation_container}
                onPressOut={() => {
                  alert(`sending to  ${convo.name}`);
                //  console.log('socket >>>', route.params.socket)
                  route.params.sendNotification( convo.name);
                }}>
                <View >
                  <Text >{convo.name}</Text>
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
    justifyContent: 'center',
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
    borderWidth: 1,
    borderColor: '#000',
    width: '90%',
    marginVertical: 5,
    paddingLeft: 10,
    minHeight: 50
  }
});
