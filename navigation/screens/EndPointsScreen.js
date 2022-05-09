import * as React from 'react';
import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';

import { FindAJobScreen } from './FindAJobScreen';
import { JobScreen } from './JobScreen';
import { JobLogScreen } from './JobLogScreen';
import { ChatLogScreen } from './ChatLogScreen';
import { JobChatScreen } from './JobChatScreen';
import { MyAccountScreen } from './MyAccountScreen';
import { EditMyAccountScreen } from './EditMyAccountScreen';
import { PostJobScreen } from './PostJobScreen';
import { LoginScreen } from './LoginScreen';
import { SignupScreen } from './SignupScreen';

export const EndPointsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <>
        <Pressable
          style={styles.doneEndpoints}
          onPressOut={() => navigation.navigate(SignupScreen)}>
          <Text style={styles.cardHeader}>Signup Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
      <>
        <Pressable
          style={styles.endpoints}
          onPressOut={() => navigation.navigate(LoginScreen)}>
          <Text style={styles.cardHeader}>Login Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
      <>
        <Pressable
          style={styles.doingEndpoints}
          onPressOut={() => navigation.navigate(PostJobScreen)}>
          <Text style={styles.cardHeader}>Post a Job Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
      <>
        <Pressable
          style={styles.endpoints}
          onPressOut={() => navigation.navigate(FindAJobScreen)}>
          <Text style={styles.cardHeader}>Find a Job Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
      <>
        <Pressable
          style={styles.endpoints}
          onPressOut={() => navigation.navigate(JobScreen)}>
          <Text style={styles.cardHeader}>Job Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
      <>
        <Pressable
          style={styles.doingEndpoints}
          onPressOut={() => navigation.navigate(JobLogScreen)}>
          <Text style={styles.cardHeader}>Job Log Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
      <>
        <Pressable
          style={styles.endpoints}
          onPressOut={() => navigation.navigate(ChatLogScreen)}>
          <Text style={styles.cardHeader}>Chat Log Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
      <>
        <Pressable
          style={styles.endpoints}
          onPressOut={() => navigation.navigate(JobChatScreen)}>
          <Text style={styles.cardHeader}>Job Chat Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
      <>
        <Pressable
          style={styles.doneEndpoints}
          onPressOut={() => navigation.navigate(MyAccountScreen)}>
          <Text style={styles.cardHeader}>My Account Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
      <>
        <Pressable
          style={styles.endpoints}
          onPressOut={() => navigation.navigate(EditMyAccountScreen)}>
          <Text style={styles.cardHeader}>Edit My Account Screen</Text>
          <Text style={styles.cardSubText}>Go to Page</Text>
        </Pressable>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 20,
  },
  endpoints: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    width: '90%',
    height: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  doingEndpoints: {
    justifyContent: 'center',
    backgroundColor: '#e9c46a',
    borderRadius: 15,
    width: '90%',
    height: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  doneEndpoints: {
    justifyContent: 'center',
    backgroundColor: '#c7f9cc',
    borderRadius: 15,
    width: '90%',
    height: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  cardHeader: {
    fontStyle: 'normal',
    fontSize: 16,
  },
  cardSubText: {
    fontSize: 12,
  },
});
