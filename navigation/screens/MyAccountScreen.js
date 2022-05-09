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

import { EditMyAccountScreen } from './EditMyAccountScreen';
import { JobLogScreen } from './JobLogScreen';
import { ChatLogScreen } from './ChatLogScreen';

export const MyAccountScreen = ({ navigation }) => {
  // global user context
  const loginState = useContext(AuthContext);
  // global user context

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.logout}
          onPressOut={() => navigation.navigate(ChatLogScreen)}>
          <Text>Logout</Text>
        </Pressable>
        <Pressable onPressOut={() => alert('offer camera or upload photo')}>
          <View style={styles.avatar}></View>
        </Pressable>
        <Text style={styles.username}>Username</Text>
        <View style={styles.buttonRow}>
          <Pressable
            style={styles.messages}
            onPressOut={() => navigation.navigate(ChatLogScreen)}>
            <Text>Messages</Text>
          </Pressable>
          <Pressable
            style={styles.seeJobs}
            onPressOut={() => navigation.navigate(JobLogScreen)}>
            <Text>🎩</Text>
          </Pressable>
        </View>
        <Text style={styles.about}>About you</Text>
        <View style={styles.infoRows}>
          <Pressable onPressOut={() => alert('go to edit name form')}>
            <Text>Name</Text>
          </Pressable>
          <Pressable onPressOut={() => alert('go to edit name form')}>
            <Text>User's name &gt;</Text>
          </Pressable>
        </View>
        <View style={styles.infoRows}>
          <Pressable onPressOut={() => alert('go to edit username form')}>
            <Text>Username</Text>
          </Pressable>
          <Pressable onPressOut={() => alert('go to edit username form')}>
            <Text>User's username &gt;</Text>
          </Pressable>
        </View>
        <View style={styles.infoRows}>
          <Pressable onPressOut={() => alert('go to edit postcode form')}>
            <Text>Postcode</Text>
          </Pressable>
          <Pressable onPressOut={() => alert('go to edit postcode form')}>
            <Text>User's postcode &gt;</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  logout: {
    backgroundColor: '#C4C4C470',
    marginVertical: 25,
    marginHorizontal: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    marginHorizontal: 30,
  },

  avatar: {
    backgroundColor: '#C4C4C4',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 100,
  },

  username: {
    marginTop: 25,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  messages: {
    backgroundColor: '#C4C4C470',
    marginVertical: 25,
    marginHorizontal: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  seeJobs: {
    backgroundColor: '#C4C4C470',
    marginVertical: 25,
    marginHorizontal: 7,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  about: {
    fontSize: 12,
    color: '#00000080',
    alignSelf: 'flex-start',
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 15,
  },

  infoRows: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 60,
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});
